import {Component, input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html'
})
export class FormErrorComponent {
  public formControlWithErrors = input.required<FormControl>();
}
