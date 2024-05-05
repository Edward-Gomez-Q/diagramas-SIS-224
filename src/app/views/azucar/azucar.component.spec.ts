import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzucarComponent } from './azucar.component';

describe('AzucarComponent', () => {
  let component: AzucarComponent;
  let fixture: ComponentFixture<AzucarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzucarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AzucarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
