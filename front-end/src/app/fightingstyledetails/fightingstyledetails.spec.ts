import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fightingstyledetails } from './fightingstyledetails';

describe('Fightingstyledetails', () => {
  let component: Fightingstyledetails;
  let fixture: ComponentFixture<Fightingstyledetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fightingstyledetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Fightingstyledetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
