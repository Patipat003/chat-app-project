import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen space-y-4 
        overflow-hidden relative"
    >
      <div className="text-7xl font-bold text-gray-400">404</div>
      <div className="sm:text-2xl text-gray-200 text-xl">
        <p>Sorry, we couldn't find this page.</p>
      </div>
      <div>
        <button
          onClick={() => navigate("/")}
          className="mt-2 bg-gradient-to-r from-purple-400 to-violet-600
            text-white p-3 px-12 rounded-full text-lg hover:scale-102 cursor-pointer"
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};
export default NotFoundPage;
