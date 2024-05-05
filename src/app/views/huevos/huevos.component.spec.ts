import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuevosComponent } from './huevos.component';

describe('HuevosComponent', () => {
  let component: HuevosComponent;
  let fixture: ComponentFixture<HuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuevosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
