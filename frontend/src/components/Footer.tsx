import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col gap-2 p-6 items-center border-t border-gray-300 fixed bottom-0 sm:flex-row">
      <p className="text-sm text-white">
        &copy; 2024 AI Product. All rights reserved.
      </p>
      <div className="ml-auto flex gap-4">
        <Link
          to="#"
          className="text-sm text-white no-underline hover:underline hover:underline-offset-1"
        >
          Terms of Service
        </Link>
        <Link
          to="#"
          className="text-sm text-white no-underline hover:underline hover:underline-offset-1"
        >
          Privacy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
