import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard";

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("../components/Layout/WithNav"),
    children: [
      {
        index: true,
        element: (
          <DashBoard />
        )
      },
      {
        path: "/projects",
        async lazy() {
          const { Projects } = await import("./pages/projects/Projects");
          return { Component: Projects };
        }
      },
      {
        path: "/projects/:projectId",
        async lazy() {
          const { Project, loader } = await import("./pages/project/Project");
          return { Component: Project, loader };
        }
      }
    ]
  },
  {
    lazy: () => import("../components/Layout/Base"),
    children: [
      {
        path: "/notes/new",
        async lazy() {
          const { Newnote, action, loader } = await import("./pages/new-note/Newnote");
          return { Component: Newnote, action, loader };
        }
      },
      {
        path: "/projects/new",
        async lazy() {
          const { Newproject, action } = await import(
            "./pages/new-project/Newproject"
            );
          return { Component: Newproject, action };
        }
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
