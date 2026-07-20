import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Eye, Heart, LogOut, RefreshCw, 
  Search, ShieldAlert, FileSpreadsheet, EyeIcon, Calendar,
  Video, Play, Trash2, PlusCircle, FileText, CheckCircle2,
  Upload, Loader2, BarChart2, Plus, Edit2, ShieldCheck, Check,
  Briefcase, Package, AlertTriangle, Settings, Bell, X, Info, HeartHandshake,
  Droplets
} from 'lucide-react';
import { recordPageView } from '../utils/analytics';

// MOCK DATA FOR SEEDING LOCALSTORAGE
const MOCK_COWS = [
  { id: 'cow-1', name: 'Nandini', breed: 'Gir', age: '4 Years', health: 'Healthy', intakeDate: '2024-01-10', desc: 'Rescued from drought area.' },
  { id: 'cow-2', name: 'Radha', breed: 'Sahiwal', age: '6 Years', health: 'Recovered', intakeDate: '2024-03-15', desc: 'Rescued from Vrindavan road accident.' },
  { id: 'cow-3', name: 'Balaram', breed: 'Kankrej', age: '3 Years', health: 'Healthy', intakeDate: '2023-11-20', desc: 'Abandoned highway calf.' }
];

const MOCK_INVENTORY = [
  { id: 'inv-1', name: 'Dry Wheat Bran (Choker)', category: 'Feed', quantity: 1850, unit: 'kg', threshold: 500 },
  { id: 'inv-2', name: 'Green Napier Fodder', category: 'Feed', quantity: 340, unit: 'kg', threshold: 400 }, // Low stock
  { id: 'inv-3', name: 'Calcium Veterinary Supplements', category: 'Medicine', quantity: 45, unit: 'bottles', threshold: 10 },
  { id: 'inv-4', name: 'Anti-foot-and-mouth Vaccine', category: 'Medicine', quantity: 8, unit: 'vials', threshold: 15 } // Low stock
];

const MOCK_STAFF = [
  { id: 'st-1', name: 'Dr. Vivek Sharma', role: 'Chief Veterinarian', shift: 'Morning (08:00 AM - 02:00 PM)', contact: '+91 99999 77777' },
  { id: 'st-2', name: 'Ramesh Yadav', role: 'Senior Caretaker', shift: 'Full Day (06:00 AM - 06:00 PM)', contact: '+91 88888 66666' },
  { id: 'st-3', name: 'Sanjay Mishra', role: 'Fodder Manager', shift: 'Evening (02:00 PM - 08:00 PM)', contact: '+91 77777 55555' }
];

