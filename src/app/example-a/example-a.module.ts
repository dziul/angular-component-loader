import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExampleHomeComponent } from '../example-home/example-home.component';
import { ComponentLoaderModule } from '../shared/component-loader/component-loader.module';
import { MaterialModule } from '../shared/material/material.module';
import { ExampleAComponent } from './example-a.component';

@NgModule({
  declarations: [ExampleHomeComponent, ExampleAComponent],
  imports: [CommonModule, ComponentLoaderModule, MaterialModule],
})
export class ExampleAModule {}
