import { RouteObject, Navigate, createBrowserRouter } from 'react-router-dom';
import { PageHome } from '~~/app/home/page-home';
import { BaseLayout } from '~~/app/layout/base-layout';
import { PageMovieAndShow } from '~~/app/movies-show/page-movies-show';

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
    Component: BaseLayout,
    children: [
      {
        Component: PageHome,
        index: true,
      },
      {
        element: <PageMovieAndShow type='movies' />,
        path: '/movies',
      },
      {
        element: <PageMovieAndShow type='tv shows' />,
        path: '/tv-shows',
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
