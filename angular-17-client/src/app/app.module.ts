import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Ajouté ici

const routes: Routes = [
  { path: '', redirectTo: '/tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'tutorial-details/:id', component: TutorialDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TutorialsListComponent,
    TutorialDetailsComponent,
    AddTutorialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,               // ✅ Ajouté ici aussi
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
