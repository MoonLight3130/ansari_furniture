import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  Calendar, 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  Filter,
  Sparkles,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const AdminSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'registered' | 'guest'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'email'
  const { addToast } = useToast();

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/subscribers');
      setSubscribers(res.data || []);
    } catch (err) {
      console.error('Failed to load subscribers:', err);
      addToast(err.message || 'Failed to load subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Filter & Search Logic
  const filteredSubscribers = useMemo(() => {
    return subscribers
      .filter((sub) => {
        // Search term filter
        const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          (sub.user?.name && sub.user.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));

        // Type filter
        if (filterType === 'registered') return matchesSearch && !!sub.userId;
        if (filterType === 'guest') return matchesSearch && !sub.userId;
        return matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.subscribedAt) - new Date(a.subscribedAt);
        }
        if (sortBy === 'oldest') {
          return new Date(a.subscribedAt) - new Date(b.subscribedAt);
        }
        if (sortBy === 'email') {
          return a.email.localeCompare(b.email);
        }
        return 0;
      });
  }, [subscribers, searchTerm, filterType, sortBy]);

  // Aggregate Metrics
  const stats = useMemo(() => {
    const total = subscribers.length;
    const registered = subscribers.filter((s) => !!s.userId).length;
    const guests = total - registered;
    const active = subscribers.filter((s) => (s.status || 'active') === 'active').length;
    return { total, registered, guests, active };
  }, [subscribers]);

  const handleExportCSV = () => {
    if (!subscribers.length) return;
    const headers = ['ID', 'Email', 'Status', 'User Type', 'User ID', 'User Name', 'Subscribed At'];
    const rows = subscribers.map((s) => [
      s.id,
      s.email,
      s.status || 'active',
      s.userId ? 'Registered Customer' : 'Guest Visitor',
      s.userId || 'N/A',
      s.user?.name || 'N/A',
      new Date(s.subscribedAt).toISOString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(r => r.map(field => `"${field}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `anzari_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Subscriber list exported successfully as CSV');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#EAE2D9]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.25em] text-[#70482D] uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#70482D]" />
              <span>ADMIN DASHBOARD • AUDIENCE</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2520]">
              Newsletter Subscribers
            </h1>
            <p className="text-xs sm:text-sm text-[#5C564F] mt-1">
              Live Supabase database integration. Inspect registered customers and guest readership subscriptions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubscribers}
              disabled={loading}
              className="px-4 py-2.5 rounded-full border border-[#D5C9BD] bg-white text-[#1F2520] hover:bg-[#F3EDE4] text-xs font-medium flex items-center gap-2 transition-all shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={subscribers.length === 0}
              className="px-4 py-2.5 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] text-xs font-medium flex items-center gap-2 transition-all shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          
          <div className="bg-white rounded-2xl p-5 border border-[#EAE2D9] shadow-xs">
            <div className="flex items-center justify-between text-[#736B63] mb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider">Total Audience</span>
              <div className="w-8 h-8 rounded-full bg-[#F3EDE4] flex items-center justify-center text-[#1F2520]">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#1F2520]">{stats.total}</div>
            <span className="text-[11px] text-[#736B63] mt-1 block">Active journal subscribers</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EAE2D9] shadow-xs">
            <div className="flex items-center justify-between text-[#736B63] mb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider">Registered Users</span>
              <div className="w-8 h-8 rounded-full bg-[#EBF3EC] flex items-center justify-center text-[#2A5235]">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#2A5235]">{stats.registered}</div>
            <span className="text-[11px] text-[#736B63] mt-1 block">Linked to user account (User.id)</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EAE2D9] shadow-xs">
            <div className="flex items-center justify-between text-[#736B63] mb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider">Guest Visitors</span>
              <div className="w-8 h-8 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#70482D]">
                <UserX className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#70482D]">{stats.guests}</div>
            <span className="text-[11px] text-[#736B63] mt-1 block">Guest subscriptions (userId is NULL)</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EAE2D9] shadow-xs">
            <div className="flex items-center justify-between text-[#736B63] mb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider">Active Status</span>
              <div className="w-8 h-8 rounded-full bg-[#EBF3EC] flex items-center justify-center text-[#2A5235]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#1F2520]">100%</div>
            <span className="text-[11px] text-[#736B63] mt-1 block">Active delivery rate</span>
          </div>

        </div>

        {/* Search, Filter & Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE2D9] shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8379]" />
              <input
                type="text"
                placeholder="Search subscribers by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#DED6CC] text-xs text-[#1F2520] placeholder-[#8C8379] focus:outline-none focus:border-[#1F2520] transition-colors"
              />
            </div>

            {/* Filter Tabs & Sorting */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              
              <div className="flex items-center bg-[#FAF7F2] p-1 rounded-full border border-[#DED6CC]">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filterType === 'all'
                      ? 'bg-[#1F2520] text-white shadow-xs'
                      : 'text-[#5C564F] hover:text-[#1F2520]'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilterType('registered')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filterType === 'registered'
                      ? 'bg-[#1F2520] text-white shadow-xs'
                      : 'text-[#5C564F] hover:text-[#1F2520]'
                  }`}
                >
                  Registered ({stats.registered})
                </button>
                <button
                  onClick={() => setFilterType('guest')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filterType === 'guest'
                      ? 'bg-[#1F2520] text-white shadow-xs'
                      : 'text-[#5C564F] hover:text-[#1F2520]'
                  }`}
                >
                  Guests ({stats.guests})
                </button>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#DED6CC]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C8379]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-[#1F2520] focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="email">Email A-Z</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Subscribers Table Card */}
        <div className="bg-white rounded-2xl border border-[#EAE2D9] shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin w-8 h-8 border-2 border-[#1F2520] border-t-transparent rounded-full mb-3" />
              <p className="text-xs text-[#736B63]">Loading subscribers from Supabase...</p>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="py-20 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#8C8379] mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1F2520]">No subscribers match your search</h3>
              <p className="text-xs text-[#736B63] mt-1">Try adjusting your keywords or clearing the filter.</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 rounded-full border border-[#D5C9BD] text-xs font-medium text-[#1F2520] hover:bg-[#FAF7F2]"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#736B63] uppercase tracking-wider text-[10px] font-semibold border-b border-[#EAE2D9]">
                  <tr>
                    <th className="py-3.5 px-6">Subscriber</th>
                    <th className="py-3.5 px-6">Account Status</th>
                    <th className="py-3.5 px-6">Associated User</th>
                    <th className="py-3.5 px-6">Subscription Date</th>
                    <th className="py-3.5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D9]">
                  {filteredSubscribers.map((sub) => {
                    const isRegistered = !!sub.userId;
                    const associatedUser = sub.user;

                    return (
                      <tr key={sub.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        
                        {/* Subscriber Email */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#EAE2D9] flex items-center justify-center text-[#1F2520] font-bold text-xs uppercase">
                              {sub.email.charAt(0)}
                            </div>
                            <div>
                              <span className="font-medium text-[#1F2520] block">{sub.email}</span>
                              <span className="text-[10px] text-[#8C8379] font-mono">ID: {sub.id.slice(0, 8)}...</span>
                            </div>
                          </div>
                        </td>

                        {/* Account Type Badge */}
                        <td className="py-4 px-6">
                          {isRegistered ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EBF3EC] text-[#2A5235] border border-[#2A5235]/20">
                              <UserCheck className="w-3 h-3" />
                              Registered Customer
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F5F0E8] text-[#70482D] border border-[#70482D]/20">
                              <UserX className="w-3 h-3" />
                              Guest Visitor
                            </span>
                          )}
                        </td>

                        {/* Associated User Details */}
                        <td className="py-4 px-6">
                          {isRegistered ? (
                            <div>
                              <div className="font-medium text-[#1F2520]">
                                {associatedUser?.name || 'Customer'}
                              </div>
                              <div className="text-[10px] text-[#736B63] font-mono">
                                UID: {sub.userId?.slice(0, 13)}...
                              </div>
                            </div>
                          ) : (
                            <span className="text-[#8C8379] italic text-[11px]">
                              None (Guest / NULL)
                            </span>
                          )}
                        </td>

                        {/* Subscribed At */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-[#5C564F]">
                            <Calendar className="w-3.5 h-3.5 text-[#8C8379]" />
                            <span>{formatDate(sub.subscribedAt)}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#E8F3EA] text-[#2B5433]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2B5433]" />
                            {sub.status || 'Active'}
                          </span>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EAE2D9] flex items-center justify-between text-xs text-[#736B63]">
            <span>Showing {filteredSubscribers.length} of {subscribers.length} total subscribers</span>
            <span className="text-[11px] text-[#8C8379]">PostgreSQL Foreign Key: NewsletterSubscriber.userId → User.id (ON DELETE SET NULL)</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminSubscribersPage;
