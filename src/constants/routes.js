import { lazy } from 'react';

export const routes_declare = [
  {
    path: '/app',
    component: lazy(() => import('../pages/private/MainApp')),
    layout: '/private',
  },
];
