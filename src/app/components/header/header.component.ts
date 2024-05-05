import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  imgLogo: string = 'assets/laptop-solid.svg';
  items = [
    { link: "/", img: 'assets/house-solid.svg', tooltip: 'Inicio', showTooltip: false },
    { link: "/depositos", img: 'assets/piggy-bank-solid.svg', tooltip: 'Depósitos', showTooltip: false },
    { link: "/poblacion", img: 'assets/person-arrow-up-from-line-solid.svg', tooltip: 'Población', showTooltip: false },
    { link: "/lineal", img: 'assets/chart-line-solid.svg', tooltip: 'Programación Lineal', showTooltip: false },
    { link: "/dados", img: 'assets/dice-solid.svg', tooltip: 'Dados', showTooltip: false },
    { link: "/articulo", img: 'assets/chart-bar-solid.svg', tooltip: 'Artículos', showTooltip: false },
    { link: "/huevos", img: 'assets/egg-solid.svg', tooltip: 'Huevos', showTooltip: false },
    { link: "/azucar", img: 'assets/boxes-stacked-solid.svg', tooltip: 'Azucar', showTooltip: false }
  ];
}
