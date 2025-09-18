import React, { useContext } from 'react';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Heart, Shield, Users, Award } from 'lucide-react';
import SocialLogin from '../SocialLogin/SocialLogin';
import { AuthContext } from '../../../contexts/AuthContext';
import { Link} from 'react-router';
import navLogo from '../../../assets/WebLogo.png';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn} = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data submitted:", formData);
      signIn(formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          setErrors({ general: "Failed to sign in. Please try again." });
        });
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    { icon: Heart, text: "Trusted by 50K+ patients" },
    { icon: Shield, text: "100% secure & encrypted" },
    { icon: Users, text: "24/7 customer support" },
    { icon: Award, text: "Licensed pharmacies only" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='4'/%3E%3Ccircle cx='53' cy='7' r='4'/%3E%3Ccircle cx='7' cy='53' r='4'/%3E%3Ccircle cx='53' cy='53' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Section - Form */}
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              {/* Logo and Brand */}
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-xl mr-3">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                 <img className='w-50' src={navLogo} alt="" />
                </span>
              </div>

              {/* Welcome Section */}
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  Welcome back
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Access your healthcare dashboard and manage your prescriptions from verified pharmacies nationwide
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl text-gray-900 placeholder-gray-500 bg-gray-50/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white ${
                        errors.email ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <span className="mr-1">⚠</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full pl-12 pr-12 py-4 border rounded-xl text-gray-900 placeholder-gray-500 bg-gray-50/50 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white ${
                        errors.password ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <span className="mr-1">⚠</span>
                      {errors.password}
                    </p>
                  )}
                  <div className="text-right">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Login Button */}
                <button 
                  onClick={onSubmit}
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn btn-primary text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform  disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign in to your account'
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link to={'/auth/register'} className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Create one here
                  </Link>
                </p>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <SocialLogin />
              </div>
            </div>

            {/* Right Section - Visual */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 relative overflow-hidden hidden lg:flex flex-col justify-center p-16">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0l100 100M100 0L0 100' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
                }}/>
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold mb-4 leading-tight">
                    Your Health, Our Priority
                  </h2>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Connect with licensed pharmacies, manage prescriptions, and get expert health advice all in one place.
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-lg text-blue-100">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Login;