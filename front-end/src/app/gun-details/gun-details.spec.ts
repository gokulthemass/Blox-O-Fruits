import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunDetails } from './gun-details';

describe('GunDetails', () => {
  let component: GunDetails;
  let fixture: ComponentFixture<GunDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GunDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(GunDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
