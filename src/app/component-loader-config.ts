import { LoadTarget } from './shared/component-loader/component-loader.model';

const componentLoaderConfig: LoadTarget[] = [
  {
    target: 'app-example-a',
    component: () => import('./example-a/example-a.module').then((m) => m.ExampleAModule),
  },
  {
    target: 'app-example-b',
    component: () => import('./example-b/example-b.component').then((m) => m.ExampleBComponent),
  },
  {
    target: 'app-example-home',
    component: () =>
      import('./example-home/example-home.component').then((m) => m.ExampleHomeComponent),
  },
];

export default componentLoaderConfig;

/**
 * selector : string
 * load: () => Promise<Type<any>>   -> component ou module
 */
