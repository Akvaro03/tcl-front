import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/login';
import {
  Await,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute';
import { store } from './store/store';
import { Navigate } from "react-router-dom";
import LoadingCircle from './pages/Loading';
import StatisticsPage from './pages/statisticsPage';

const OtAsingPages = React.lazy(() => import('./pages/otAsignados')); // Lazy-loaded
const OtPendingPages = React.lazy(() => import('./pages/otPending')); // Lazy-loaded
const AllUser = React.lazy(() => import('./pages/allUsers')); // Lazy-loaded
const CreateClients = React.lazy(() => import('./pages/createClients')); // Lazy-loaded
const CreateOtPage = React.lazy(() => import('./pages/createOtPage')); // Lazy-loaded
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Navigate to="/login" replace={true} />,
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/createOt",
    element:
      <ProtectedRoute>
        <Suspense fallback={<LoadingCircle />}>
          <Await resolve={CreateOtPage}>
            <CreateOtPage />
          </Await>
        </Suspense>
      </ProtectedRoute>
  },
  {
    path: "/OtAsingPages",
    element:
      <ProtectedRoute>
        <Suspense fallback={<LoadingCircle />}>
          <Await resolve={OtAsingPages}>
            <OtAsingPages />
          </Await>
        </Suspense>
      </ProtectedRoute>
  },
  {
    path: "/OtPendingPages",
    element:
      <ProtectedRoute>
        <Suspense fallback={<LoadingCircle />}>
          <Await resolve={OtPendingPages}>
            <OtPendingPages />
          </Await>
        </Suspense>
      </ProtectedRoute>
  },
  {
    path: "/AllUser",
    element:
      <ProtectedRoute>
        <Suspense fallback={<LoadingCircle />}>
          <Await resolve={AllUser}>
            <AllUser />
          </Await>
        </Suspense>
      </ProtectedRoute>
  },
  {
    path: "/createClient",
    element:
      <ProtectedRoute>
        <Suspense fallback={<LoadingCircle />}>
          <Await resolve={CreateClients}>
            <CreateClients />
          </Await>
        </Suspense>
      </ProtectedRoute>
  },
  {
    path: "/estadisticas",
    element:
      <ProtectedRoute>
        <Suspense fallback={<LoadingCircle />}>
          <Await resolve={CreateClients}>
            <StatisticsPage />
          </Await>
        </Suspense>
      </ProtectedRoute>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
