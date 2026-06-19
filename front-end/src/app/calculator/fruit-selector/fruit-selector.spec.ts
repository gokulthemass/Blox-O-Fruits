import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitSelector } from './fruit-selector';

describe('FruitSelector', () => {
  let component: FruitSelector;
  let fixture: ComponentFixture<FruitSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(FruitSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
