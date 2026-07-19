import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert, Loader2 } from 'lucide-react';
import { recordPageView } from '../utils/analytics';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    recordPageView('/seva-trust/admin/login');
    // If token exists, direct redirect to dashboard
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold-500 to-amber-600"></div>

        {/* Title */}
        <div className="text-center mb-8 mt-2">
          <div className="mx-auto w-12 h-12 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-brand-gold-500 mb-4 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-tight">
            NGO Control Center
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1.5 uppercase tracking-wider">
            Krishna Govind Seva Sansthan
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Username */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Admin Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <User className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Secret Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 bg-red-950/40 text-red-400 px-4 py-3 rounded-xl border border-red-900/30 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-slate-950 font-bold bg-gradient-to-r from-brand-gold-400 to-amber-500 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg hover:shadow-brand-gold-500/10 duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Unlock Admin Panel</span>
            )}
          </button>

        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
            ← Return to public website
          </a>
        </div>

      </div>
    </div>
  );
}
