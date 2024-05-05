import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-numeric-form',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './numeric-form.component.html',
  styleUrl: './numeric-form.component.css'
})
export class NumericFormComponent {
  @Input() formFields: ( { name: string, label: string, integer: boolean } )[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  formData: any = {};

  onSubmit() {
    for (let field of this.formFields) {
      if (field.integer) {
        if (this.formData[field.name] % 1 !== 0) {
          alert('El campo ' + field.label + ' debe ser un número entero')
          return;
        }
      }
    }
    this.formSubmit.emit(this.formData);
  }

  clearForm() {
    this.formData = {};
  }
}
