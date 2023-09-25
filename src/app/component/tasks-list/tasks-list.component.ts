import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  editTaskValue: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.editTaskValue = '';
    this.taskArr = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('Unable to retrieve tasks list!');
      }
    );
  }

  deleteTask(etask: Task) {
    this.taskService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Unable to delete this task.');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
