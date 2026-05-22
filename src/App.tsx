/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Prestamos } from './components/Prestamos';
import { ComoFunciona } from './components/ComoFunciona';
import { Requisitos } from './components/Requisitos';
import { Solicitar } from './components/Solicitar';
import { Testimonios } from './components/Testimonios';
import { Contacto } from './components/Contacto';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/prestamos", element: <Prestamos /> },
  { path: "/como-funciona", element: <ComoFunciona /> },
  { path: "/requisitos", element: <Requisitos /> },
  { path: "/solicitar", element: <Solicitar /> },
  { path: "/testimonios", element: <Testimonios /> },
  { path: "/contacto", element: <Contacto /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
