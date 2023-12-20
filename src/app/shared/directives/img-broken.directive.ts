import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
})
export class ImgBrokenDirective {
  @Input() defaultImage: string = '';
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement;
    elNative.src = this.defaultImage;
  }

  constructor(private elHost: ElementRef) {}
}
