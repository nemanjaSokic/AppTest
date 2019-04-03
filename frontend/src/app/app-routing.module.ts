import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [
  { path: 'create', component:CreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component:EditComponent, canActivate: [AuthGuard] },
  { path: 'list', component:ListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch:'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
