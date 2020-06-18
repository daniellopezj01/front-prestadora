import { TestBed } from '@angular/core/testing';

import { MenuBottomService } from './menu-bottom.service';

describe('MenuBottomService', () => {
  let service: MenuBottomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuBottomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
