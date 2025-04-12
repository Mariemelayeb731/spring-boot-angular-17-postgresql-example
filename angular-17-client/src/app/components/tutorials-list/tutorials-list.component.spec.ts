import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import ajouté
import { TutorialsListComponent } from './tutorials-list.component';
import { TutorialService } from '../../services/tutorial.service'; // Import ajouté

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent],
      imports: [HttpClientTestingModule], // <-- Ajout crucial
      providers: [TutorialService] // <-- Si le composant injecte TutorialService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });
});