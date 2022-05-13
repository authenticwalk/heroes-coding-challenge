import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorPageComponent } from './armor-page.component';

describe('ArmorPageComponent', () => {
  let component: ArmorPageComponent;
  let fixture: ComponentFixture<ArmorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
