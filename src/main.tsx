// eslint-disable-line unicorn/filename-case
import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Reset from './Reset.tsx';
import ErrorPage from './ErrorPage.tsx';

const Admin = lazy(async () => import('./Admin.tsx'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/secret-admin',
      element: <Admin />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/secret-reset',
      element: <Reset />,
      errorElement: <ErrorPage />,
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />,
    },
  ],
  {basename: import.meta.env.BASE_URL},
);

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="w-screen h-[100dvh] items-center justify-center">
          <div className="i-tabler-loader-3 w-10 h-10 animate-spin" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);
