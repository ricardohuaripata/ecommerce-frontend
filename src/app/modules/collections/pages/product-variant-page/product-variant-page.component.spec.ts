import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantPageComponent } from './product-variant-page.component';

describe('ProductVariantPageComponent', () => {
  let component: ProductVariantPageComponent;
  let fixture: ComponentFixture<ProductVariantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVariantPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVariantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
