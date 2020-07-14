import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentLoaderService } from './shared/component-loader/component-loader.service';

import { Observable } from 'rxjs';
import componentLoaderConfig from './component-loader-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;

  constructor(private componentLoader: ComponentLoaderService) {}
  ngOnInit() {
    this.componentLoader.attach(componentLoaderConfig);
    this.loading$ = this.componentLoader.loading();
  }
  ngOnDestroy() {}
}
