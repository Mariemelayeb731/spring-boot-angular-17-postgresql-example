import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import pour la gestion des formulaires
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Si le composant fait des requêtes HTTP
import { AddTutorialComponent } from './add-tutorial.component';
import { TutorialService } from '../../services/tutorial.service'; // Service utilisé dans le composant
import { of } from 'rxjs'; // Pour simuler la réponse d'un service

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;
  let tutorialService: TutorialService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTutorialComponent],
      imports: [FormsModule, HttpClientTestingModule], // Importation des modules nécessaires pour les formulaires et les requêtes HTTP
      providers: [TutorialService] // Fournir le service pour l'injection
    }).compileComponents();

    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    tutorialService = TestBed.inject(TutorialService); // Injection du service dans le test
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTutorial method and reset form on success', () => {
    const newTutorial = { title: 'New Tutorial', description: 'Test description', published: false };
    
    // Spy sur le service d'ajout de tutoriel pour simuler un succès
    spyOn(tutorialService, 'create').and.returnValue(of(newTutorial));

    // Affectation d'un tutoriel à ajouter
    component.tutorial = newTutorial;

    // Appel de la méthode pour ajouter le tutoriel
    component.saveTutorial();

    // Vérification que le service a bien été appelé
    expect(tutorialService.create).toHaveBeenCalledWith(newTutorial);
    
    // Vérification si le formulaire a été réinitialisé après ajout
    expect(component.tutorial.title).toBe('');
    expect(component.tutorial.description).toBe('');
    expect(component.tutorial.published).toBe(false);
  });
});
