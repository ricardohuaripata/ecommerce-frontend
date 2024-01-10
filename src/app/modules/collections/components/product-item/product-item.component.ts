import { Component, Input, OnInit } from '@angular/core';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() colorProductVariant!: ColorProductVariant;
  imageLoaded: boolean = false;

  onImageLoad() {
    this.imageLoaded = true;
  }
}
