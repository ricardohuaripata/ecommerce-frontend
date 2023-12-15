import { Component, Input, OnInit } from '@angular/core';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() title: string = ''
  @Input() colorProductVariantList: ColorProductVariant[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
