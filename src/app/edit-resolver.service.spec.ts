import { TestBed, inject } from '@angular/core/testing';

import { EditResolverService } from './edit-resolver.service';

describe('EditResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditResolverService]
    });
  });

  it('should be created', inject([EditResolverService], (service: EditResolverService) => {
    expect(service).toBeTruthy();
  }));
});
