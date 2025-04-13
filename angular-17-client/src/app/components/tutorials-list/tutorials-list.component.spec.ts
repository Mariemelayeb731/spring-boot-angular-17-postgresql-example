import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TutorialsListComponent } from './tutorials-list.component';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model'; // Assurez-vous que le chemin d'importation est correct

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;
  let httpMock: HttpTestingController;
  let tutorialService: TutorialService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent],
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    tutorialService = TestBed.inject(TutorialService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Assurez-vous qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tutorials on init', () => {
    const mockTutorials: Tutorial[] = [
      { id: 1, title: 'Tutorial 1', description: 'Description 1', published: true },
      { id: 2, title: 'Tutorial 2', description: 'Description 2', published: false }
    ];

    // Espionner la méthode getAll du service
    spyOn(tutorialService, 'getAll').and.callThrough();

    // Déclencher ngOnInit du composant
    component.ngOnInit();

    // S'assurer que la méthode getAll a été appelée
    expect(tutorialService.getAll).toHaveBeenCalled();

    // Simuler la réponse HTTP avec les données factices
    const req = httpMock.expectOne('http://localhost:8080/api/tutorials');
    expect(req.request.method).toBe('GET');
    req.flush(mockTutorials);

    // Vérifier que la propriété tutorials est correctement peuplée
    expect(component.tutorials.length).toBe(2);
    expect(component.tutorials).toEqual(mockTutorials);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    // Mettre à jour le sélecteur si nécessaire
    expect(compiled.querySelectorAll('.tutorial-item').length).toBe(2);
  });

  it('should handle HTTP error and display error message', () => {
    const errorMessage = 'Failed to load tutorials';

    // Espionner la méthode getAll du service
    spyOn(tutorialService, 'getAll').and.callThrough();

    // Déclencher ngOnInit du composant
    component.ngOnInit();

    // S'assurer que la méthode getAll a été appelée
    expect(tutorialService.getAll).toHaveBeenCalled();

    // Simuler une erreur HTTP
    const req = httpMock.expectOne('http://localhost:8080/api/tutorials');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });

    // Assurez-vous que errorMessage est défini dans le composant
    expect(component.tutorials.length).toBe(0);
    expect(component.errorMessage).toBe(errorMessage);
  });
});
