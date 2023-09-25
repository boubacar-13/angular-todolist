import { Component, Injectable } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  //   standalone: true,
  //   imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  taskObj: Task = new Task();

  addTaskValue: string = '';
  addDatePickerValue: NgbDateStruct | undefined;
  readonly DELIMITER = '/';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.task_dead_line = this.addDatePickerValue
      ? this.addDatePickerValue.day +
        this.DELIMITER +
        this.addDatePickerValue.month +
        this.DELIMITER +
        this.addDatePickerValue.year
      : null;

    this.taskService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
        this.addDatePickerValue = undefined;
      },
      (err) => {
        alert(err);
      }
    );
  }
}
