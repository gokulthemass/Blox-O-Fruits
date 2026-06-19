import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitCalculator } from './fruit-calculator';

describe('FruitCalculator', () => {
  let component: FruitCalculator;
  let fixture: ComponentFixture<FruitCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(FruitCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
