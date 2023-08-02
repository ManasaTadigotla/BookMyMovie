import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTraileComponent } from './movie-traile.component';

describe('MovieTraileComponent', () => {
  let component: MovieTraileComponent;
  let fixture: ComponentFixture<MovieTraileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTraileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTraileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
