import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-poblacion',
  standalone: true,
    imports: [
        NgIf,
        NumericFormComponent,
        TableComponent
    ],
  templateUrl: './poblacion.component.html',
  styleUrl: './poblacion.component.css'
})
export class PoblacionComponent {
  isSimulate: boolean = false;
  anoInicial: number = 2012;
  anoFinal: number = 0;
  poblacionInicialBolivia: number = 10027254;
  tasaNatalidad: number = 0.02493;
  tasaMortalidad: number = 0.00793;
  nacimientos: number = 0;
  defunciones: number = 0;
  poblacionFinal: number = 0;

  listaHeader: string[] = [];
  listaValores: any[] = [];

  formFields: ( { name: string, label: string, integer: boolean } )[]
    =[
    {name: 'anoInicial', label: 'Año Inicial:', integer: true},
    {name: 'anoFinal', label: 'Año Final:', integer: true},
    {name: 'poblacionInicialBolivia', label: 'Población Inicial de Bolivia:', integer: true},
    {name: 'tasaNatalidad', label: 'Tasa de Natalidad:', integer: false},
    {name: 'tasaMortalidad', label: 'Tasa de Mortalidad:', integer: false}
  ];
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.anoInicial = formData.anoInicial;
    this.anoFinal = formData.anoFinal;
    this.poblacionInicialBolivia = formData.poblacionInicialBolivia;
    this.tasaNatalidad = formData.tasaNatalidad;
    this.tasaMortalidad = formData.tasaMortalidad;
  }
  private simulate() {
    this.listaHeader = ['Año', 'Población', 'Nacimientos', 'Defunciones'];
    this.listaValores = [];
    this.listaValores.push([this.anoInicial, this.poblacionInicialBolivia, 0, 0]);
    let poblacion = this.poblacionInicialBolivia;
    for (let i = this.anoInicial; i < this.anoFinal; i++) {
      this.nacimientos = Math.round(poblacion * this.tasaNatalidad);
      this.defunciones = Math.round(poblacion * this.tasaMortalidad);
      poblacion += this.nacimientos - this.defunciones;
      this.listaValores.push([i + 1, poblacion, this.nacimientos, this.defunciones]);
    }
    this.poblacionFinal = poblacion;
    this.isSimulate = true;
  }
}
