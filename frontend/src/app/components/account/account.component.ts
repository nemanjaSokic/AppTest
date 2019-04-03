import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: String;
  user: any={};
  updateForm: FormGroup;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm (){
    this.updateForm = this.fb.group({
      fullName:'',
      email: '',
      password:'',
      role: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res=>{
        this.user = res;
        this.updateForm.get('fullName').setValue(this.user.fullName);
        this.updateForm.get('email').setValue(this.user.email);
        this.updateForm.get('password').setValue(this.user.password);
        this.updateForm.get('role').setValue(this.user.role);
      });
    });
  }

  updateAccount(fullName,email,password,role){
    this.userService.updateUser(this.id,fullName,email,password,role).subscribe(()=>{
      this.snackBar.open('User updated successfully', 'OK', {
        duration:3000
      });
    });
  }
}
