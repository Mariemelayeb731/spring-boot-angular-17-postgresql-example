import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialsListComponent } from './tutorials-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TutorialService } from '../../services/tutorial.service';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import du schéma personnalisé

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
      providers: [TutorialService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajout de CUSTOM_ELEMENTS_SCHEMA
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
