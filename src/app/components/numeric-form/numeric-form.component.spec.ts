import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericFormComponent } from './numeric-form.component';

describe('NumericFormComponent', () => {
  let component: NumericFormComponent;
  let fixture: ComponentFixture<NumericFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumericFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
