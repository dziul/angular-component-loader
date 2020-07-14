import { LoadTarget } from './shared/component-loader/component-loader.model';

const componentLoaderConfig: LoadTarget[] = [
  {
    target: 'example-a',
    component: () => import('./example-a/example-a.component').then((m) => m.ExampleAComponent),
  },
  {
    target: 'example-b',
    component: () => import('./example-b/example-b.component').then((m) => m.ExampleBComponent),
  },
  {
    target: 'example-home',
    component: () =>
      import('./example-home/example-home.component').then((m) => m.ExampleHomeComponent),
  },
];

export default componentLoaderConfig;
