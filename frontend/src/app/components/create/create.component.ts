import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  users: User[];
  
  constructor(private userService: UserService, private taskService: TaskService, private fb:FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      title:['', Validators.required],
      description: '',
      status: '',
      owner: {},
      assignee: {}
    });
  }

  addTask(title,description,status,owner,assignee){
    this.taskService.addTask(title,description,status,owner,assignee).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
  
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getUsers().subscribe((data:User[]) => {
      this.users = data;
    });
  }
}
