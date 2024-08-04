import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import SingleDocument from "./pages/SingleDocument";
import NotFound from "../app/errors/NotFound";
import ServerError from "../app/errors/ServerError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/documents/:id",
        element: <SingleDocument />,
      },
      {
        path: "/server-error",
        element: <ServerError />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
