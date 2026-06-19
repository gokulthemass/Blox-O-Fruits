import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaEventDetails } from './sea-event-details';

describe('SeaEventDetails', () => {
  let component: SeaEventDetails;
  let fixture: ComponentFixture<SeaEventDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeaEventDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(SeaEventDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
