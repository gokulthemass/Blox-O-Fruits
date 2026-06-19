import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightingStyles } from './fighting-styles';

describe('FightingStyles', () => {
  let component: FightingStyles;
  let fixture: ComponentFixture<FightingStyles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightingStyles],
    }).compileComponents();

    fixture = TestBed.createComponent(FightingStyles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
