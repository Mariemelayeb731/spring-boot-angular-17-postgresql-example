import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // <-- Correction : string[] au lieu d'un seul string
})
export class AppComponent {
  title = 'angular-17-crud';

  // Ajout si tu veux utiliser currentTutorial ici :
  currentTutorial: any;
}
