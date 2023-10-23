import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VariableCharacteristicComponent } from './variable-characteristic.component';

describe('VariableCharacteristicComponent', () => {
  let component: VariableCharacteristicComponent;
  let fixture: ComponentFixture<VariableCharacteristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableCharacteristicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VariableCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
