import { TestBed } from '@angular/core/testing';

import { FoodItemServiceService } from './food-item-service.service';

describe('FoodItemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodItemServiceService = TestBed.get(FoodItemServiceService);
    expect(service).toBeTruthy();
  });
});
