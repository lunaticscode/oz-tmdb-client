import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
const MainPage = lazy(() => import("./pages/MainPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      { path: "/signin", element: <SigninPage /> },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<h2>Page Loading....</h2>}>
    <RouterProvider router={router} />
  </Suspense>
);
