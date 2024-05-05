import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [
    NgIf,
    NumericFormComponent,
    TableComponent
  ],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css'
})
export class DadosComponent {
  cantidadSimulaciones: number = 0;
  cantidadLanzamientos: number = 0;
  ingresoUnitarioPorLanzamiento: number = 0;
  perdidaUnitariaPorLanzamiento: number = 0;
  gananciaNetaCasaPromedio: number = 0;
  numeroDeJuegosQueGanaLaCasaPromedio: number = 0;
  PorcejateDeJuegosQueGanaLaCasaPromedio: number = 0;
  formFields: ( { name: string, label: string, integer: boolean } )[]
    = [
    {name: 'cantidadSimulaciones', label: 'Cantidad de Simulaciones:', integer: true},
    {name: 'cantidadLanzamientos', label: 'Cantidad de Lanzamientos:', integer: true},
    {name: 'ingresoUnitarioPorLanzamiento', label: 'Ingreso Unitario por Lanzamiento:', integer: false},
    {name: 'perdidaUnitariaPorLanzamiento', label: 'Perdida Unitaria por Lanzamiento:', integer: false},
  ];
  listaHeader: string[] = [];
  listaValores: any[] = [];
  isSimulate: boolean = false;
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.cantidadSimulaciones = formData.cantidadSimulaciones;
    this.cantidadLanzamientos = formData.cantidadLanzamientos;
    this.ingresoUnitarioPorLanzamiento = formData.ingresoUnitarioPorLanzamiento;
    this.perdidaUnitariaPorLanzamiento = formData.perdidaUnitariaPorLanzamiento;
  }
  private simulate() {
    this.listaHeader = ['Simulación', 'Ganancia Neta Casa', 'Número de Juegos que Gana la Casa', 'Porcentaje de Juegos que Gana la Casa'];
    this.listaValores = [];
    for (let f = 0; f < this.cantidadSimulaciones; f++) {
      let gananciaNetaCasa = 0;
      let numeroDeJuegosQueGanaLaCasa = 0;
      for(let i=0;i<this.cantidadLanzamientos;i++) {
        let resultadoDado1 = Math.floor(Math.random() * 6) + 1;
        let resultadoDado2 = Math.floor(Math.random() * 6) + 1;
        let sumaDados = resultadoDado1 + resultadoDado2;
        let ganancia = this.ingresoUnitarioPorLanzamiento;
        if (sumaDados == 7) {
          ganancia = ganancia-this.perdidaUnitariaPorLanzamiento;
        }
        gananciaNetaCasa += ganancia;
        if (ganancia > 0) {
          numeroDeJuegosQueGanaLaCasa++;
        }
      }
      this.listaValores.push([f + 1, gananciaNetaCasa, numeroDeJuegosQueGanaLaCasa, (numeroDeJuegosQueGanaLaCasa / this.cantidadLanzamientos) * 100]);
      this.gananciaNetaCasaPromedio += gananciaNetaCasa;
      this.numeroDeJuegosQueGanaLaCasaPromedio += numeroDeJuegosQueGanaLaCasa;
    }
    this.gananciaNetaCasaPromedio = this.gananciaNetaCasaPromedio / this.cantidadSimulaciones;
    this.numeroDeJuegosQueGanaLaCasaPromedio = this.numeroDeJuegosQueGanaLaCasaPromedio / this.cantidadSimulaciones;
    this.PorcejateDeJuegosQueGanaLaCasaPromedio = (this.numeroDeJuegosQueGanaLaCasaPromedio / this.cantidadLanzamientos) * 100;
    this.isSimulate = true;
  }

}
