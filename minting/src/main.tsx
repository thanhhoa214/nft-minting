import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/404Page.tsx";
import MintPage from "./pages/MintPage.tsx";
import AllNftPage from "./pages/AllNftPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "mint",
        element: <MintPage />,
      },
      {
        path: "nfts",
        element: <AllNftPage />,
      },
      {
        path: "nfts/:address",
        element: <AllNftPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
