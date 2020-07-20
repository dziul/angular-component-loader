import { LoadSelector } from './shared/component-loader/component-loader.model';

const componentLoaderConfig: LoadSelector[] = [
  {
    selector: 'app-example-a',
    component: () => import('./example-a/example-a.component').then((m) => m.ExampleAComponent),
    module: () => import('./example-a/example-a.module').then((m) => m.ExampleAModule),
  },
  {
    selector: 'app-example-b',
    component: () => import('./example-b/example-b.component').then((m) => m.ExampleBComponent),
  },
  {
    selector: 'app-example-home',
    component: () => import('./example-c/example-c.component').then((m) => m.ExampleCComponent),
  },
];

export default componentLoaderConfig;

/**
 * selector : string
 * load: () => Promise<Type<any>>   -> component ou module
 */
