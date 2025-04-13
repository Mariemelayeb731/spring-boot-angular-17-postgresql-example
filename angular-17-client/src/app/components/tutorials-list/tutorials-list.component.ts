import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials: Tutorial[] = [];
  currentTutorial?: Tutorial; // ✅ Correction ici : plus de "null", maintenant c'est "undefined"
  currentIndex = -1;
  title = '';
  errorMessage: string = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe(
      data => {
        this.tutorials = data;
      },
      error => {
        console.log(error);
        this.errorMessage = 'Erreur lors du chargement des tutoriels.';
      }
    );
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe(
      response => {
        console.log(response);
        this.retrieveTutorials();
      },
      error => {
        console.log(error);
        this.errorMessage = 'Erreur lors de la suppression des tutoriels.';
      }
    );
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title).subscribe(
      data => {
        this.tutorials = data;
      },
      error => {
        console.log(error);
        this.errorMessage = 'Erreur lors de la recherche.';
      }
    );
  }

  // ✅ Ajout de la méthode manquante : trackById
  trackById(index: number, item: Tutorial): any {
    return item.id;
  }
}
