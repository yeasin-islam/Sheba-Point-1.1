import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";


const Login = () => {
  const { loginUser, googleLogin, refetchUserData } = useAuth();
  const axiosInstance = useAxios();
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const result = await loginUser(email, password);
      if (result.user) {
        toast.success("User logged in successfully");
        navigate(location?.state || "/");
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      if (res?.user) {
        const createdDate = new Date(res?.user?.metadata?.creationTime);
        const lastLoginDate = new Date(res?.user?.metadata?.lastSignInTime);
        const createdAt = new Date(
          createdDate.getTime() - lastLoginDate.getTimezoneOffset() * 60000
        ).toISOString();
        const lastLogin = new Date(
          lastLoginDate.getTime() - lastLoginDate.getTimezoneOffset() * 60000
        ).toISOString();

        const profileInfo = {
          name: res.user.displayName,
          email: res.user.email,
          profileImage: res.user.photoURL,
          role: "patient",
          isVerified: false,
          createdAt,
          lastLogin,
          uid: res.user.uid,
        };
        await axiosInstance.post("/register", profileInfo);
        await refetchUserData();
        toast.success("Logged in with Google");
        navigate(location?.state || "/");
      }
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#209187] mb-6">
        Login to Sheba Point
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-semibold">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F85606]"
            defaultValue={"user@11.com"}
            required
          />
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-semibold"
          >
            Password
          </label>
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F85606]"
            defaultValue={"123456Aa@"}
            required
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 bottom-3 cursor-pointer text-gray-500"
          >
            {showPass ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#209187] text-white font-semibold py-3 rounded-lg hover:bg-[#1b6f6f] transition cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="my-6 flex items-center justify-between">
        <hr className="flex-1 border-gray-300" />
        <span className="px-3 text-gray-400 text-sm">Or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg transition cursor-pointer"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link
          state={location.state}
          to="/auth/register"
          className="text-[#209187] font-semibold"
        >
          Register
        </Link>
      </p>

      <Link
        to="/"
        className="absolute top-4 right-4 text-gray-400 hover:text-[#209187] text-4xl font-bold"
        aria-label="Go Home"
      >
        &times;
      </Link>
    </div>
  );
};

export default Login;
