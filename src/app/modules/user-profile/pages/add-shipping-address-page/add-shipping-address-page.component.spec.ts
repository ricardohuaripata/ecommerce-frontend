import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingAddressPageComponent } from './add-shipping-address-page.component';

describe('AddShippingAddressPageComponent', () => {
  let component: AddShippingAddressPageComponent;
  let fixture: ComponentFixture<AddShippingAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingAddressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShippingAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
