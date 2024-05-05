import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css'
})
export class OptionComponent {
  constructor(private router: Router) {}
  @Input() procedure: { name: string; linkPhoto: string; description: string; path:string } = { name: '', linkPhoto: '', description: '', path: ''};
  currentColor = 'var(--nepal-800)';
  generatePath(linkPhoto: string) {
    return `${linkPhoto}`;
  }

  onSelectProcedure(procedure: { name: string; linkPhoto: string; description: string; path:string }) {
    this.router.navigate([procedure.path]).then(r => console.log(r));
  }
}
