import { RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { routes } from './routes';
import React from 'react';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={routes} />
);
reportWebVitals();