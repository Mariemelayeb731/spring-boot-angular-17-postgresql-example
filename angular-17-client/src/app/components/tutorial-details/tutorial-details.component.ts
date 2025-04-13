import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnDestroy {
  @Input() viewMode = false;
  @Input() currentTutorial?: Tutorial;
  
  tutorial?: Tutorial;
  message = '';
  private routeSub?: Subscription;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.routeSub = this.route.params.subscribe(params => {
        const id = +params['id'];
        this.getTutorial(id);
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  getTutorial(id: number): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.tutorial = data;
        this.message = '';
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur lors du chargement du tutoriel';
      }
    });
  }

  updatePublished(status: boolean): void {
    if (!this.tutorial?.id) return;

    const updateData = { 
      ...this.tutorial, 
      published: status 
    };

    this.tutorialService.update(this.tutorial.id, updateData).subscribe({
      next: (res) => {
        this.tutorial!.published = status;
        this.message = 'Statut mis à jour avec succès';
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur de mise à jour';
      }
    });
  }

  updateTutorial(): void {
    if (!this.tutorial?.id) return;

    this.tutorialService.update(this.tutorial.id, this.tutorial).subscribe({
      next: (res) => {
        this.message = 'Tutoriel modifié avec succès';
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur de modification';
      }
    });
  }

  deleteTutorial(): void {
    if (!this.tutorial?.id) return;

    this.tutorialService.delete(this.tutorial.id).subscribe({
      next: (res) => {
        this.router.navigate(['/tutorials']);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur de suppression';
      }
    });
  }
}