import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import SingleDocument from "./pages/SingleDocument";

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
        path: "/singleDoc",
        element: <SingleDocument />, //hard code this for now, will use form id later to display the document
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
