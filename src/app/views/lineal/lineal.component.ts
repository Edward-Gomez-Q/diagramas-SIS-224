import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-lineal',
  standalone: true,
  imports: [
    NgIf,
    NumericFormComponent,
    TableComponent
  ],
  templateUrl: './lineal.component.html',
  styleUrl: './lineal.component.css'
})
export class LinealComponent {
  numeroSimulaciones: number = 0;
  numeroIteraciones: number = 0;
  funcionObjetivo: number = 0;
  variableDesicion1: number = 0;
  variableDesicion2: number = 0;
  variableDesicion3: number = 0;
  funcionObjetivoComparacion: number = 0;
  variableComparacion1: number = 0;
  variableComparacion2: number = 0;
  variableComparacion3: number = 0;
  formFields: ( { name: string, label: string, integer: boolean } )[] =[
    {name: 'numeroSimulaciones', label: 'Número de Simulaciones:', integer: true},
    {name: 'numeroIteraciones', label: 'Número de Iteraciones:', integer: true}
  ];
  listaHeader: string[] = [
    'Simulación',
    'X1',
    'X2',
    'X3',
    'Z'
  ];
  listaValores: any[] = [];
  isSimulate: boolean = false;
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.numeroSimulaciones = formData.numeroSimulaciones;
    this.numeroIteraciones = formData.numeroIteraciones;
  }
  private simulate() {
    this.listaValores = [];
    for (let i = 0; i < this.numeroSimulaciones; i++){
      for(let j = 0; j < this.numeroIteraciones; j++){
        this.variableDesicion1 = Math.random();
        this.variableDesicion2 = Math.random();
        let X1 = this.variableDesicion1*10;
        let X2 = Math.round(this.variableDesicion2*100);
        if(X1+X2>=2)
        {
          this.variableDesicion3 = Math.random();
          let X3 = this.variableDesicion3 + 1;
          this.funcionObjetivo = 2*X1 + 3*X2 - X3;
          if(this.funcionObjetivo > this.funcionObjetivoComparacion){
            this.funcionObjetivoComparacion = this.funcionObjetivo;
            this.variableComparacion1 = X1;
            this.variableComparacion2 = X2;
            this.variableComparacion3 = X3;
          }
        }
      }
      this.listaValores.push([i+1, this.variableComparacion1, this.variableComparacion2, this.variableComparacion3, this.funcionObjetivoComparacion]);
    }
    this.isSimulate = true;
  }

}
