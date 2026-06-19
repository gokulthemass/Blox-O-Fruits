import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitConfig } from './fruit-config';

describe('FruitConfig', () => {
  let component: FruitConfig;
  let fixture: ComponentFixture<FruitConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(FruitConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
