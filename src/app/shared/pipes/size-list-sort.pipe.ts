import { Pipe, PipeTransform } from '@angular/core';
import { SizeColorProductVariant } from 'src/app/core/interfaces/size-color-product-variant';

@Pipe({
  name: 'sizeListSort',
})
export class SizeListSortPipe implements PipeTransform {
  transform(value: SizeColorProductVariant[]): SizeColorProductVariant[] {
    if (!Array.isArray(value)) {
      return value;
    }

    const order = ['S', 'M', 'L', 'XL', 'XXL'];

    value.sort((a, b) => {
      const indexA = order.indexOf(a.size);
      const indexB = order.indexOf(b.size);
      return indexA - indexB;
    });

    return value;
  }
}
