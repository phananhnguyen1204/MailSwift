import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "../ui/toaster";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Footer from "../components/Footer";

// Define the component type using React.FC (Functional Component)
const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster />
      <ToastContainer position="top-center" autoClose={2000} />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
