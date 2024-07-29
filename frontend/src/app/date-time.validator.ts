import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateTimeValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null; // No value is present, other validators will handle required logic
  }

  const isValidDate = !isNaN(Date.parse(value));
  return isValidDate ? null : { invalidDateTime: true };
}