import { Routes } from '@angular/router';
import {DepositosComponent} from "./views/depositos/depositos.component";
import {PoblacionComponent} from "./views/poblacion/poblacion.component";
import {LinealComponent} from "./views/lineal/lineal.component";
import{DadosComponent} from "./views/dados/dados.component";
import {ArticuloComponent} from "./views/articulo/articulo.component";
import {HuevosComponent} from "./views/huevos/huevos.component";
import {AzucarComponent} from "./views/azucar/azucar.component";
import {WelcomeComponent} from "./views/welcome/welcome.component";

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'depositos',
    component: DepositosComponent,
    pathMatch: 'full',
  },
  {
    path: 'poblacion',
    component: PoblacionComponent,
    pathMatch: 'full',
  },
  {
    path: 'lineal',
    component: LinealComponent,
    pathMatch: 'full',
  },
  {
    path: 'dados',
    component: DadosComponent,
    pathMatch: 'full',
  },
  {
    path: 'articulo',
    component: ArticuloComponent,
    pathMatch: 'full',
  },
  {
    path: 'huevos',
    component: HuevosComponent,
    pathMatch: 'full',
  },
  {
    path: 'azucar',
    component: AzucarComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  }
];
