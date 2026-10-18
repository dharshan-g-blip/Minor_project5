import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { showToast } from '../store/slices/toastSlice';
import { ShoppingBag, Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(showToast({ message: 'Please fill in all required fields.', type: 'error' }));
      return;
    }

    dispatch(login({ email, name: email.split('@')[0] }));
    dispatch(showToast({ message: 'Welcome back! Signed in successfully.', type: 'success' }));
    navigate('/');
  };

  const handleDemoLogin = () => {
    dispatch(login({ email: 'alex.morgan@luxestore.com', name: 'Alex Morgan' }));
    dispatch(showToast({ message: 'Signed in as Demo User: Alex Morgan', type: 'success' }));
    navigate('/products');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-950 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-950 dark:text-white">
            Welcome to LUXESTORE
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enter your email and password to access your account.
          </p>
        </div>

        {/* Demo Fast Login Callout */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="text-xs text-indigo-900 dark:text-indigo-200 font-medium">
              Want a quick preview?
            </span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
          >
            Demo Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Remember me</span>
            </label>
            <span className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
