import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  errorMessage: string = null

  userObject = {
    uname: "",
    upass: ""
  }
  confirmPass: string = ""

  authForm;
  submitted = false;

  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }
  get repeatPassword() {
    return this.authForm.get('repeatPassword');
  }
  constructor(private fb: FormBuilder,  private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      "email": ['', [Validators.required,  Validators.email]],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "repeatPassword": ['', [Validators.required, Validators.minLength(6)]],
    }, {validators: PasswordValidator})
  }

  onSubmit() {
    this.userObject.uname = this.authForm.value.email;
    this.userObject.upass = this.authForm.value.password;

    this.authService.registerUser(this.userObject).subscribe((data) => {
        const result = data.body
        if (result['status'] === 200) {
          this.errorMessage = result['message'];
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      });

    this.submitted = true;
    this.authForm.reset()
  }
}
