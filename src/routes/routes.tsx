import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "../components/Layout/Root";
import DashBoard from "./pages/dashboard/DashBoard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root withNav />,
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
    element: <Root/>,
    children: [
      {
        path: "/notes/new",
        async lazy() {
          const { Newnote, action, loader } = await import("./pages/new-note/Newnote");
          return { Component: Newnote, action, loader };
        }
      },
      {
        path: "/notes/:noteId",
        async lazy() {
          const { Note, action } = await import("./pages/note/Note");
          return { Component: Note, action };
        }
      },
      {
        path: "/notes/:noteId/destroy",
        async lazy() {
          const { action } = await import("./pages/note/destroy/destroy");
          return { action };
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
