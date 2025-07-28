import { useContext, useState } from "react";
import assets from "../assets/assets";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";
import { IoIosArrowBack } from "react-icons/io";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currentState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col">
      {/* --------------- Left --------------- */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
      {/* --------------- Right --------------- */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 text-white border-violet-600 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <span
              onClick={() => setIsDataSubmitted(false)}
              className="text-sm text-violet-500 cursor-pointer"
            >
              <IoIosArrowBack className="w-5 h-5 inline-block" />
            </span>
          )}
        </h2>
        {currentState === "Sign up" && !isDataSubmitted && (
          <>
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              className="p-2 border border-violet-600 rounded-md focus:outline-none"
              placeholder="Full Name"
              required
            />
          </>
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="p-2 border border-violet-600 rounded-md focus:outline-none"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="p-2 border border-violet-600 rounded-md focus:outline-none"
              placeholder="Password"
              required
            />
          </>
        )}

        {currentState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-violet-600 rounded-md focus:outline-none focus-ring-2 focus:ring-violet-600"
            placeholder="provide a short bio..."
            required
          ></textarea>
        )}

        <button
          onClick={() => setIsLoading(true)}
          className="flex items-center justify-center gap-2 py-3 bg-violet-600 hover:scale-95 transition-all duration-300 text-white rounded-md cursor-pointer"
        >
          <ClipLoader loading={isloading} size={16} color="#ffffff" />
          {currentState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input type="checkbox" required />
          <span>Agree to the terms of use & privacy policy.</span>
        </label>

        <div className="flex flex-col gap-2">
          {currentState === "Sign up" ? (
            <p className="text-sm text-gray-400">
              Already have an account?
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 ml-1 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Create an account
              <span
                onClick={() => {
                  setCurrentState("Sign up");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 ml-1 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
