import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  createForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private fb:FormBuilder) {
    this.createForm = this.fb.group({
      email:['', Validators.required],
      password: ''
    });
  }

  public login(email,password) {
    this.auth.login(email,password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['list']),
        err => alert("Invalid credentials")
      );
  }
  registration(){
    this.router.navigate([`/registration`]);
  }
}