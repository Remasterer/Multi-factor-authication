import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): {[key: string]: any } | null  {
  const password = control.get('password');
  const confirimPassword = control.get('repeatPassword');
  if(password.pristine || confirimPassword.pristine) {
    return null;
  }
  return password && confirimPassword
         && password.value !== confirimPassword.value ? { 'misMatch': true} : null;
}
