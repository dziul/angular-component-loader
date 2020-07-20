import {
  Compiler,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
  ɵcreateInjector as createInjector,
} from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { LoadSelector } from './component-loader.model';

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {
  private collection: LoadSelector[] = [];
  private component$ = new Subject<Observable<any>>();
  private loading$ = new Subject<boolean>();

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver // private moduleFactory: NgModuleFactory<any>
  ) {}

  prepare(viewContainerRef: ViewContainerRef, componentLoader = this.component$) {
    return componentLoader.pipe(
      tap(() => {
        this.loading$.next(true);
        viewContainerRef.clear(); // limpar viewContainerRef)
      }),
      mergeMap((load) => load),
      map((factory) => {
        return viewContainerRef.createComponent(factory);
      }),
      tap(() => {
        this.loading$.next(false);
      })
    );
  }

  notFoundSelector(selector: string) {
    throw new Error(`Component Loader: Load ${selector} not found`);
  }

  load(selector: string) {
    const loader = this.collection.filter((component) => component.selector === selector).shift();

    const next$ = this.resolver(loader);

    this.component$.next(next$);
  }

  private resolver(loader: LoadSelector) {
    const hasModule = loader.hasOwnProperty('module');

    if (hasModule) {
      return from(loader.module()).pipe(
        map((load: Type<any>) => {
          const injector = createInjector(load, this.injector);
          const module = injector.get(load);
          return this.resolverComponent(loader);
        }),
        mergeMap((load) => load)
      );
    } else {
      return this.resolverComponent(loader);
    }
  }

  private resolverComponent(loader: LoadSelector) {
    return from(loader.component()).pipe(
      map((load) => {
        return this.componentFactoryResolver.resolveComponentFactory(load);
      })
    );
  }

  attach(collection: LoadSelector[]) {
    this.collection = [...this.collection, ...collection];
  }

  loading() {
    return this.loading$;
  }
}
