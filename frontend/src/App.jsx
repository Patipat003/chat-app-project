import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div
      className="bg-[url('https://images.hdqwalls.com/wallpapers/raiden-shogun-genshin-impact-e7.jpg')] 
      bg-cover bg-center bg-no-repeat min-h-screen bg-black"
    >
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
export default App;
