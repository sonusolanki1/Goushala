import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert, Loader2, Key } from 'lucide-react';
import { recordPageView } from '../utils/analytics';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    recordPageView('/seva-trust/admin/login');
    if (localStorage.getItem('adminToken')) {
      navigate('/seva-trust/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/seva-trust/admin/dashboard');
      } else {
        throw new Error('Authentication token not received.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background visual details */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-brand-gold-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-brand-gold-500/5 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-stone-200/80 rounded-3xl p-8 shadow-xl relative z-10"
      >
        {/* Saffron accent bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-stone-50 border border-stone-150 rounded-2xl flex items-center justify-center text-brand-gold-500 mb-4 shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-zinc-950">
            NGO Control Center
          </h1>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
            Goushala Management Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Username */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">
              Admin Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <User className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 transition-colors font-sans"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">
              Secret Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 transition-colors font-sans"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 bg-red-50 text-red-750 px-4 py-3 rounded-xl border border-red-100 text-xs">
              <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-white font-bold bg-zinc-950 hover:bg-brand-gold-600 shadow-md hover:shadow transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2 text-xs"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Unlock Admin Panel</span>
            )}
          </button>

        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs text-zinc-400 hover:text-zinc-650 transition-colors font-mono">
            ← Return to public website
          </a>
        </div>

      </motion.div>
    </div>
  );
}
