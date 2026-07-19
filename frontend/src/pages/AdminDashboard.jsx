import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Eye, Heart, LogOut, RefreshCw, 
  Search, ShieldAlert, FileSpreadsheet, EyeIcon, Calendar,
  Video, Play, Trash, PlusCircle, FileText, CheckCircle2,
  Upload, Loader2
} from 'lucide-react';
import { recordPageView } from '../utils/analytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [donations, setDonations] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [updates, setUpdates] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Daily Updates Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState('video');
  const [isUpdateSubmitting, setIsUpdateSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState('');

  // Media file upload states
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/seva-trust/admin/login');
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError('');
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/seva-trust/admin/login');
      return;
    }

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // 1. Fetch Stats
      const statsRes = await fetch(`${apiBaseUrl}/api/admin/dashboard-stats`, { headers });
      if (statsRes.status === 401 || statsRes.status === 403) {
        handleLogout();
        return;
      }
      const statsData = await statsRes.json();

      // 2. Fetch Donations
      const donationsRes = await fetch(`${apiBaseUrl}/api/admin/donations`, { headers });
      const donationsData = await donationsRes.json();

      // 3. Fetch Visitors
      const visitorsRes = await fetch(`${apiBaseUrl}/api/admin/visitors`, { headers });
      const visitorsData = await visitorsRes.json();

      // 4. Fetch Updates
      const updatesRes = await fetch(`${apiBaseUrl}/api/updates`);
      const updatesData = await updatesRes.json();

      if (statsRes.ok && donationsRes.ok && visitorsRes.ok && updatesRes.ok) {
        setStats(statsData);
        setDonations(donationsData);
        setVisitors(visitorsData);
        setUpdates(updatesData);
      } else {
        throw new Error('Failed to retrieve dashboard details');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Error fetching admin records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    recordPageView('/seva-trust/admin/dashboard');
    fetchDashboardData();
  }, [navigate]);

  // Handle local file uploads (Multer)
  const handleLocalFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setIsFileUploading(true);
    setUploadProgressMsg('Uploading media file to server...');

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/seva-trust/admin/login');
      return;
    }

    const formData = new FormData();
    formData.append('mediaFile', file);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/updates/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload media file');
      }

      // Auto pre-fill Media URL field with backend uploaded file path
      setNewMediaUrl(data.fileUrl);

      // Auto-detect media category
      const fileExt = file.name.split('.').pop().toLowerCase();
      const videoExtensions = ['mp4', 'webm', 'mov', 'ogg'];
      if (videoExtensions.includes(fileExt)) {
        setNewMediaType('video');
      } else {
        setNewMediaType('image');
      }

      setUploadProgressMsg('Upload complete! URL populated below.');
      setTimeout(() => setUploadProgressMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error uploading file.');
    } finally {
      setIsFileUploading(false);
    }
  };

  // Create new Goushala vlog/blog update
  const handleCreateUpdate = async (e) => {
    e.preventDefault();
    setUpdateSuccess('');
    setError('');

    if (!newTitle.trim() || !newDesc.trim()) {
      setError('Title and description are required.');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/seva-trust/admin/login');
      return;
    }

    setIsUpdateSubmitting(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/updates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          media_url: newMediaUrl,
          media_type: newMediaType
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateSuccess('Goushala daily update posted successfully!');
        setNewTitle('');
        setNewDesc('');
        setNewMediaUrl('');
        setNewMediaType('video');
        
        // Refresh updates list
        const updatesRes = await fetch(`${apiBaseUrl}/api/updates`);
        const updatesData = await updatesRes.json();
        setUpdates(updatesData);

        setTimeout(() => setUpdateSuccess(''), 4000);
      } else {
        throw new Error(data.error || 'Failed to post update');
      }
    } catch (err) {
      setError(err.message || 'Could not post update.');
    } finally {
      setIsUpdateSubmitting(false);
    }
  };

  // Delete Goushala update
  const handleDeleteUpdate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this daily update?')) return;
    setError('');

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/seva-trust/admin/login');
      return;
    }

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/updates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setUpdates(updates.filter(u => u.id !== id));
      } else {
        throw new Error(data.error || 'Failed to delete update');
      }
    } catch (err) {
      setError(err.message || 'Could not delete update.');
    }
  };

  // Filter donations
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donation.stripe_session_id && donation.stripe_session_id.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || 
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Header bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-gold-500/10 p-2 rounded-xl border border-brand-gold-500/20 text-brand-gold-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-white leading-tight">
              Krishna Govind Seva NGO
            </h1>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
              Goushala Admin Dashboard
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={fetchDashboardData}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-gold-400' : ''}`} />
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-950/40 text-red-400 border border-red-900/30 hover:bg-red-900/20 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 pb-px space-x-6 text-sm">
          {[
            { id: 'overview', name: 'Overview Stats', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'donations', name: 'Donations Log', icon: <Heart className="w-4 h-4" /> },
            { id: 'updates', name: 'Daily Goushala Blogs', icon: <Video className="w-4 h-4" /> },
            { id: 'visitors', name: 'Visitor Analytics', icon: <Users className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 flex items-center space-x-2 border-b-2 font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-brand-gold-500 text-brand-gold-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="flex items-center space-x-3 bg-red-950/40 border border-red-900/40 text-red-400 p-4 rounded-2xl text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOADING STATE CARD */}
        {isLoading && !stats ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-brand-gold-500 animate-spin" />
            <p className="text-slate-400 text-sm font-light">Loading Trust data logs...</p>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Stats Card 1 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold-500/5 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Funds Raised</span>
                      <div className="bg-brand-gold-500/10 p-2 rounded-xl text-brand-gold-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold font-serif text-white">
                      ₹{stats.donations.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">
                      Completed Donations: {stats.donations.completedCount}
                    </p>
                  </div>

                  {/* Stats Card 2 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Donors Logged</span>
                      <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-400">
                        <Heart className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {stats.donations.totalCount}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">
                      Successful Conversion: {((stats.donations.completedCount / (stats.donations.totalCount || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>

                  {/* Stats Card 3 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Page Views</span>
                      <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {stats.views.totalViews}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">
                      Total logged router routing
                    </p>
                  </div>

                  {/* Stats Card 4 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Unique Visitors (IPs)</span>
                      <div className="bg-purple-500/10 p-2 rounded-xl text-purple-400">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {stats.views.uniqueVisitors}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-2 font-mono">
                      Unique IP address logs
                    </p>
                  </div>

                </div>

                {/* Dashboard Chart & Sub details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Traffic Chart Component */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-8">
                    <h3 className="text-base font-serif font-bold text-white mb-6 flex items-center space-x-2">
                      <EyeIcon className="w-5 h-5 text-brand-gold-500" />
                      <span>Visitor Route Breakdown</span>
                    </h3>

                    {/* Premium Custom SVG Bar Chart */}
                    <div className="space-y-4">
                      {stats.pathViews && stats.pathViews.length > 0 ? (
                        stats.pathViews.map((pv, idx) => {
                          const maxCount = Math.max(...stats.pathViews.map(p => p.count)) || 1;
                          const widthPct = (pv.count / maxCount) * 100;
                          return (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-xs font-mono text-slate-400">
                                <span className="text-slate-300 font-medium">{pv.path}</span>
                                <span>{pv.count} views</span>
                              </div>
                              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full bg-gradient-to-r from-brand-gold-500 to-amber-600 transition-all duration-1000"
                                  style={{ width: `${widthPct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-slate-500 font-light italic">No traffic logged yet.</p>
                      )}
                    </div>
                  </div>

                  {/* General Trust quick analytics details */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-serif font-bold text-white mb-4">Quick Insights</h3>
                      <div className="space-y-4 text-xs font-light text-slate-400">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Avg Donation Value:</span>
                          <span className="text-white font-bold font-mono">
                            ₹{(stats.donations.totalAmount / (stats.donations.completedCount || 1)).toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Successful Donors:</span>
                          <span className="text-emerald-400 font-bold">{stats.donations.completedCount}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Pending Checkout Attempt:</span>
                          <span className="text-amber-550 font-bold">
                            {stats.donations.totalCount - stats.donations.completedCount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Views per Visitor:</span>
                          <span className="text-white font-bold font-mono">
                            {(stats.views.totalViews / (stats.views.uniqueVisitors || 1)).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 border border-slate-800/80 rounded-2xl mt-6">
                      <h4 className="text-xs font-semibold text-brand-gold-400 uppercase tracking-wide mb-1.5">
                        Google Analytics Live
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                        Google Analytics code tag is successfully deployed on your public landing index file targeting id <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-300">G-8L9H5W6G8Y</code>. Visit statistics here match real-time database view requests.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. DONATIONS LOG TAB */}
            {activeTab === 'donations' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 animate-fadeIn">
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search donor name, email, or Stripe session ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500"
                    />
                  </div>
                  
                  <div className="flex space-x-3 text-xs">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-gold-500"
                    >
                      <option value="all">All Donations</option>
                      <option value="completed">Completed Only</option>
                      <option value="pending">Pending Only</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-850">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                        <th className="p-4">Donor Name & Email</th>
                        <th className="p-4">Donation Session</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {filteredDonations.length > 0 ? (
                        filteredDonations.map((donation) => (
                          <tr key={donation.id} className="hover:bg-slate-850/30 transition-colors">
                            <td className="p-4">
                              <span className="font-semibold text-white block">{donation.donor_name}</span>
                              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{donation.donor_email}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-mono text-slate-400 text-[10px] break-all block max-w-xs md:max-w-md">
                                {donation.stripe_session_id || 'Manual Log'}
                              </span>
                            </td>
                            <td className="p-4 font-serif font-bold text-slate-200 text-sm">
                              ₹{donation.amount.toLocaleString('en-IN')}
                            </td>
                            <td className="p-4">
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                donation.status === 'completed' 
                                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/30' 
                                  : 'bg-amber-950/80 text-amber-500 border border-amber-900/30'
                              }`}>
                                {donation.status}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 font-mono text-[10px]">
                              {new Date(donation.created_at).toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-slate-500 font-light italic">
                            No donations records matching filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono">
                  <span>Showing {filteredDonations.length} of {donations.length} records</span>
                </div>

              </div>
            )}

            {/* 3. DAILY UPDATES / BLOGS MANAGER */}
            {activeTab === 'updates' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
                
                {/* Left Side: Create Update Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-5 h-fit">
                  <h3 className="text-base font-serif font-bold text-white mb-6 flex items-center space-x-2">
                    <PlusCircle className="w-5 h-5 text-brand-gold-500" />
                    <span>Post Daily Update / Vlog</span>
                  </h3>

                  {updateSuccess && (
                    <div className="flex items-center space-x-2 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 px-4 py-3 rounded-xl text-xs mb-4">
                      <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                      <span>{updateSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleCreateUpdate} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                        Post Title
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Fresh green fodder distribution today"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-gold-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                        Description / Vlog Content
                      </label>
                      <textarea
                        rows="4"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Describe today's activities in the Goushala..."
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-brand-gold-500 resize-none"
                        required
                      ></textarea>
                    </div>

                    {/* Local File Upload Selector */}
                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-3">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Upload Video/Image from PC
                      </span>
                      <div className="flex items-center space-x-3">
                        <label className="bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl cursor-pointer flex items-center space-x-1.5 text-xs transition-colors">
                          <Upload className="w-4.5 h-4.5 text-brand-gold-500" />
                          <span>Choose Media File</span>
                          <input 
                            type="file" 
                            accept="image/*,video/*" 
                            onChange={handleLocalFileUpload} 
                            className="hidden" 
                          />
                        </label>
                        {isFileUploading && (
                          <div className="flex items-center space-x-1 text-slate-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold-500" />
                            <span className="text-[10px]">Uploading...</span>
                          </div>
                        )}
                      </div>
                      {uploadProgressMsg && (
                        <p className="text-[10px] text-brand-gold-400 font-mono">{uploadProgressMsg}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                          Media Type
                        </label>
                        <select
                          value={newMediaType}
                          onChange={(e) => setNewMediaType(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-3 text-slate-200 focus:outline-none focus:border-brand-gold-500"
                        >
                          <option value="video">Daily Vlog (Video)</option>
                          <option value="image">Goushala Snippet (Image)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                          Media Link / Path
                        </label>
                        <input
                          type="text"
                          value={newMediaUrl}
                          onChange={(e) => setNewMediaUrl(e.target.value)}
                          placeholder="Uploaded path or Social URL"
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-3 text-slate-200 focus:outline-none focus:border-brand-gold-500"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                      * You can paste direct video links from **YouTube** (e.g. `youtube.com/watch?v=...`), **Instagram** (e.g. `instagram.com/reel/...`), or **Facebook** directly. They will embed automatically on the public site!
                    </p>

                    <button
                      type="submit"
                      disabled={isUpdateSubmitting || isFileUploading}
                      className="w-full py-3.5 rounded-xl text-slate-950 font-bold bg-gradient-to-r from-brand-gold-400 to-amber-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-75 cursor-pointer flex items-center justify-center space-x-2 text-sm"
                    >
                      {isUpdateSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Publishing vlog...</span>
                        </>
                      ) : (
                        <span>Publish Update</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Right Side: List of Updates */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-7 space-y-4">
                  <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-brand-gold-500" />
                    <span>Published Updates Log</span>
                  </h3>

                  <div className="max-h-[580px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                    {updates.length > 0 ? (
                      updates.map((post) => (
                        <div 
                          key={post.id} 
                          className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-start justify-between space-x-4"
                        >
                          <div className="flex space-x-3 items-start overflow-hidden">
                            {post.media_url ? (
                              <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-800 relative flex items-center justify-center">
                                {post.media_type === 'video' ? (
                                  <Play className="w-5 h-5 text-brand-gold-500 fill-brand-gold-500/20" />
                                ) : (
                                  <img 
                                    src={post.media_url.startsWith('/uploads/') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${post.media_url}` : post.media_url} 
                                    alt="" 
                                    className="w-full h-full object-cover" 
                                  />
                                )}
                              </div>
                            ) : (
                              <div className="w-16 h-16 bg-slate-900 rounded-xl shrink-0 border border-slate-800 flex items-center justify-center text-slate-600">
                                <FileText className="w-6 h-6" />
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(post.created_at).toLocaleDateString('en-IN')}</span>
                                <span className="bg-slate-900 text-brand-gold-400 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-slate-800">
                                  {post.media_type}
                                </span>
                              </span>
                              <h4 className="text-sm font-semibold text-white mt-1 truncate" title={post.title}>
                                {post.title}
                              </h4>
                              <p className="text-xs text-slate-450 line-clamp-2 mt-0.5 font-light">
                                {post.description}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteUpdate(post.id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 border border-transparent hover:border-red-950 rounded-xl transition-all shrink-0 cursor-pointer"
                            title="Delete update post"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 font-light italic text-center py-10">
                        No updates published yet. Use the form to post updates.
                      </p>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* 4. VISITOR ANALYTICS TAB */}
            {activeTab === 'visitors' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
                    <Users className="w-5 h-5 text-brand-gold-500" />
                    <span>Real-time Visitor Logs</span>
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Showing latest 200 visit queries
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-850">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                        <th className="p-4">IP Address</th>
                        <th className="p-4">Visited Path</th>
                        <th className="p-4">Referrer</th>
                        <th className="p-4">User Agent</th>
                        <th className="p-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {visitors.length > 0 ? (
                        visitors.map((visitor) => (
                          <tr key={visitor.id} className="hover:bg-slate-850/30 transition-colors">
                            <td className="p-4 font-mono font-semibold text-slate-300">
                              {visitor.ip_address}
                            </td>
                            <td className="p-4">
                              <span className="bg-slate-950 border border-slate-800 text-brand-gold-400 font-mono px-2 py-0.5 rounded text-[10px]">
                                {visitor.path}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 font-mono text-[10px]">
                              {visitor.referrer}
                            </td>
                            <td className="p-4 text-slate-500 max-w-xs truncate" title={visitor.user_agent}>
                              {visitor.user_agent}
                            </td>
                            <td className="p-4 text-slate-400 font-mono text-[10px]">
                              {new Date(visitor.timestamp).toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-slate-500 font-light italic">
                            No visitor sessions logged.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
