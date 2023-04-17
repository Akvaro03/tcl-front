import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateOtPage from './pages/createOtPage';
import ProtectedRoute from './components/ProtectedRoute';
import OtAsingPages from './pages/otAsignados';
import OtPendingPages from './pages/otPending';
import { store } from './store/store';
import AllUser from './pages/allUsers';
import { Navigate } from "react-router-dom";
import CreateClients from './pages/createClients';

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
        <CreateOtPage />
      </ProtectedRoute>
  },
  {
    path: "/OtAsingPages",
    element:
      <ProtectedRoute>
        <OtAsingPages />
      </ProtectedRoute>
  },
  {
    path: "/OtPendingPages",
    element:
      <ProtectedRoute>
        <OtPendingPages />
      </ProtectedRoute>
  },
  {
    path: "/AllUser",
    element:
      <ProtectedRoute>
        <AllUser />
       </ProtectedRoute>
  },
  {
    path: "/createClient",
    element:
      <ProtectedRoute>
        <CreateClients />
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
