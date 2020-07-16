import {
  Compiler,
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef,
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
    private componentFactoryResolver: ComponentFactoryResolver // private moduleFactory: NgModuleFactory<any>
  ) {}

  prepare(viewContainerRef: ViewContainerRef, componentLoader = this.component$) {
    return componentLoader.pipe(
      tap((e) => {
        console.log('loading started');
        this.loading$.next(true);
        viewContainerRef.clear(); // limpar viewContainerRef)
      }),
      mergeMap((load) => load),
      map((factory) => viewContainerRef.createComponent(factory)),
      tap(() => {
        console.log('loading ended');
        this.loading$.next(false);
      })
    );
  }

  load(selector: string) {
    const loader = this.collection.filter((component) => component.selector === selector);
    const loaderFirst = loader.shift(); // caso tenha duplicados, pega apenas o primeiro
    const nextLoad =
      loaderFirst?.component ||
      function notFound() {
        throw new Error(`Component Loader: Load ${selector} not found`);
      };
    const nextLoad$: Observable<any> = from(nextLoad()).pipe(
      map((load) => this.parseFactory(load, selector))
    );
    this.component$.next(nextLoad$);
  }

  private parseFactory(load: Type<any>, selector: string) {
    if (!load.hasOwnProperty('ngModuleDef')) {
      return this.componentFactoryResolver.resolveComponentFactory(load);
    }

    const module = this.compiler.compileModuleAndAllComponentsSync(load);
    return module.componentFactories.find((component) => {
      return component.selector === selector;
    });
  }

  attach(collection: LoadSelector[]) {
    this.collection = [...this.collection, ...collection];
  }

  loading() {
    return this.loading$;
  }
}
