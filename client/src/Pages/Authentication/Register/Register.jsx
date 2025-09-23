import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";


const Register = () => {
  const { createAccount, googleLogin, refetchUserData } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      const result = await createAccount(data.email, data.password);
      if (result?.user) {
        toast.success("Account created successfully");
        navigate(location?.state || "/");
        const profileInfo = {
          name: data.name,
          email: data.email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isVerified: false,
          role: "patient",
          uid: result.user.uid,
        };
        await axiosInstance.post("/user/register", profileInfo);
        await refetchUserData();
      }
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
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
        await axiosInstance.post("/user/register", profileInfo);
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
        Register to Sheba Point
      </h2>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        {/* name */}
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#209187]"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#209187]"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-semibold"
          >
            Password
          </label>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#209187]"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                message:
                  "Password must be at least 6 characters, include one uppercase, one lowercase, and one special character",
              },
            })}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-10 cursor-pointer text-gray-500"
          >
            {showPass ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#209187] text-white font-semibold py-3 rounded-lg hover:bg-[#1b6f6f] transition cursor-pointer"
        >
          Register
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
        Already have an account?{" "}
        <Link
          state={location.state}
          to="/auth/login"
          className="text-[#209187] font-semibold"
        >
          Login
        </Link>
      </p>

      <Link
        to="/"
        className="absolute top-4 right-4 text-gray-400 hover:text-primary text-4xl font-bold"
        aria-label="Go Home"
      >
        &times;
      </Link>
    </div>
  );
};

export default Register;
