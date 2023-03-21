import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import DashBoard, { loader } from "./pages/dashboard/DashBoard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: loader,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
