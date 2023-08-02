import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviehallComponent } from './moviehall.component';

describe('MoviehallComponent', () => {
  let component: MoviehallComponent;
  let fixture: ComponentFixture<MoviehallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviehallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviehallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
