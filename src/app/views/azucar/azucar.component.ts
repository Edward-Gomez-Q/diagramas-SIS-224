import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NumericFormComponent} from "../../components/numeric-form/numeric-form.component";
import {TableComponent} from "../../components/table/table.component";

@Component({
  selector: 'app-azucar',
  standalone: true,
  imports: [
    NgIf,
    NumericFormComponent,
    TableComponent
  ],
  templateUrl: './azucar.component.html',
  styleUrl: './azucar.component.css'
})
export class AzucarComponent {
  cantidadSimulaciones: number = 0;
  cantidadDias: number = 0;
  demandaAzucar: number = 0;
  capacidadAlmacenamiento: number = 0;
  pedidoAzucar: number = 0;
  tiempoDeEntrega: number = 0;
  costoDeReorden: number = 0;
  costoUnitarioDeAlmacenamiento: number = 0;
  costoUnitarioDeAdquisicion: number = 0;
  precioUnitarioDeVenta: number = 0;
  gananciaNeta: number = 0;
  demandaInsatisfecha: number = 0;
  costoTotal: number = 0;
  costoDiarioDeInventario: number = 0;
  costoAdquisicion: number = 0;
  inventario: number = 0;
  ingresoBruto: number = 0;
  costoReordenTotal: number = 0;
  demandaInsatisfechaTotal: number = 0;

  promedioCostoTotal: number = 0;
  promedioDemandaInsatisfecha: number = 0;
  promedioGananciaNeta: number = 0;

  listaHeader: string[] = [];
  listaValores: any[] = [];
  formFields: ( { name: string, label: string, integer: boolean } )[]
    = [
    {name: 'cantidadSimulaciones', label: 'Cantidad de Simulaciones:', integer: true},
    {name: 'cantidadDias', label: 'Cantidad de Días:', integer: true},
    {name: 'capacidadAlmacenamiento', label: 'Capacidad de Almacenamiento (Kg):', integer: true},
    {name: 'costoUnitarioDeAlmacenamiento', label: 'Costo Unitario de Almacenamiento (Bs/Kg):', integer: false},
    {name: 'costoUnitarioDeAdquisicion', label: 'Costo Unitario de Adquisición (Bs/Kg):', integer: false},
    {name: 'precioUnitarioDeVenta', label: 'Precio Unitario de Venta (Bs/Kg):', integer: false},
    {name: 'costoDeReorden', label: 'Costo de Reorden (Bs):', integer: false},
  ];
  isSimulate: boolean = false;
  public onSubmit(formData: any) {
    this.formDataToValues(formData);
    this.simulate();
  }
  private formDataToValues(formData: any) {
    this.cantidadSimulaciones = formData.cantidadSimulaciones;
    this.cantidadDias = formData.cantidadDias;
    this.capacidadAlmacenamiento = formData.capacidadAlmacenamiento;
    this.costoDeReorden = formData.costoDeReorden;
    this.costoUnitarioDeAlmacenamiento = formData.costoUnitarioDeAlmacenamiento;
    this.costoUnitarioDeAdquisicion = formData.costoUnitarioDeAdquisicion;
    this.precioUnitarioDeVenta = formData.precioUnitarioDeVenta;
  }
  private simulate() {
    this.listaHeader = ['Día', 'Costo Total', 'Demanda Insatisfecha','Ingreso Bruto', 'Ganancia Neta'];
    this.listaValores = [];
    for(let i=0;i<this.cantidadSimulaciones;i++){
      this.inventario = this.capacidadAlmacenamiento;
      this.costoReordenTotal += this.costoDeReorden;
      this.costoAdquisicion += (this.inventario * this.costoUnitarioDeAdquisicion);
      for(let f=0;f<this.cantidadDias;f++)
      {
        if (this.tiempoDeEntrega > 0) {
          this.tiempoDeEntrega--;
          if (this.tiempoDeEntrega == 0) {
            this.inventario += this.pedidoAzucar;
          }
        }
        this.demandaAzucar = Math.round(-100 * Math.log(1-Math.random()));
        if(this.demandaAzucar>this.inventario) {
          this.demandaInsatisfecha += this.demandaAzucar - this.inventario;
          this.ingresoBruto += (this.inventario * this.precioUnitarioDeVenta);
          this.inventario = 0;
        }else{
          this.ingresoBruto += (this.demandaAzucar * this.precioUnitarioDeVenta);
          this.inventario -= this.demandaAzucar;
          this.costoDiarioDeInventario += (this.inventario * this.costoUnitarioDeAlmacenamiento);
        }
        if((f%7)==0){
          this.pedidoAzucar = this.capacidadAlmacenamiento - this.inventario;
          this.costoAdquisicion += (this.pedidoAzucar * this.costoUnitarioDeAdquisicion);
          this.costoReordenTotal += this.costoDeReorden;
          this.tiempoDeEntrega = Math.round(1+(Math.random()*2));
        }
      }
      this.costoTotal = this.costoAdquisicion + this.costoDiarioDeInventario + this.costoReordenTotal;
      this.gananciaNeta = this.ingresoBruto - this.costoTotal;
      this.demandaInsatisfechaTotal += this.demandaInsatisfecha;
      this.listaValores.push([i+1, this.costoTotal, this.demandaInsatisfecha, this.ingresoBruto, this.gananciaNeta]);
      this.promedioCostoTotal += this.costoTotal;
      this.promedioDemandaInsatisfecha += this.demandaInsatisfecha;
      this.promedioGananciaNeta += this.gananciaNeta;

      this.demandaInsatisfecha = 0;
      this.costoAdquisicion = 0;
      this.ingresoBruto = 0;
      this.costoReordenTotal = 0;
      this.tiempoDeEntrega = 0;
      this.costoDiarioDeInventario = 0;
    }
    this.promedioCostoTotal /= this.cantidadSimulaciones;
    this.promedioDemandaInsatisfecha /= this.cantidadSimulaciones;
    this.promedioGananciaNeta /= this.cantidadSimulaciones;
    this.isSimulate = true;
  }
}
