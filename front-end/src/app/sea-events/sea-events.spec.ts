import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaEvents } from './sea-events';

describe('SeaEvents', () => {
  let component: SeaEvents;
  let fixture: ComponentFixture<SeaEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeaEvents],
    }).compileComponents();

    fixture = TestBed.createComponent(SeaEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
