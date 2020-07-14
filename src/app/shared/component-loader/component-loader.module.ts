import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentLoaderOutletDirective } from './component-loader-outlet.directive';
import { ComponentLoaderTargetDirective } from './component-loader-target.directive';

@NgModule({
  declarations: [ComponentLoaderTargetDirective, ComponentLoaderOutletDirective],
  exports: [ComponentLoaderTargetDirective, ComponentLoaderOutletDirective],
  imports: [CommonModule],
})
export class ComponentLoaderModule {}
