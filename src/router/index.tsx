import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '../pages/Home';

// Componente de Layout principal
const AppLayout = () => {
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: '/about',
      //   element: <About />,
      // },
      // {
      //   path: '/projects',
      //   element: <Projects />,
      // },
      // {
      //   path: '/skills',
      //   element: <Skills />,
      // },
      // {
      //   path: '/stack',
      //   element: <Stack />,
      // },
      // {
      //   path: '/contact',
      //   element: <Contact />,
      // }
    ]
  }
]);

export default router;