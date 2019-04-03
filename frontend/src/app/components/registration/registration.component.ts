import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userService : UserService, private router : Router, private fb:FormBuilder) {
    this.registerForm = this.fb.group({
      fullName:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role:''
    });
  }

  ngOnInit() {
  }

  register(fullName,email,password,role){
    this.userService.addUser(fullName,email,password,role).subscribe(() => {
      this.router.navigate(['/login']);
  });

  }
}
