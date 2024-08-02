import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateTimeValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null; 
  }

  const isValidDate = !isNaN(Date.parse(value));
  return isValidDate ? null : { invalidDateTime: true };
}