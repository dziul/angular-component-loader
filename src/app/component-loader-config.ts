import { LoadSelector } from './shared/component-loader/component-loader.model';

const componentLoaderConfig: LoadSelector[] = [
  {
    selector: 'app-example-a',
    component: () => import('./example-a/example-a.module').then((m) => m.ExampleAModule),
  },
  {
    selector: 'app-example-b',
    component: () => import('./example-b/example-b.component').then((m) => m.ExampleBComponent),
  },
  {
    selector: 'app-example-home',
    component: () =>
      import('./example-home/example-home.component').then((m) => m.ExampleHomeComponent),
  },
];

export default componentLoaderConfig;

/**
 * selector : string
 * load: () => Promise<Type<any>>   -> component ou module
 */
