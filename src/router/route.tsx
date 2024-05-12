import { RouteObject, Navigate, createBrowserRouter } from 'react-router-dom';
import { PageHome } from '~~/app/home/page-home';

const routes: RouteObject[] = [
  {
    errorElement: (
      <Navigate
        replace
        to='/'
      />
    ),
  },
  {
    Component: PageHome,
    path: '/',
  },
];

export const router = createBrowserRouter(routes);
