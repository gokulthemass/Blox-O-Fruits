import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwordDetails } from './sword-details';

describe('SwordDetails', () => {
  let component: SwordDetails;
  let fixture: ComponentFixture<SwordDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwordDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(SwordDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
