import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[];
  displayedColumn = ['title','description', 'status', 'owner', 'assignee', 'actions']

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService
      .getTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data;
        console.log('Data requested...');
      })
  }

  editTask(id){
    this.router.navigate([`/edit/${id}`]);
  }
x
  deleteTask(id){
    this.taskService.deleteTask(id).subscribe(() => {
      this.fetchTasks();
    });
  }

}
