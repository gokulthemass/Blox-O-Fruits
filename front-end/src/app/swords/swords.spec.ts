import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Swords } from './swords';

describe('Swords', () => {
  let component: Swords;
  let fixture: ComponentFixture<Swords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Swords],
    }).compileComponents();

    fixture = TestBed.createComponent(Swords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
