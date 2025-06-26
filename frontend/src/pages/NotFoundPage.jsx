import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen space-y-4 backdrop-blur-2xl 
        overflow-hidden relative"
    >
      <div className="text-7xl font-bold text-gray-400">404</div>
      <div className="sm:text-2xl text-gray-200 text-xl">
        <p>Sorry, we couldn't find this page.</p>
      </div>
      <div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition-colors hover:scale-102 cursor-pointer"
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};
export default NotFoundPage;
