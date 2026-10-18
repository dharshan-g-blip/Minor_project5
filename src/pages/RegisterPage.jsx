import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { showToast } from '../store/slices/toastSlice';
import { ShoppingBag, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      dispatch(showToast({ message: 'Please fill in all fields.', type: 'error' }));
      return;
    }
    if (!agreeTerms) {
      dispatch(showToast({ message: 'Please accept the Terms of Service.', type: 'error' }));
      return;
    }

    dispatch(register({ name, email }));
    dispatch(showToast({ message: `Account created! Welcome to LUXESTORE, ${name}.`, type: 'success' }));
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
            Create an Account
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Join LUXESTORE for exclusive deals, fast checkout, and saved preferences.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Jordan Lee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

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
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="text-gray-600 dark:text-gray-400 cursor-pointer">
              I agree to the <span className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</span> and{' '}
              <span className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
}
