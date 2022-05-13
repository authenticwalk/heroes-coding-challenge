import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponPageComponent } from './weapon-page.component';

describe('WeaponPageComponent', () => {
  let component: WeaponPageComponent;
  let fixture: ComponentFixture<WeaponPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
