import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';

import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent,
    RegistrationComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [TaskService, UserService,AuthService,
AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
