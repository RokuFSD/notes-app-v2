import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import DashBoard from "./pages/dashboard/DashBoard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
