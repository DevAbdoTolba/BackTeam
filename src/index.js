import React from "react";
import ReactDOM from "react-dom";
import Main from "./Pages/Main/App";
import Data from "./Pages/Data/App";
import Dashboard from "./Pages/Dashboard/App";
import Events from "./Pages/Events/App";
import { AdminContextProvider } from "./context/Admin";
import { LogStateContextProvider } from "./context/LogState";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Events",
    element: <Events />,
  },
]);

ReactDOM.render(
  <LogStateContextProvider>
    <AdminContextProvider>
      <RouterProvider router={router} />
    </AdminContextProvider>
  </LogStateContextProvider>,

  document.getElementById("root")
);
