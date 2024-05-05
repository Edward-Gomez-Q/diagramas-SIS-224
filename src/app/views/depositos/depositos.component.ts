import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TableComponent} from "../../components/table/table.component";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-depositos',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    NumericFormComponent,
    NgIf
  ],
  templateUrl: './depositos.component.html',
  styleUrl: './depositos.component.css'
})
export class DepositosComponent {
  tiempoDeDepositoAPlazoFijo: number = 0;
  capital: number = 0;
  tasaDeInteres: number = 0;
  listaHeader: string[] = [];
  listaValores: any[] = [];
  capitalFinal: number = 0;
  formFields: ( { name: string, label: string, integer: boolean } )[]
    = [
    {name: 'tiempoDeDepositoAPlazoFijo', label: 'Tiempo de Depósito a Plazo Fijo (Años):', integer: true},
    { name: 'tasaDeInteres', label: 'Tasa de Interés (Porcentaje):', integer: false },
    { name: 'capital', label: 'Capital (Bs):', integer: false },

  ];
  isSimulate: boolean = false;
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.tiempoDeDepositoAPlazoFijo = formData.tiempoDeDepositoAPlazoFijo;
    this.capital = formData.capital;
    this.tasaDeInteres = formData.tasaDeInteres;
  }
  private simulate() {
    this.listaHeader = ['Año', 'Capital', 'Interés'];
    this.listaValores = [];
    this.listaValores.push([0, this.capital, 0]);
    let capital = this.capital;
    let roundCapital = 0;
    for (let i = 0; i < this.tiempoDeDepositoAPlazoFijo; i++) {
      let interes = capital * (this.tasaDeInteres / 100);
      capital += interes;
      //Redondear a dos decimales
      roundCapital = Math.round(capital * 100) / 100;
      this.listaValores.push([i + 1, roundCapital, interes]);
    }
    this.capitalFinal = roundCapital;
    this.isSimulate = true;
  }
}
