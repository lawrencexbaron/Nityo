import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import CreateUser from "./pages/CreateUser.tsx";
import Users from "./pages/Users.tsx";
import EditUser from "./pages/EditUser.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateUser />,
  },
  {
    path: "/create-user",
    element: <CreateUser />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/edit-user/:id",
    element: <EditUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
