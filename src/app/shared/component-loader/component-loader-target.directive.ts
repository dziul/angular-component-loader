import { Directive, HostListener, Input } from '@angular/core';
import { ComponentLoaderService } from './component-loader.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[componentLoaderTarget]',
})
export class ComponentLoaderTargetDirective {
  @Input('componentLoaderTarget') target: string;

  @HostListener('click') gotTo() {
    this.componentLoaderService.load(this.target);
  }

  constructor(private componentLoaderService: ComponentLoaderService) {}
}
