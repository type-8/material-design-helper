import { Navigate, RouteDataFunc, RouteProps } from 'solid-app-router';
import { Component, JSX, lazy } from 'solid-js';
import ColorTools from './views/ColorTools';


export type Route = {
  path: string;
  children?: Route[];
  data?: RouteDataFunc;
} & ({
  element?: never;
  component: Component;
} | {
  component?: never;
  element?: JSX.Element;
  preload?: () => void;
});


const defaultRedirectComponent = () => <Navigate href="/color-tools/palette" />;


export const routes: Route[] = [
  {
    path: '/color-tools',
    component: ColorTools,
    children: [
      {
        path: '/palette',
        component: lazy(() => import('./views/ColorTools/views/Palette'))
      },
      {
        path: '/approximate',
        component: lazy(() => import('./views/ColorTools/views/Approximate'))
      },
      {
        path: '/',
        component: defaultRedirectComponent
      }
    ]
  },
  // {
  //   path: '/functions',
  //   component: lazy(() => import('./views/Functions')),
  // },

  {
    path: '/',
    component: defaultRedirectComponent
  }

  // {
  //   path: "/*all",
  //   component: lazy(() => import("/pages/[...all].js"))
  // }
];

