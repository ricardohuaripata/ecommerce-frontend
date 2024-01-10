import { Component, Input } from '@angular/core';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() category!: Category;
  imageLoaded: boolean = false;

  onImageLoad() {
    this.imageLoaded = true;
  }
}
