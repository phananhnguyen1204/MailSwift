import Lottie from "react-lottie";
import animationData from "../../src/lotties/server-error.json";
import { Button } from "../../src/ui/button";
import { Link, useLocation } from "react-router-dom";

const ServerError = () => {
  const { state } = useLocation();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-5 items-center justify-center text-center">
      {state?.error ? (
        <div>
          <h3 className="text-3xl font-extrabold">{state.error.title}</h3>
          <p>{state.error.details || "Internal server error"}</p>
        </div>
      ) : (
        <h3 className="text-3xl font-extrabold">Server Error ❌</h3>
      )}
      <Lottie options={defaultOptions} height={550} width={550} />
      <Link to="/dashboard">
        <Button className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 shadow-md">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
export default ServerError;
