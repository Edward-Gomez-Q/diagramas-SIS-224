import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-huevos',
  standalone: true,
  imports: [
    NgIf,
    NumericFormComponent,
    TableComponent
  ],
  templateUrl: './huevos.component.html',
  styleUrl: './huevos.component.css'
})
export class HuevosComponent {
  cantidadSimulaciones: number = 0;
  cantidadDias: number = 0;
  precioUnitarioHuevo: number = 0;
  precioUnitarioPollito: number = 0;
  ganaciaNetaPromedio: number = 0;
  listaHeader: string[] = [];
  listaValores: any[] = [];
  ganaciaPromedioDiaria: number = 0;
  promedioHuevosRotos: number = 0;
  promedioPollitosVivos: number = 0;
  promedioPollitosMuertos: number = 0;
  promedioHuevos: number = 0;
  formFields: ( { name: string, label: string, integer: boolean } )[]
    = [
    {name: 'cantidadSimulaciones', label: 'Cantidad de Simulaciones:', integer: true},
    {name: 'cantidadDias', label: 'Cantidad de Días:', integer: true},
    {name: 'precioUnitarioHuevo', label: 'Precio Unitario del Huevo (Bs):', integer: false},
    {name: 'precioUnitarioPollito', label: 'Precio Unitario del Pollito (Bs):', integer: false},
  ];
  isSimulate: boolean = false;
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.cantidadSimulaciones = formData.cantidadSimulaciones;
    this.cantidadDias = formData.cantidadDias;
    this.precioUnitarioHuevo = formData.precioUnitarioHuevo;
    this.precioUnitarioPollito = formData.precioUnitarioPollito;
  }
  private simulate() {
    this.listaHeader = ['Simulación', 'Huevos', 'Pollitos Vivos', 'Pollitos Muertos', 'Huevos Rotos', 'Ganancia Neta'];
    this.listaValores = [];
    let gananciaNetaTotal = 0;
    let huevosRotosTotal = 0;
    let gananciaNetaDiaria = 0;
    this.ganaciaPromedioDiaria = 0;
    for (let i = 0; i < this.cantidadSimulaciones; i++) {
      let huevos = 0;
      let permanecenHuevos = 0;
      let pollitos = 0;
      let pollitosVivos = 0;
      let pollitosMuertos = 0;
      let huevosRotos = 0;
      let gananciaNeta = 0;
      for (let j = 0; j < this.cantidadDias; j++) {
        //Aleatorio entre 0 y 1 con 3 decimales
        let rHUE = Math.round(Math.random() * 1000) / 1000;
        if(rHUE<=0.14){
          huevos=0;
        }else if(rHUE<=0.41){
          huevos=1;
        }else if(rHUE<=0.68){
          huevos=2;
        }else if(rHUE<=0.86){
          huevos=3;
        }else if(rHUE<=0.95){
          huevos=4;
        }else if(rHUE<=0.98){
          huevos=5;
        }else{
          huevos=6;
        }
        for(let k=0; k<huevos; k++){
          //Aleatorio entre 0 y 1 con 2 decimales
          let rPOL = Math.round(Math.random() * 100) / 100;
          if(rPOL<=0.2){
            huevosRotos++;
          }else if(rPOL<=0.5){
            pollitos++;
            //Aleatorio entre 0 y 1 con 2 decimales
            let rVIV = Math.round(Math.random() * 100) / 100;
            if(rVIV<=0.2) {
              pollitosMuertos++;
            }else{
              pollitosVivos++;
            }
          }else{
            permanecenHuevos++;
          }
        }
      }
      gananciaNeta = (permanecenHuevos * this.precioUnitarioHuevo) + (pollitosVivos * this.precioUnitarioPollito);
      gananciaNetaTotal += gananciaNeta;
      huevosRotosTotal += huevosRotos;
      this.ganaciaPromedioDiaria += gananciaNetaDiaria;
      this.promedioHuevosRotos += huevosRotos;
      this.promedioPollitosVivos += pollitosVivos;
      this.promedioPollitosMuertos += pollitosMuertos;
      this.promedioHuevos += huevos;
      this.listaValores.push([i + 1, huevos, pollitosVivos, pollitosMuertos, huevosRotos, gananciaNeta]);
    }
    this.isSimulate = true;
    this.ganaciaNetaPromedio = gananciaNetaTotal / this.cantidadSimulaciones;
    this.ganaciaPromedioDiaria = this.ganaciaPromedioDiaria / this.cantidadSimulaciones;
    this.promedioHuevosRotos = this.promedioHuevosRotos / this.cantidadSimulaciones;
    this.promedioPollitosVivos = this.promedioPollitosVivos / this.cantidadSimulaciones;
    this.promedioPollitosMuertos = this.promedioPollitosMuertos / this.cantidadSimulaciones;
    this.promedioHuevos = this.promedioHuevos / this.cantidadSimulaciones;

  }
}
