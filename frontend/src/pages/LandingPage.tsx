import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/email-animation.json";
import { useAuth } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

const LandingPage: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  }, [userId, navigate]);

  return (
    <div className="flex flex-col min-h-screen p-4 w-full py-12 items-center">
      <div className="grid grid-cols-1 gap-x-10 justify-center items-center text-center md:grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_550px]">
        <div className="flex flex-col justify-center gap-2 max-w-1/2 mr-10">
          <div className="gap-2">
            <h1 className="text-xl font-semibold leading-tight sm:text-4xl xl:text-5xl text-blue-300">
              Unlock the Power of <br />
            </h1>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-4xl xl:text-6xl ">
              Mail Master ✉️
            </h1>
            <p className="max-w-3xl mx-auto text-gray-400 text-base sm:text-lg p-3 mt-3">
              Our AI-powered email platform helps you automate tasks, gain
              insights, and drive innovation. Just a click and you can do so
              much more to improve your email productivity!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <SignInButton mode="modal">
              <button className="px-8 py-3 rounded-xl bg-blue-500 text-white text-sm font-medium shadow-sm hover:bg-blue-600">
                Get Started
              </button>
            </SignInButton>
            <Link
              to="#"
              className="px-8 py-3 rounded-xl text-sm font-medium bg-white border border-gray-300 hover:border-blue-500 text-black shadow-sm hover:bg-gray-100"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex justify-center max-w-1/2 items-center">
          <Lottie options={defaultOptions} height={600} width={600} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
