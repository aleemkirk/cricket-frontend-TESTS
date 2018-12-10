import { TestBed } from '@angular/core/testing';

import { CricketPlayerService } from './cricket-player.service';

describe('CricketPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CricketPlayerService = TestBed.get(CricketPlayerService);
    expect(service).toBeTruthy();
  });
});
