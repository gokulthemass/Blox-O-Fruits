import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDetails } from './fruit-details';

describe('FruitDetails', () => {
  let component: FruitDetails;
  let fixture: ComponentFixture<FruitDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(FruitDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
