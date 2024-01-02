import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippingAddressPageComponent } from './edit-shipping-address-page.component';

describe('EditShippingAddressPageComponent', () => {
  let component: EditShippingAddressPageComponent;
  let fixture: ComponentFixture<EditShippingAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShippingAddressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShippingAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
