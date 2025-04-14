import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialsListComponent } from './tutorials-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TutorialService } from '../../services/tutorial.service';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import du schéma personnalisé
import { ActivatedRoute } from '@angular/router'; // Pour gérer l'injection d'ActivatedRoute
import { of } from 'rxjs'; // Pour retourner un observable

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TutorialsListComponent,
        TutorialDetailsComponent // Ajout du composant utilisé dans le template
      ],
      imports: [HttpClientTestingModule],
      providers: [
        TutorialService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } } // Mock de ActivatedRoute
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajout de CUSTOM_ELEMENTS_SCHEMA pour ignorer les erreurs liées aux éléments inconnus
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
