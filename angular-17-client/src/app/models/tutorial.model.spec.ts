// src/app/models/tutorial.model.spec.ts

import { Tutorial } from './tutorial.model';

describe('Tutorial', () => {
  it('should create an instance', () => {
    const tutorial = new Tutorial('Test Tutorial', 'This is a test description', true);
    expect(tutorial).toBeTruthy();
  });
});
