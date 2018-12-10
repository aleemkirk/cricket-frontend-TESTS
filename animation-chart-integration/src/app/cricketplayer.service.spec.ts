import { TestBed } from '@angular/core/testing';

import { CricketplayerService } from './cricketplayer.service';

describe('CricketplayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CricketplayerService = TestBed.get(CricketplayerService);
    expect(service).toBeTruthy();
  });
});
