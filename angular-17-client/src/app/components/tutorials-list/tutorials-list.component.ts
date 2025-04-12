import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  currentIndex = -1;
  title = ''; // Ajout de la propriété manquante

  constructor(private tutorialService: TutorialService) {}

  // Implémentation de OnInit
  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
      },
      error: (e) => console.error(e)
    });
  }

  // Ajout des méthodes manquantes
  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data;
      },
      error: (e) => console.error(e)
    });
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe({
      next: (res) => {
        this.tutorials = [];
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.currentTutorial = {
      title: '',
      description: '',
      published: false
    };
    this.currentIndex = -1;
  }
}
