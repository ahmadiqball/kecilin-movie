import { RouteObject, Navigate, createBrowserRouter } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    errorElement: (
      <Navigate
        replace
        to='/'
      />
    ),
  },
];

export const router = createBrowserRouter(routes);
