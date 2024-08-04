import Lottie from "react-lottie";
import animationData from "../../src/lotties/not-found.json";
import { Button } from "../../src/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-3 items-center justify-center text-center">
      <h3 className="mt-5 text-3xl font-extrabold">
        Oops we can't find what you are looking for ❌
      </h3>
      <Lottie options={defaultOptions} height={550} width={550} />
      <Link to="/dashboard">
        <Button className="px-4 rounded-xl bg-blue-500 text-white hover:bg-blue-600 shadow-md">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
export default NotFound;
