import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/paperplane.json";
import NewEmail from "../components/NewEmail";
import RecentEmail from "../components/RecentEmail";

const Dashboard: React.FC = () => {
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

  {
    /* if the user signs in, navigate to the dashboard
    otherwise back to landing page */
  }
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);
  return (
    <div className="flex justify-between items-center min-h-screen">
      <div className="flex flex-col space-y-6 p-3 mb-auto">
        <NewEmail />
        <RecentEmail />
      </div>
      <div className="p-5">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    </div>
  );
};
export default Dashboard;
