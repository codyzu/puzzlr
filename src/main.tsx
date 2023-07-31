// eslint-disable-line unicorn/filename-case
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
  ],
  {basename: import.meta.env.BASE_URL},
);

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
