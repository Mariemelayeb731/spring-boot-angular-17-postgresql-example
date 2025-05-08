import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TutorialService } from './tutorial.service';
import { Tutorial } from '../models/tutorial.model';

describe('TutorialService', () => {
  let service: TutorialService;
  let httpMock: HttpTestingController;

  const dummyTutorials: Tutorial[] = [
    { id: 1, title: 'Test 1', description: 'Desc 1', published: true },
    { id: 2, title: 'Test 2', description: 'Desc 2', published: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    });

    service = TestBed.inject(TutorialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tutorials', () => {
    service.getAll().subscribe(tutorials => {
      expect(tutorials.length).toBe(2);
      expect(tutorials).toEqual(dummyTutorials);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/tutorials');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTutorials);
  });

  it('should retrieve tutorial by ID', () => {
    const tutorial: Tutorial = dummyTutorials[0];

    service.get(1).subscribe(result => {
      expect(result).toEqual(tutorial);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/tutorials/1');
    expect(req.request.method).toBe('GET');
    req.flush(tutorial);
  });
});
