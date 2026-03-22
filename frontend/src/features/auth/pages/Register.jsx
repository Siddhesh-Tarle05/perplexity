import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
const Register = () => {
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
      await handleRegister(formData)
      navigate('/')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#314755]/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#26a0da]/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md p-8 relative z-10">
        {/* Glassmorphism Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">Join us and start your journey</p>
          </div>

          {/* <div className="flex bg-white/5 rounded-xl p-1 mb-8 border border-white/10">
            <Link to="/login" className="flex-1 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors text-center rounded-lg flex items-center justify-center">
              Sign In
            </Link>
            <button type="button" className="flex-1 py-2 text-sm font-semibold rounded-lg bg-white/10 text-white shadow-sm ring-1 ring-white/10">
              Sign Up
            </button>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#26a0da]/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#26a0da]/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#26a0da]/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[linear-gradient(to_right,#314755_0%,#26a0da_51%,#314755_100%)] bg-[length:200%_auto] hover:bg-right text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-[#26a0da]/20 hover:shadow-[#26a0da]/40 transition-all duration-500 transform hover:-translate-y-0.5 mt-6"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#26a0da] hover:text-[#1e86b8] font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
