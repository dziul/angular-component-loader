import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { LoadTarget } from './component-loader.model';

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {
  private collection: LoadTarget[] = [];
  private component$ = new Subject<Observable<any>>();
  private loading$ = new Subject<boolean>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  prepare(viewContainerRef: ViewContainerRef, componentLoader = this.component$) {
    return componentLoader.pipe(
      tap(() => {
        this.loading$.next(true);
        viewContainerRef.clear(); // limpar viewContainerRef)
      }),
      mergeMap((component) => component),
      map((component) => this.componentFactoryResolver.resolveComponentFactory(component)),
      map((componentFactory) => viewContainerRef.createComponent(componentFactory)),
      tap(() => this.loading$.next(false))
    );
  }

  load(target: string) {
    const loader = this.collection.filter((component) => component.target === target);
    const loaderFirst = loader.shift(); // caso tenha duplicados, pega apenas o primeiro
    const nextLoad =
      loaderFirst?.component ||
      function notFound() {
        throw new Error(`Component Loader: Load ${target} not found`);
      };
    this.component$.next(from(nextLoad()));
  }

  attach(collection: LoadTarget[]) {
    this.collection = [...this.collection, ...collection];
  }

  loading() {
    return this.loading$;
  }
}
