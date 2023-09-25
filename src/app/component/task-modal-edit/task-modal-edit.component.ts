import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-modal-edit',
  templateUrl: './task-modal-edit.component.html',
  styleUrls: ['./task-modal-edit.component.css'],
})
export class TaskModalEditComponent {
  taskObj: Task = new Task();

  editTaskValue: string = '';
  addDatePickerValue: NgbDateStruct | undefined;
  readonly DELIMITER = '/';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.taskObj = new Task();
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.taskService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Unable to edit this task.');
      }
    );
  }
}
