import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {

  // Custom validator to check if the value is a valid email
  static isEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Simple email regex
      const email = control.value;

      if (email && !emailRegex.test(email)) {
        return { invalidEmail: true };  // Return an error object if the email is invalid
      }
      return null;  // Return null if the email is valid
    };
  }

  static matchPassword(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(passwordControlName);
      const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

      if (passwordControl && confirmPasswordControl) {
        const isMatching = passwordControl.value === confirmPasswordControl.value;
        return isMatching ? null : { mismatch: true }; // Return null if passwords match, else return an error object
      }
      return null;
    };
  }
}
