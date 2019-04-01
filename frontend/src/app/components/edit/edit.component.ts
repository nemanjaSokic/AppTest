import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

import { MatSnackBar } from '@angular/material';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  task: any={};
  updateForm: FormGroup;
  users: User[];

  constructor(private userService: UserService, private taskService: TaskService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm (){
    this.updateForm = this.fb.group({
      title:['', Validators.required],
      description: '',
      status:'',
      owner:['', Validators.required],
      assignee:{}
    });
  }

  ngOnInit() {
    this.getAllUsers();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.taskService.getTaskById(this.id).subscribe(res=>{
        this.task = res;
        this.updateForm.get('title').setValue(this.task.title);
        this.updateForm.get('description').setValue(this.task.description);
        this.updateForm.get('status').setValue(this.task.status);
        this.updateForm.get('owner').setValue(this.task.owner.fullName);
      });
    });
  }

  updateTask(title,description,status,assignee){
    this.taskService.updateTask(this.id,title,description,status,assignee).subscribe(()=>{
      this.snackBar.open('Task updated successfully', 'OK', {
        duration:3000
      });
    });
  }

  getAllUsers(){
    this.userService.getUsers().subscribe((data:User[]) => {
      this.users = data;
    });
  }
}