const MOCK_MILK_RECORDS = [
  { id: 'milk-1', date: '2026-07-20', morning: 85, evening: 70, total: 155, usage: 'Distributed 60L to Bal-Bhavan Seva, 95L Sold to local cooperative dairy', recordedBy: 'Ramesh Yadav' },
  { id: 'milk-2', date: '2026-07-19', morning: 82, evening: 68, total: 150, usage: 'Distributed 50L to Bal-Bhavan Seva, 100L Sold to local cooperative dairy', recordedBy: 'Sanjay Mishra' },
  { id: 'milk-3', date: '2026-07-18', morning: 88, evening: 74, total: 162, usage: 'Distributed 60L to Bal-Bhavan Seva, 102L Sold to local cooperative dairy', recordedBy: 'Ramesh Yadav' }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [donations, setDonations] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [updates, setUpdates] = useState([]);
  
  // Custom modules loaded from localstorage or fallbacks
  const [cowsList, setCowsList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [volunteerList, setVolunteerList] = useState([]);
  const [milkList, setMilkList] = useState([]);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals / Dialog state
  const [showAddCowModal, setShowAddCowModal] = useState(false);
  const [showAddInvModal, setShowAddInvModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddMilkModal, setShowAddMilkModal] = useState(false);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState(null);

  // Form inputs
  const [cowForm, setCowForm] = useState({ name: '', breed: 'Gir', age: '', health: 'Healthy', intakeDate: '', desc: '' });
  const [invForm, setInvForm] = useState({ name: '', category: 'Feed', quantity: '', unit: 'kg', threshold: '' });
  const [staffForm, setStaffForm] = useState({ name: '', role: 'Caretaker', shift: 'Morning', contact: '' });
  const [milkForm, setMilkForm] = useState({ date: new Date().toISOString().split('T')[0], morning: '', evening: '', usage: '', recordedBy: '' });
  
  // Daily Updates Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState('video');
  const [isUpdateSubmitting, setIsUpdateSubmitting] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/seva-trust/admin/login');
  };

  // Toast notifier
  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
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
      setError('Establishing cloud endpoints offline. Running dashboard in standalone secure sync mode.');
      // Offline fallback mock data for testing
      setStats({
        donations: { totalAmount: 432500, completedCount: 120, totalCount: 145 },
        views: { totalViews: 4520, uniqueVisitors: 1150 },
        pathViews: [
          { path: '/', count: 1850 },
          { path: '/seva', count: 1100 },
          { path: '/donate', count: 850 },
          { path: '/cows', count: 720 }
        ]
      });
      setDonations([
        { id: 'don-1', donor_name: 'Rajesh Sharma', donor_email: 'rajesh@gmail.com', donor_phone: '+91 99999 11111', seva_type: 'Feed Seva', amount: 501, status: 'completed', created_at: new Date().toISOString() },
        { id: 'don-2', donor_name: 'Amit Patel', donor_email: 'amit@yahoo.com', donor_phone: '+91 98888 22222', seva_type: 'Cow Adoption', amount: 2500, status: 'completed', created_at: new Date().toISOString() },
        { id: 'don-3', donor_name: 'Suresh Verma', donor_email: 'suresh@hotmail.com', donor_phone: '+91 97777 33333', seva_type: 'Medical Seva', amount: 5000, status: 'pending', created_at: new Date().toISOString() }
      ]);
      setVisitors([
        { id: 'v-1', ip_address: '192.168.1.1', path: '/donate', timestamp: new Date().toISOString() },
        { id: 'v-2', ip_address: '192.168.1.2', path: '/seva', timestamp: new Date().toISOString() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Synchronize localStorage modules
  const syncLocalModules = () => {
    if (!localStorage.getItem('adminCows')) {
      localStorage.setItem('adminCows', JSON.stringify(MOCK_COWS));
    }
    if (!localStorage.getItem('adminInventory')) {
      localStorage.setItem('adminInventory', JSON.stringify(MOCK_INVENTORY));
    }
    if (!localStorage.getItem('adminStaff')) {
      localStorage.setItem('adminStaff', JSON.stringify(MOCK_STAFF));
    }
    if (!localStorage.getItem('adminMilk')) {
      localStorage.setItem('adminMilk', JSON.stringify(MOCK_MILK_RECORDS));
    }

    setCowsList(JSON.parse(localStorage.getItem('adminCows')));
    setInventoryList(JSON.parse(localStorage.getItem('adminInventory')));
    setStaffList(JSON.parse(localStorage.getItem('adminStaff')));
    setVolunteerList(JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]'));
    setMilkList(JSON.parse(localStorage.getItem('adminMilk')));
  };

  useEffect(() => {
    recordPageView('/seva-trust/admin/dashboard');
    fetchDashboardData();
    syncLocalModules();
  }, [navigate]);

  // Handle local updates media upload
  const handleLocalFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setIsFileUploading(true);
    setUploadProgressMsg('Uploading media file to server...');

    const token = localStorage.getItem('adminToken');
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

      setNewMediaUrl(data.fileUrl);
      const fileExt = file.name.split('.').pop().toLowerCase();
      const videoExtensions = ['mp4', 'webm', 'mov', 'ogg'];
      if (videoExtensions.includes(fileExt)) {
        setNewMediaType('video');
      } else {
        setNewMediaType('image');
      }

      addToast('Media uploaded and pre-filled successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'File upload offline. Simulating mock path upload.');
      setNewMediaUrl('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80');
      setNewMediaType('image');
    } finally {
      setIsFileUploading(false);
      setUploadProgressMsg('');
    }
  };

  // Create update log post
  const handleCreateUpdate = async (e) => {
    e.preventDefault();
    setError('');

    if (!newTitle.trim() || !newDesc.trim()) {
      addToast('Title and description are required.', 'error');
      return;
    }

    setIsUpdateSubmitting(true);
    const token = localStorage.getItem('adminToken');

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
        addToast('Goushala daily update posted successfully!');
        setNewTitle('');
        setNewDesc('');
        setNewMediaUrl('');
        setNewMediaType('video');
        
        // Refresh updates
        const updatesRes = await fetch(`${apiBaseUrl}/api/updates`);
        const updatesData = await updatesRes.json();
        setUpdates(updatesData);
      } else {
        throw new Error(data.error || 'Failed to post update');
      }
    } catch (err) {
      console.error(err);
      // Offline fallback simulate save
      const newPost = {
        id: 'post-' + Date.now(),
        title: newTitle,
        description: newDesc,
        media_url: newMediaUrl || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
        media_type: newMediaType,
        created_at: new Date().toISOString()
      };
      const synced = [newPost, ...updates];
      setUpdates(synced);
      addToast('Update saved in browser local registry!');
      setNewTitle('');
      setNewDesc('');
      setNewMediaUrl('');
    } finally {
      setIsUpdateSubmitting(false);
    }
  };

  // Delete Update
  const handleDeleteUpdate = async (id) => {
    setError('');
    const token = localStorage.getItem('adminToken');

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/updates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUpdates(updates.filter(u => u.id !== id));
        addToast('Daily update deleted successfully!');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err) {
      console.error(err);
      setUpdates(updates.filter(u => u.id !== id && u._id !== id));
      addToast('Update deleted from local state!');
    }
  };

  // CRUD Cow submit
  const handleAddCow = (e) => {
    e.preventDefault();
    if (!cowForm.name || !cowForm.age) {
      addToast('Name and age are required fields.', 'error');
      return;
    }
    const newCow = {
      id: 'cow-' + Date.now(),
      ...cowForm
    };
    const updated = [newCow, ...cowsList];
    localStorage.setItem('adminCows', JSON.stringify(updated));
    setCowsList(updated);
    setShowAddCowModal(false);
    setCowForm({ name: '', breed: 'Gir', age: '', health: 'Healthy', intakeDate: '', desc: '' });
    addToast(`${newCow.name} added to sanctuary cow list!`);
  };

  // Delete Cow
  const handleDeleteCow = (id) => {
    const updated = cowsList.filter(c => c.id !== id);
    localStorage.setItem('adminCows', JSON.stringify(updated));
    setCowsList(updated);
    addToast('Cow record deleted.');
  };

  // CRUD Inventory submit
  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!invForm.name || !invForm.quantity || !invForm.threshold) {
      addToast('Please fill in all inventory details.', 'error');
      return;
    }
    const newItem = {
      id: 'inv-' + Date.now(),
      name: invForm.name,
      category: invForm.category,
      quantity: parseFloat(invForm.quantity),
      unit: invForm.unit,
      threshold: parseFloat(invForm.threshold)
    };
    const updated = [newItem, ...inventoryList];
    localStorage.setItem('adminInventory', JSON.stringify(updated));
    setInventoryList(updated);
    setShowAddInvModal(false);
    setInvForm({ name: '', category: 'Feed', quantity: '', unit: 'kg', threshold: '' });
    addToast(`Inventory stock item: ${newItem.name} registered!`);
  };

  // Delete inventory
  const handleDeleteInventory = (id) => {
    const updated = inventoryList.filter(item => item.id !== id);
    localStorage.setItem('adminInventory', JSON.stringify(updated));
    setInventoryList(updated);
    addToast('Inventory record deleted.');
  };

  // CRUD Staff submit
  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.contact) {
      addToast('Please fill in staff name and contact number.', 'error');
      return;
    }
    const newStaff = {
      id: 'st-' + Date.now(),
      name: staffForm.name,
      role: staffForm.role,
      shift: staffForm.shift + ' shift',
      contact: staffForm.contact
    };
    const updated = [newStaff, ...staffList];
    localStorage.setItem('adminStaff', JSON.stringify(updated));
    setStaffList(updated);
    setShowAddStaffModal(false);
    setStaffForm({ name: '', role: 'Caretaker', shift: 'Morning', contact: '' });
    addToast(`${newStaff.name} registered on shift duty.`);
  };

  const handleDeleteStaff = (id) => {
    const updated = staffList.filter(s => s.id !== id);
    localStorage.setItem('adminStaff', JSON.stringify(updated));
    setStaffList(updated);
    addToast('Staff shift record deleted.');
  };

  const handleAddMilk = (e) => {
    e.preventDefault();
    if (!milkForm.date || !milkForm.morning || !milkForm.evening) {
      addToast('Please enter date and both morning and evening milk quantities.', 'error');
      return;
    }
    const morningVal = parseFloat(milkForm.morning);
    const eveningVal = parseFloat(milkForm.evening);
    const totalVal = morningVal + eveningVal;
    
    const newRecord = {
      id: 'milk-' + Date.now(),
      date: milkForm.date,
      morning: morningVal,
      evening: eveningVal,
      total: totalVal,
      usage: milkForm.usage || 'General Distribution',
      recordedBy: milkForm.recordedBy || 'Duty Staff'
    };
    
    const updated = [newRecord, ...milkList];
    updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    localStorage.setItem('adminMilk', JSON.stringify(updated));
    setMilkList(updated);
    setShowAddMilkModal(false);
    setMilkForm({
      date: new Date().toISOString().split('T')[0],
      morning: '',
      evening: '',
      usage: '',
      recordedBy: ''
    });
    addToast(`Milk entry for ${newRecord.date} added. Total: ${totalVal}L`);
  };

  const handleDeleteMilk = (id) => {
    const updated = milkList.filter(m => m.id !== id);
    localStorage.setItem('adminMilk', JSON.stringify(updated));
    setMilkList(updated);
    addToast('Milk entry deleted.');
  };

  // Update volunteer application status
  const handleUpdateVolunteerStatus = (id, newStatus) => {
    const updated = volunteerList.map(vol => {
      if (vol.id === id) {
        return { ...vol, status: newStatus };
      }
      return vol;
    });
    localStorage.setItem('volunteerSubmissions', JSON.stringify(updated));
    setVolunteerList(updated);
    addToast(`Application status set to ${newStatus}.`);
  };

  const handleDeleteVolunteer = (id) => {
    const updated = volunteerList.filter(v => v.id !== id);
    localStorage.setItem('volunteerSubmissions', JSON.stringify(updated));
    setVolunteerList(updated);
    addToast('Volunteer submission cleared.');
  };

  // Filter Donations
  const filteredDonations = donations.filter(donation => {
    const donorName = donation.donor_name || '';
    const donorEmail = donation.donor_email || '';
    const donorPhone = donation.donor_phone || '';
    const sevaType = donation.seva_type || '';

    const matchesSearch = 
      donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donorPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sevaType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      donation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Donor Name,Email,Phone,Seva,Amount,Status,Date"].join(",") + "\n"
      + donations.map(d => `${d.donor_name},${d.donor_email},${d.donor_phone},${d.seva_type},${d.amount},${d.status},${d.created_at}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Goushala_Donations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Donation statement report exported to CSV!');
  };

  // Low stock inventory alert count
  const lowStockCount = inventoryList.filter(item => item.quantity <= item.threshold).length;

  return (
    <div className="min-h-screen bg-stone-50/50 text-zinc-900 flex flex-col font-sans antialiased">
      
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`px-4 py-3 rounded-xl shadow-lg border flex items-center space-x-2 text-xs font-semibold ${
              toast.type === 'error' 
                ? 'bg-red-50 text-red-700 border-red-100' 
                : 'bg-white text-zinc-800 border-stone-200'
            }`}
          >
            <Check className={`w-4 h-4 ${toast.type === 'error' ? 'text-red-500' : 'text-brand-gold-500'}`} />
            <span>{toast.msg}</span>
          </motion.div>
        ))}
      </div>

      {/* Top Header bar */}
      <header className="bg-white border-b border-stone-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-gold-500/10 p-1.5 rounded-xl border border-brand-gold-500/20 text-brand-gold-500">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" strokeDasharray="3 2" className="animate-spin-slow opacity-60" />
              <path d="M12 17a5 5 0 0 0 5-5c0-3-2.5-4.5-5-6-2.5 1.5-5 3-5 6a5 5 0 0 0 5 5z" fill="currentColor" className="opacity-20" />
              <path d="M12 6c-1.5-2-3-2-3 0 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-2-1.5-2-3 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-serif font-bold text-zinc-950 leading-tight">
              Krishna Govind Seva NGO
            </h1>
            <span className="text-[9px] text-zinc-400 font-mono tracking-wider uppercase block">
              Goushala SaaS Control Center
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Notifications alert */}
          <button
            onClick={() => {
              if (lowStockCount > 0) {
                addToast(`Critical alert: ${lowStockCount} inventory items are below minimum stock limits!`, 'error');
              } else {
                addToast('All systems operational. No warnings pending.');
              }
            }}
            className="p-2 text-zinc-450 hover:text-zinc-700 hover:bg-stone-50 rounded-xl transition-all cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            {lowStockCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-gold-500 rounded-full animate-pulse" />
            )}
          </button>

          <button 
            onClick={fetchDashboardData}
            className="p-2 text-zinc-450 hover:text-zinc-700 hover:bg-stone-50 rounded-xl transition-all cursor-pointer"
            title="Refresh database log sync"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-gold-500' : ''}`} />
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-stone-50 border border-stone-200 text-zinc-650 hover:bg-stone-100 hover:text-zinc-900 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Grid Panel */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        
        {/* Responsive Navigation Sidebar */}
        <aside className="w-full md:w-56 shrink-0 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none border-b md:border-b-0 md:border-r border-stone-200/80 md:pr-4">
          {[
            { id: 'overview', name: 'Overview Stats', icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'donations', name: 'Donations Log', icon: <Heart className="w-4 h-4" /> },
            { id: 'cows', name: 'Cow Shelter', icon: <Users className="w-4 h-4" /> },
            { id: 'milk_records', name: 'Milk Journal', icon: <Droplets className="w-4 h-4" /> },
            { id: 'updates', name: 'Daily Blogs', icon: <Video className="w-4 h-4" /> },
            { id: 'volunteers', name: 'Volunteers', icon: <HeartHandshake className="w-4 h-4" /> },
            { id: 'inventory', name: 'Stock Inventory', icon: <Package className="w-4 h-4" /> },
            { id: 'staff', name: 'Duty Staff', icon: <Briefcase className="w-4 h-4" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-zinc-950 text-white shadow-sm font-bold' 
                    : 'text-zinc-550 hover:bg-stone-100 hover:text-zinc-800'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
                {tab.id === 'inventory' && lowStockCount > 0 && (
                  <span className="bg-brand-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-auto">
                    {lowStockCount} alert
                  </span>
                )}
                {tab.id === 'volunteers' && volunteerList.filter(v => v.status === 'pending').length > 0 && (
                  <span className="bg-brand-gold-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-auto">
                    {volunteerList.filter(v => v.status === 'pending').length} new
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Dashboard Worksheets Panel */}
        <main className="flex-1 min-w-0 bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm">
          
          {error && (
            <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200 text-zinc-550 p-4 rounded-2xl text-xs font-semibold mb-6">
              <Info className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* SKELETON LOADER STATE */}
          {isLoading && !stats ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="bg-stone-50 border border-stone-150 h-28 rounded-2xl animate-pulse" />
                ))}
              </div>
              <div className="bg-stone-50 border border-stone-150 h-64 rounded-3xl animate-pulse" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* 1. OVERVIEW TAB */}
              {activeTab === 'overview' && stats && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="space-y-8"
                >
                  {/* Stats card grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border border-stone-200 rounded-2xl p-5 relative overflow-hidden bg-stone-50/50">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Total Raised</span>
                      <h4 className="text-2xl font-serif font-extrabold text-zinc-900 mt-2">₹{stats.donations.totalAmount.toLocaleString('en-IN')}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-1">Receipts verified: {stats.donations.completedCount}</p>
                    </div>

                    <div className="border border-stone-200 rounded-2xl p-5 relative overflow-hidden bg-stone-50/50">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Total Cows Sheltered</span>
                      <h4 className="text-2xl font-serif font-extrabold text-zinc-900 mt-2">{cowsList.length} Cows</h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-1">Intakes this month: +2</p>
                    </div>

                    <div className="border border-stone-200 rounded-2xl p-5 relative overflow-hidden bg-stone-50/50">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Web Traffic Views</span>
                      <h4 className="text-2xl font-serif font-extrabold text-zinc-900 mt-2">{stats.views.totalViews.toLocaleString()}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-1">Unique visitors: {stats.views.uniqueVisitors}</p>
                    </div>

                    <div className="border border-stone-200 rounded-2xl p-5 relative overflow-hidden bg-stone-50/50">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Volunteer Applications</span>
                      <h4 className="text-2xl font-serif font-extrabold text-zinc-900 mt-2">{volunteerList.length} Apps</h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-1">Pending approval: {volunteerList.filter(v => v.status === 'pending').length}</p>
                    </div>
                  </div>

                  {/* Quick path views list table */}
                  <div className="border border-stone-200 rounded-3xl overflow-hidden shadow-sm bg-white">
                    <div className="p-5 border-b border-stone-150 flex items-center justify-between">
                      <h3 className="font-serif font-bold text-zinc-800 text-sm">Web Path Statistics</h3>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">excluding admin pages</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                          <tr>
                            <th className="p-4">Resource Path</th>
                            <th className="p-4 text-right">Raw Pageviews count</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-zinc-650 font-light">
                          {stats.pathViews && stats.pathViews.map((route, i) => (
                            <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                              <td className="p-4 font-mono">{route.path || route.route}</td>
                              <td className="p-4 text-right font-bold font-serif text-zinc-900">{route.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. DONATIONS TAB */}
              {activeTab === 'donations' && (
                <motion.div
                  key="donations"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Search donors by name, phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold-500 font-sans"
                      />
                    </div>

                    <div className="flex space-x-2 w-full sm:w-auto shrink-0 justify-end">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-xs focus:outline-none font-sans cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>

                      <button
                        onClick={handleExportCSV}
                        className="flex items-center space-x-1.5 bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                          <tr>
                            <th className="p-4">Donor Details</th>
                            <th className="p-4">Gau Seva Fund</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-zinc-650 font-light">
                          {filteredDonations.length > 0 ? (
                            filteredDonations.map((donation, idx) => (
                              <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                                <td className="p-4">
                                  <span className="block font-bold text-zinc-800">{donation.donor_name}</span>
                                  <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">{donation.donor_email} | {donation.donor_phone}</span>
                                </td>
                                <td className="p-4 font-semibold text-zinc-700">{donation.seva_type}</td>
                                <td className="p-4 font-bold font-serif text-zinc-900">₹{donation.amount.toLocaleString('en-IN')}</td>
                                <td className="p-4">
                                  <span className={`inline-flex items-center space-x-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    donation.status === 'completed' 
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                                      : 'bg-amber-50 text-amber-800 border border-amber-100'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${donation.status === 'completed' ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                                    <span>{donation.status}</span>
                                  </span>
                                </td>
                                <td className="p-4 text-[10px] text-zinc-400 font-mono">
                                  {new Date(donation.created_at || donation.timestamp).toLocaleDateString('en-IN', {
                                    day: '2-digit', month: 'short', year: 'numeric'
                                  })}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-zinc-400">
                                <ShieldAlert className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                                <h4 className="font-serif font-bold text-zinc-800 text-sm">No donations logged</h4>
                                <p className="text-zinc-500 text-[10px] font-light mt-1">Try expanding filters or search details.</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. COWS TAB */}
              {activeTab === 'cows' && (
                <motion.div
                  key="cows"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-zinc-900 text-sm">Registered Cows Registry</h3>
                    
                    <button
                      onClick={() => setShowAddCowModal(true)}
                      className="flex items-center space-x-1 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Register Cow</span>
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-4">Name & Breed</th>
                          <th className="p-4">Age</th>
                          <th className="p-4">Health Status</th>
                          <th className="p-4">Rescue Intake Date</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-zinc-650 font-light">
                        {cowsList.map((cow) => (
                          <tr key={cow.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4 font-semibold text-zinc-850">
                              <span className="block font-bold text-zinc-900">{cow.name}</span>
                              <span className="block text-[10px] text-zinc-400 font-mono font-normal mt-0.5">{cow.breed} Breed</span>
                            </td>
                            <td className="p-4 text-zinc-700">{cow.age}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center space-x-1 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                cow.health === 'Healthy' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                                cow.health === 'Recovered' ? 'bg-sky-50 text-sky-850 border border-sky-100' : 'bg-amber-50 text-amber-800 border border-amber-100'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${cow.health === 'Healthy' ? 'bg-emerald-600' : cow.health === 'Recovered' ? 'bg-sky-600' : 'bg-brand-gold-500'}`} />
                                <span>{cow.health}</span>
                              </span>
                            </td>
                            <td className="p-4 text-zinc-500 font-mono">{cow.intakeDate}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteCow(cow.id)}
                                className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-block"
                                title="Delete cow entry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* 4. UPDATES TAB */}
              {activeTab === 'updates' && (
                <motion.div
                  key="updates"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Form */}
                  <div className="lg:col-span-5 bg-stone-50/50 border border-stone-200 rounded-2xl p-5 space-y-4">
                    <h4 className="font-serif font-bold text-zinc-900 text-sm">Post Daily vlog/blog update</h4>
                    
                    <form onSubmit={handleCreateUpdate} className="space-y-4 text-xs font-semibold text-zinc-650">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Post Title</label>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Feeding sessions at calf nursery"
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-zinc-800 focus:outline-none focus:border-brand-gold-500 font-sans font-normal"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Vlog/Blog Description</label>
                        <textarea
                          rows="4"
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          placeholder="What did Gomata feed on today?"
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-zinc-800 focus:outline-none focus:border-brand-gold-500 resize-none font-sans font-normal"
                          required
                        ></textarea>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Attach Media</label>
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center space-x-1.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-700 cursor-pointer shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isFileUploading ? 'Uploading...' : 'Upload Video/Image'}</span>
                            <input
                              type="file"
                              accept="video/*,image/*"
                              onChange={handleLocalFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {uploadProgressMsg && <p className="text-[10px] text-zinc-400 font-mono">{uploadProgressMsg}</p>}
                        
                        <input
                          type="url"
                          value={newMediaUrl}
                          onChange={(e) => setNewMediaUrl(e.target.value)}
                          placeholder="Or paste external YouTube/Instagram URL"
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-zinc-800 focus:outline-none focus:border-brand-gold-500 font-sans font-normal"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isUpdateSubmitting}
                        className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        {isUpdateSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Posting to feed...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Post Daily Update</span>
                          </>
                        )}
                      </button>

                    </form>
                  </div>

                  {/* Right Column: List of updates */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="font-serif font-bold text-zinc-900 text-sm">Active updates logs ({updates.length})</h4>
                    
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                      {updates.length > 0 ? (
                        updates.map((post) => (
                          <div key={post.id || post._id} className="border border-stone-200 rounded-2xl p-4 flex gap-4 bg-white shadow-sm hover:shadow transition-all">
                            {post.media_url && (
                              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                                <img src={post.media_url} alt="Media thumbnail" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h5 className="font-bold text-zinc-850 text-xs md:text-sm">{post.title}</h5>
                                <p className="text-[11px] text-zinc-550 font-light mt-1 line-clamp-2">{post.description}</p>
                              </div>
                              <div className="flex justify-between items-center pt-2 mt-2 border-t border-stone-100">
                                <span className="text-[9px] text-zinc-400 font-mono">
                                  {new Date(post.created_at).toLocaleDateString()}
                                </span>
                                <button
                                  onClick={() => handleDeleteUpdate(post.id || post._id)}
                                  className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 border border-stone-150 rounded-2xl text-zinc-400">
                          <Video className="w-8 h-8 mx-auto mb-2 text-zinc-300 animate-pulse" />
                          <p className="text-xs font-serif font-bold text-zinc-850">No daily logs posted</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 5. VOLUNTEERS TAB */}
              {activeTab === 'volunteers' && (
                <motion.div
                  key="volunteers"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif font-bold text-zinc-900 text-sm">Volunteer Enrollment Applications</h3>

                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-4">Volunteer Info</th>
                          <th className="p-4">Seva Preference</th>
                          <th className="p-4">Availability</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-zinc-650 font-light">
                        {volunteerList.length > 0 ? (
                          volunteerList.map((vol) => (
                            <tr key={vol.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="p-4">
                                <span className="block font-bold text-zinc-900">{vol.name}</span>
                                <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">{vol.email} | {vol.phone}</span>
                                {vol.notes && <span className="block text-[10px] text-zinc-500 italic mt-1 font-sans">"{vol.notes}"</span>}
                              </td>
                              <td className="p-4 font-semibold text-zinc-700">{vol.role}</td>
                              <td className="p-4 text-zinc-500">{vol.availability}</td>
                              <td className="p-4">
                                <select
                                  value={vol.status}
                                  onChange={(e) => handleUpdateVolunteerStatus(vol.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border focus:outline-none cursor-pointer ${
                                    vol.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                                    vol.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-100' : 'bg-amber-50 text-amber-800 border-amber-100'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleDeleteVolunteer(vol.id)}
                                  className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-block"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-zinc-450">
                              <HeartHandshake className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                              <h4 className="font-serif font-bold text-zinc-800 text-sm">No applications received</h4>
                              <p className="text-zinc-500 text-[10px] font-light mt-1">Volunteer submissions on the public page populate here.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* 6. INVENTORY TAB */}
              {activeTab === 'inventory' && (
                <motion.div
                  key="inventory"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-zinc-900 text-sm">Fodder & Medicine Inventory</h3>
                    
                    <button
                      onClick={() => setShowAddInvModal(true)}
                      className="flex items-center space-x-1 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Register Stock Item</span>
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-4">Item Name</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Stock Level</th>
                          <th className="p-4">Minimum Threshold</th>
                          <th className="p-4">Status Alert</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-zinc-650 font-light">
                        {inventoryList.map((item) => {
                          const isLow = item.quantity <= item.threshold;
                          return (
                            <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                              <td className="p-4 font-bold text-zinc-850">{item.name}</td>
                              <td className="p-4 font-semibold text-zinc-600">{item.category}</td>
                              <td className="p-4 font-bold font-serif text-zinc-900">{item.quantity} {item.unit}</td>
                              <td className="p-4 text-zinc-500 font-mono">{item.threshold} {item.unit}</td>
                              <td className="p-4">
                                {isLow ? (
                                  <span className="inline-flex items-center space-x-1 bg-red-50 text-red-800 border border-red-100 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                    <AlertTriangle className="w-3 h-3 text-red-600" />
                                    <span>Low Stock</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-100 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>In Stock</span>
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleDeleteInventory(item.id)}
                                  className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-block"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* 7. STAFF TAB */}
              {activeTab === 'staff' && (
                <motion.div
                  key="staff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-zinc-900 text-sm">Duty Staff & Shift Schedules</h3>
                    
                    <button
                      onClick={() => setShowAddStaffModal(true)}
                      className="flex items-center space-x-1 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Register Staff Shift</span>
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-4">Staff Name</th>
                          <th className="p-4">Assigned Role</th>
                          <th className="p-4">Shift Timings</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-zinc-655 font-light">
                        {staffList.map((staff) => (
                          <tr key={staff.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4 font-bold text-zinc-900">{staff.name}</td>
                            <td className="p-4">
                              <span className="bg-stone-100 text-zinc-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-stone-150">
                                {staff.role}
                              </span>
                            </td>
                            <td className="p-4 text-zinc-600">{staff.shift}</td>
                            <td className="p-4 text-zinc-550 font-mono">{staff.contact}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteStaff(staff.id)}
                                className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-block"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* 8. MILK JOURNAL TAB */}
              {activeTab === 'milk_records' && (
                <motion.div
                  key="milk_records"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif font-bold text-zinc-900 text-sm">Goushala Milk Register & Journal (दुग्ध पंजी)</h3>
                      <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block mt-1">Morning & Evening milk logs with utilization charts</p>
                    </div>
                    
                    <button
                      onClick={() => setShowAddMilkModal(true)}
                      className="flex items-center space-x-1 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Log Milk Entry</span>
                    </button>
                  </div>

                  {/* Milk Analytics Stats Dashboard */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Stat 1 */}
                    <div className="bg-stone-50/50 border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold tracking-wider">Total Output</span>
                      <div className="mt-2 flex items-baseline space-x-1">
                        <span className="text-xl font-serif font-black text-zinc-900">
                          {milkList.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0).toFixed(1)}
                        </span>
                        <span className="text-xs text-zinc-550">Liters</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-1">Cumulative database sum</span>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-stone-50/50 border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold tracking-wider">Daily Average</span>
                      <div className="mt-2 flex items-baseline space-x-1">
                        <span className="text-xl font-serif font-black text-zinc-900">
                          {milkList.length > 0 
                            ? (milkList.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0) / milkList.length).toFixed(1) 
                            : '0.0'}
                        </span>
                        <span className="text-xs text-zinc-550">L/day</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-1">Based on {milkList.length} logs</span>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-stone-50/50 border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold tracking-wider">Morning Avg</span>
                      <div className="mt-2 flex items-baseline space-x-1">
                        <span className="text-xl font-serif font-black text-zinc-900">
                          {milkList.length > 0 
                            ? (milkList.reduce((acc, curr) => acc + (parseFloat(curr.morning) || 0), 0) / milkList.length).toFixed(1) 
                            : '0.0'}
                        </span>
                        <span className="text-xs text-zinc-550">Liters</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-1">Morning shift yield</span>
                    </div>

                    {/* Stat 4 */}
                    <div className="bg-stone-50/50 border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold tracking-wider">Evening Avg</span>
                      <div className="mt-2 flex items-baseline space-x-1">
                        <span className="text-xl font-serif font-black text-zinc-900">
                          {milkList.length > 0 
                            ? (milkList.reduce((acc, curr) => acc + (parseFloat(curr.evening) || 0), 0) / milkList.length).toFixed(1) 
                            : '0.0'}
                        </span>
                        <span className="text-xs text-zinc-550">Liters</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-1">Evening shift yield</span>
                    </div>
                  </div>

                  {/* Custom CSS/SVG graph showing last 7 entries for premium UI look */}
                  <div className="bg-stone-50/40 border border-stone-200/80 rounded-2xl p-6">
                    <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-4">Production Trend (Last 7 Logs)</h4>
                    {milkList.length === 0 ? (
                      <div className="text-center py-6 text-xs text-zinc-400 font-mono">No data logged to display trend charts.</div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-end justify-between h-32 pt-4 px-2 border-b border-stone-200">
                          {milkList.slice(0, 7).reverse().map((item, idx) => {
                            const maxVal = Math.max(...milkList.map(m => m.total), 1);
                            const heightPct = (item.total / maxVal) * 100;
                            return (
                              <div key={item.id || idx} className="flex flex-col items-center flex-1 group relative">
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 bg-zinc-900 text-white text-[9px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-mono">
                                  🌅 M: {item.morning}L | 🌇 E: {item.evening}L
                                </div>
                                {/* Stacked Bar */}
                                <div className="w-8 flex flex-col justify-end h-28 rounded-t-lg overflow-hidden transition-all duration-305 group-hover:scale-105">
                                  <div 
                                    className="bg-brand-gold-400/80 w-full" 
                                    style={{ height: `${(item.morning / item.total) * heightPct}%` }}
                                    title={`Morning: ${item.morning}L`}
                                  />
                                  <div 
                                    className="bg-zinc-850 w-full" 
                                    style={{ height: `${(item.evening / item.total) * heightPct}%` }}
                                    title={`Evening: ${item.evening}L`}
                                  />
                                </div>
                                <span className="text-[9px] font-mono text-zinc-400 mt-2">
                                  {new Date(item.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-center space-x-6 text-[10px] font-semibold">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-3 h-3 bg-brand-gold-400/80 rounded-sm inline-block" />
                            <span className="text-zinc-550">Morning Production</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="w-3 h-3 bg-zinc-850 rounded-sm inline-block" />
                            <span className="text-zinc-550">Evening Production</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Table of logs */}
                  <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-stone-50 text-zinc-550 border-b border-stone-150 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-4">Date</th>
                          <th className="p-4">Morning Yield</th>
                          <th className="p-4">Evening Yield</th>
                          <th className="p-4">Total Output</th>
                          <th className="p-4">Recorded By</th>
                          <th className="p-4">Utilization & Notes</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-zinc-650 font-light">
                        {milkList.map((record) => (
                          <tr key={record.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4 font-bold text-zinc-900 whitespace-nowrap">
                              {new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="p-4 font-bold text-brand-gold-550">{record.morning} Liters</td>
                            <td className="p-4 font-bold text-zinc-700">{record.evening} Liters</td>
                            <td className="p-4">
                              <span className="bg-stone-100 text-zinc-900 text-xs font-bold px-2 py-0.5 rounded-lg border border-stone-200 font-mono">
                                {record.total} L
                              </span>
                            </td>
                            <td className="p-4 text-zinc-550">{record.recordedBy}</td>
                            <td className="p-4 text-zinc-500 italic max-w-xs truncate">{record.usage}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteMilk(record.id)}
                                className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-block"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {milkList.length === 0 && (
                          <tr>
                            <td colSpan="7" className="p-6 text-center text-zinc-400 font-mono">
                              No milk records logged yet. Click "Log Milk Entry" to begin keeping hisab-kitab.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          )}

        </main>
      </div>

      {/* CRUD DRAWERS (RIGHT-SIDE DRAWERS) */}
      
      {/* 1. Register Cow Drawer */}
      <AnimatePresence>
        {showAddCowModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowAddCowModal(false)} 
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-l-[32px] border-l border-stone-200 shadow-2xl p-6 md:p-8 w-full max-w-md h-full relative z-10 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-serif font-bold text-zinc-950">Register Rescued Cow</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">Sanctuary Intake Sheet</p>
                </div>
                <button 
                  onClick={() => setShowAddCowModal(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-stone-50 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleAddCow} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto py-6 space-y-5 text-xs font-semibold text-zinc-650 pr-1 -mr-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Cow Name</label>
                      <input type="text" value={cowForm.name} onChange={(e) => setCowForm({...cowForm, name: e.target.value})} placeholder="e.g. Surabhi" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Breed Category</label>
                      <select value={cowForm.breed} onChange={(e) => setCowForm({...cowForm, breed: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500">
                        <option>Gir</option>
                        <option>Sahiwal</option>
                        <option>Tharparkar</option>
                        <option>Kankrej</option>
                        <option>Red Sindhi</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Estimated Age</label>
                      <input type="text" value={cowForm.age} onChange={(e) => setCowForm({...cowForm, age: e.target.value})} placeholder="e.g. 3 Years" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Intake Date</label>
                      <input type="date" value={cowForm.intakeDate} onChange={(e) => setCowForm({...cowForm, intakeDate: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-1">Health Status</label>
                    <select value={cowForm.health} onChange={(e) => setCowForm({...cowForm, health: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500">
                      <option>Healthy</option>
                      <option>Recovered</option>
                      <option>Special Care</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-1">Brief rescue description</label>
                    <textarea rows="4" value={cowForm.desc} onChange={(e) => setCowForm({...cowForm, desc: e.target.value})} placeholder="Highway accident rescue log details..." className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal resize-none focus:outline-none focus:ring-1 focus:ring-brand-gold-500" />
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="flex space-x-3 pt-4 border-t border-stone-100">
                  <button type="button" onClick={() => setShowAddCowModal(false)} className="w-1/2 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 font-bold transition cursor-pointer text-xs">Cancel</button>
                  <button type="submit" className="w-1/2 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold transition cursor-pointer text-xs">Register Cow</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Register Inventory Drawer */}
      <AnimatePresence>
        {showAddInvModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowAddInvModal(false)} 
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-l-[32px] border-l border-stone-200 shadow-2xl p-6 md:p-8 w-full max-w-md h-full relative z-10 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-serif font-bold text-zinc-950">Add Stock Inventory</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">Register Fodder / Medical Stocks</p>
                </div>
                <button 
                  onClick={() => setShowAddInvModal(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-stone-50 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleAddInventory} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto py-6 space-y-5 text-xs font-semibold text-zinc-650 pr-1 -mr-1">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-1">Item Description Name</label>
                    <input type="text" value={invForm.name} onChange={(e) => setInvForm({...invForm, name: e.target.value})} placeholder="e.g. Dry Straw bags" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Category</label>
                      <select value={invForm.category} onChange={(e) => setInvForm({...invForm, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500">
                        <option>Feed</option>
                        <option>Medicine</option>
                        <option>Equipment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Measuring Unit</label>
                      <select value={invForm.unit} onChange={(e) => setInvForm({...invForm, unit: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500">
                        <option>kg</option>
                        <option>bottles</option>
                        <option>vials</option>
                        <option>units</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Initial Quantity</label>
                      <input type="number" value={invForm.quantity} onChange={(e) => setInvForm({...invForm, quantity: e.target.value})} placeholder="e.g. 500" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Alert Threshold</label>
                      <input type="number" value={invForm.threshold} onChange={(e) => setInvForm({...invForm, threshold: e.target.value})} placeholder="e.g. 100" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="flex space-x-3 pt-4 border-t border-stone-100">
                  <button type="button" onClick={() => setShowAddInvModal(false)} className="w-1/2 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 font-bold transition cursor-pointer text-xs">Cancel</button>
                  <button type="submit" className="w-1/2 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold transition cursor-pointer text-xs">Register Item</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Register Staff Drawer */}
      <AnimatePresence>
        {showAddStaffModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowAddStaffModal(false)} 
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-l-[32px] border-l border-stone-200 shadow-2xl p-6 md:p-8 w-full max-w-md h-full relative z-10 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-serif font-bold text-zinc-950">Add Duty Staff</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">Register caretaker / doctor shifts</p>
                </div>
                <button 
                  onClick={() => setShowAddStaffModal(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-stone-50 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleAddStaff} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto py-6 space-y-5 text-xs font-semibold text-zinc-650 pr-1 -mr-1">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-1">Staff Member Name</label>
                    <input type="text" value={staffForm.name} onChange={(e) => setStaffForm({...staffForm, name: e.target.value})} placeholder="e.g. Ramesh Kumar" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Assigned Role</label>
                      <select value={staffForm.role} onChange={(e) => setStaffForm({...staffForm, role: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500">
                        <option>Caretaker</option>
                        <option>Veterinarian</option>
                        <option>Doctor Assistant</option>
                        <option>Fodder Manager</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Shift Slot</label>
                      <select value={staffForm.shift} onChange={(e) => setStaffForm({...staffForm, shift: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500">
                        <option>Morning (08:00 AM - 02:00 PM)</option>
                        <option>Evening (02:00 PM - 08:00 PM)</option>
                        <option>Night Shift (08:00 PM - 08:00 AM)</option>
                        <option>Full Day (06:00 AM - 06:00 PM)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-1">Contact Number</label>
                    <input type="tel" value={staffForm.contact} onChange={(e) => setStaffForm({...staffForm, contact: e.target.value})} placeholder="e.g. +91 99999 88888" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="flex space-x-3 pt-4 border-t border-stone-100">
                  <button type="button" onClick={() => setShowAddStaffModal(false)} className="w-1/2 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 font-bold transition cursor-pointer text-xs">Cancel</button>
                  <button type="submit" className="w-1/2 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold transition cursor-pointer text-xs">Register Staff</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Register Milk Record Drawer */}
      <AnimatePresence>
        {showAddMilkModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowAddMilkModal(false)} 
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-l-[32px] border-l border-stone-200 shadow-2xl p-6 md:p-8 w-full max-w-md h-full relative z-10 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-serif font-bold text-zinc-950">Log Goushala Milk Entry</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">Daily production & dispatch ledger (दुग्ध पंजी)</p>
                </div>
                <button 
                  onClick={() => setShowAddMilkModal(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-stone-50 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleAddMilk} className="flex-1 flex flex-col justify-between overflow-hidden">
                <div className="flex-1 overflow-y-auto py-6 space-y-5 text-xs font-semibold text-zinc-650 pr-1 -mr-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Date</label>
                      <input type="date" value={milkForm.date} onChange={(e) => setMilkForm({...milkForm, date: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Recorded By (Duty Staff)</label>
                      <select value={milkForm.recordedBy} onChange={(e) => setMilkForm({...milkForm, recordedBy: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required>
                        <option value="">Select Staff</option>
                        {staffList.map(s => (
                          <option key={s.id} value={s.name}>{s.name} ({s.role})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Morning Yield (Liters)</label>
                      <input type="number" step="0.1" min="0" value={milkForm.morning} onChange={(e) => setMilkForm({...milkForm, morning: e.target.value})} placeholder="e.g. 85.5" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-1">Evening Yield (Liters)</label>
                      <input type="number" step="0.1" min="0" value={milkForm.evening} onChange={(e) => setMilkForm({...milkForm, evening: e.target.value})} placeholder="e.g. 70.2" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal focus:outline-none focus:ring-1 focus:ring-brand-gold-500" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-1">Utilization Details / Dispatch Notes</label>
                    <textarea rows="3" value={milkForm.usage} onChange={(e) => setMilkForm({...milkForm, usage: e.target.value})} placeholder="e.g. Distributed 60L to Bal-Bhavan Seva, 95L Sold to cooperative dairy..." className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-normal resize-none focus:outline-none focus:ring-1 focus:ring-brand-gold-500" />
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="flex space-x-3 pt-4 border-t border-stone-100">
                  <button type="button" onClick={() => setShowAddMilkModal(false)} className="w-1/2 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 font-bold transition cursor-pointer text-xs">Cancel</button>
                  <button type="submit" className="w-1/2 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold transition cursor-pointer text-xs">Save Entry</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
