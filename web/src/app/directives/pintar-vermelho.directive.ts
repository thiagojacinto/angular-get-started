import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[pintarVermelho]'
})
export class PintarVermelhoDirective {

  constructor(private element: ElementRef) {
    element.nativeElement.style.color = "red"
  }

}
