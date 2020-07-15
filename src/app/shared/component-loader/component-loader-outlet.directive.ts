import { Directive, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { ComponentLoaderService } from './component-loader.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[componentLoaderOutlet]',
})
export class ComponentLoaderOutletDirective implements OnInit, OnDestroy {
  loadComponent$: Subscription;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentLoaderService: ComponentLoaderService
  ) {}

  ngOnInit() {
    this.loadComponent$ = this.componentLoaderService.prepare(this.viewContainerRef).subscribe();
  }

  ngOnDestroy() {
    this.loadComponent$.unsubscribe();
  }
}
