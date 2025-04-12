import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTutorialComponent } from './add-tutorial.component';
import { TutorialService } from '../../services/tutorial.service';

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajout crucial
      declarations: [AddTutorialComponent],
      providers: [TutorialService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait réinitialiser le formulaire', () => {
    component.newTutorial();
    expect(component.submitted).toBeFalse();
    expect(component.tutorial.title).toBe('');
  });
});