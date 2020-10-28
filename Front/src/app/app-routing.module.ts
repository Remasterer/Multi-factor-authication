import { LoginComponent } from './components/pages/login/login.component';

import { UserFormComponent } from './components/pages/user-form/user-form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'check', component: HomeComponent},
  {path:'register', component: UserFormComponent},
  {path:'login', component: LoginComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
