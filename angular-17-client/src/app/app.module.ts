import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Nécessaire pour ngModel
import { HttpClientModule } from '@angular/common/http'; // Nécessaire pour TutorialService
// Composants
import { AppComponent } from './app.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';

import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    TutorialsListComponent,
    TutorialDetailsComponent // <-- Ajouter cette ligne
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule, // <-- Nécessaire pour les formulaires
    HttpClientModule // <-- Nécessaire pour les appels HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }