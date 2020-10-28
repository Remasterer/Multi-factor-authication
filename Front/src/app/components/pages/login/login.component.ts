import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tfaFlag: boolean = false
  userObject = {
    uname: "",
    upass: ""
  }
  errorMessage: string = null;

  submitted = false;
  loginForm;

  constructor(private fb: FormBuilder,  private authService: AuthService, private router: Router) { }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "email": ['', [Validators.required,  Validators.email]],
      "password": ['', [Validators.required]],
    })
  }
  onSubmit() {
    this.userObject.uname = this.loginForm.value.email
    this.userObject.upass = this.loginForm.value.password;

    this.authService.loginAuth(this.userObject).subscribe((data) => {
      this.errorMessage = null;
      if (data.body['status'] === 200) {
        this.submitted = true;
        this.authService.updateAuthStatus(true);
        this.router.navigateByUrl('/check');
      }
      if (data.body['status'] === 206) {
        this.tfaFlag = true;
      }
      if (data.body['status'] === 403) {
        this.errorMessage = data.body['message'];
      }
      if (data.body['status'] === 404) {
        this.errorMessage = data.body['message'];
      }
    })
  }
}
