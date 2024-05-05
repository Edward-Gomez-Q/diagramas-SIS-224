import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [
    NgIf,
    NumericFormComponent,
    TableComponent
  ],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
  cantidadSimulaciones: number = 0;
  cantidadHoras: number = 0;
  llegadaClientes: number = 0;
  ventaArticulosPorCliente: number = 0;
  gananciaNetaPorSimulacion: number = 0;
  totalArticulosVendidosPorSimulacion: number = 0;
  totalGananciaNeta: number = 0;
  totalArticulosVendidos: number = 0;
  costoFijoPorDia: number = 0;
  costoUnitarioPorArticulo: number = 0;
  precioVentaPorArticulo: number = 0;
  listaHeader: string[] = [];
  listaValores: any[] = [];
  formFields: ( { name: string, label: string, integer: boolean } )[]
    = [
    {name: 'cantidadSimulaciones', label: 'Cantidad de Simulaciones:', integer: true},
    {name: 'cantidadHoras', label: 'Cantidad de Horas:', integer: true},
    {name: 'costoFijoPorDia', label: 'Costo Fijo por Día (Bs):', integer: false},
    {name: 'costoUnitarioPorArticulo', label: 'Costo Unitario por Artículo (Bs):', integer: false},
    {name: 'precioVentaPorArticulo', label: 'Precio de Venta por Artículo (Bs):', integer: false},
  ];
  isSimulate: boolean = false;
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.cantidadSimulaciones = formData.cantidadSimulaciones;
    this.cantidadHoras = formData.cantidadHoras;
    this.costoFijoPorDia = formData.costoFijoPorDia;
    this.costoUnitarioPorArticulo = formData.costoUnitarioPorArticulo;
    this.precioVentaPorArticulo = formData.precioVentaPorArticulo;
  }
  private simulate() {
    this.listaHeader = ['Simulación', 'Ganancia Neta', 'Total Artículos Vendidos'];
    this.listaValores = [];
    this.totalGananciaNeta = 0;
    this.totalArticulosVendidos = 0;
    for (let i = 0; i < this.cantidadSimulaciones; i++) {
      this.totalArticulosVendidosPorSimulacion = 0;
      this.gananciaNetaPorSimulacion = 0;
      for(let j = 0; j < this.cantidadHoras; j++) {
        let clientes = Math.round(Math.random() * 4)
        for(let k = 0; k < clientes; k++) {
          let articulos = Math.round((Math.random() + Number.EPSILON) * 1000) / 1000;
          if(articulos <= 0.2) {
            articulos=0;
          }else if(articulos <= 0.5) {
            articulos = 1;
          }else if(articulos <= 0.9) {
            articulos = 2;
          }else{
            articulos = 3;
          }
          this.totalArticulosVendidosPorSimulacion += articulos;
        }
      }
      this.gananciaNetaPorSimulacion = (this.totalArticulosVendidosPorSimulacion * (this.precioVentaPorArticulo - this.costoUnitarioPorArticulo)) - this.costoFijoPorDia;
      this.listaValores.push([i + 1, this.gananciaNetaPorSimulacion, this.totalArticulosVendidosPorSimulacion]);
      this.totalGananciaNeta += this.gananciaNetaPorSimulacion;
      this.totalArticulosVendidos += this.totalArticulosVendidosPorSimulacion;
    }
    this.totalGananciaNeta = this.totalGananciaNeta / (this.cantidadSimulaciones);
    this.totalArticulosVendidos = this.totalArticulosVendidos / (this.cantidadSimulaciones);
    this.isSimulate = true;
  }
}
