import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Logo from "./Logo";

const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between h-14 px-4 w-ful mt-2">
      <div className="flex items-center">
        <Link to="/" className="flex items-center text-white no-underline">
          <Logo className="h-8 w-8" />
          <p className="ml-2 text-lg font-semibold text-white">Mail Master</p>
        </Link>
      </div>
      <div className="flex items-center mr-8">
        <SignedOut>
          <div className="inline-flex items-center">
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
