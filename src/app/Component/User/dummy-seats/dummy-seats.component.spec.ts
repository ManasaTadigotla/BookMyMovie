import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummySeatsComponent } from './dummy-seats.component';

describe('DummySeatsComponent', () => {
  let component: DummySeatsComponent;
  let fixture: ComponentFixture<DummySeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummySeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummySeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
