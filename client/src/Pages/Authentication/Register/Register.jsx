import React, { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock, Heart, Shield, Users, Award } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";




const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);
  const axios= useAxios();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log(data);

    createUser(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // send data user data to db
        const userData = {
          email: user.email,
          name: data.name,
          role: "user",
          lastLogin: user.metadata.lastSignInTime,
          creationTime: user.metadata.creationTime,
        };
        axios.post("/users", userData)
          .then((response) => {
            console.log("User data saved:", response.data);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
        navigate("/");
        console.log("User registered:", user);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 px-4">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-pink-100">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-2">
            <Heart className="text-pink-500" size={28} />
            <Shield className="text-purple-500" size={28} />
            <Users className="text-blue-500" size={28} />
            <Award className="text-yellow-500" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500">Join us and start your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg btn btn-primary text-white font-medium hover:opacity-90 transition"
          >
            Register
          </button>
           <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to={'/auth/login'} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Log in
                  </Link>
                </p>
        </form>

        {/* Social Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
