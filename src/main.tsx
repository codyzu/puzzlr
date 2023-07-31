// eslint-disable-line unicorn/filename-case
import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const Admin = lazy(async () => import('./Admin.tsx'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
  ],
  {basename: import.meta.env.BASE_URL},
);

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="w-screnn h-screen">
          <div className="i-tabler-loader-3 w-10 h-10 animate-spin" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);
