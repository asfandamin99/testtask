import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SimpleLayout from './layouts/simple';
//

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';

import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Cars from './pages/Cars';
import Categories from './pages/Categories';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
       
        { path: 'cat', element: <Categories /> },
        { path: 'vehicles', element: <Cars /> },
        
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
