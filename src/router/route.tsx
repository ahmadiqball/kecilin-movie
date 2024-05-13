import { RouteObject, Navigate, createBrowserRouter } from 'react-router-dom';
import { PageHome } from '~~/app/home/page-home';
import { BaseLayout } from '~~/app/layout/base-layout';
import { PageMovieList } from '~~/app/movie-list/page-movie-list';

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
        element: <PageMovieList type='movies' />,
        path: '/movies',
      },
      {
        element: <PageMovieList type='tv shows' />,
        path: '/tv-shows',
      },
      {
        element: <PageMovieList type='bookmarks' />,
        path: '/bookmarks',
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
