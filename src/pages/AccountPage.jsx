import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, User, MapPin, Heart, LogOut, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const AccountPage = () => {
  const { user, logout, isAdmin, updateProfile } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Profile Edit form
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/myorders');
        setOrders(res.data || []);
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfile({ name, phone });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#EAE2D9]">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase block mb-1">
              CLIENT PORTAL
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520]">
              Welcome, {user.name}
            </h1>
            <p className="text-xs text-[#736B63] mt-1 font-light">
              Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-full bg-[#2A352C] text-white text-xs font-medium hover:bg-[#1F2520] transition-colors"
              >
                Go to Admin Dashboard
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DED6CC] text-xs font-medium text-[#736B63] hover:text-[#1F2520] hover:bg-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Layout with Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          
          {/* Navigation Tabs (col-span-3) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-[#EAE2D9] space-y-1">
            {[
              { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
              { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
              { id: 'profile', label: 'Profile Details', icon: User },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#1F2520] text-white'
                      : 'text-[#5C564F] hover:bg-[#FAF7F2] hover:text-[#1F2520]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#EAE2D9] text-[#1F2520]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content (col-span-9) */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D9]">
            
            {/* 1. Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-[#1F2520]">Order History</h3>
                
                {loadingOrders ? (
                  <div className="py-8 text-center text-xs text-[#736B63]">Loading your orders...</div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <Package className="w-10 h-10 text-[#8C8379] mx-auto" />
                    <p className="text-xs text-[#736B63]">You have not placed any orders yet.</p>
                    <Link
                      to="/shop"
                      className="inline-block px-6 py-2.5 rounded-full bg-[#1F2520] text-white text-xs font-medium"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="rounded-2xl border border-[#EAE2D9] p-5 bg-[#FAF7F2]/50 space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2D9] pb-3">
                          <div>
                            <span className="font-mono text-xs font-bold text-[#1F2520]">{order.orderNumber}</span>
                            <span className="text-[11px] text-[#736B63] block">
                              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="font-serif text-base font-bold text-[#1F2520]">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-[#EAE2D9]/60">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-2.5 flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-xl object-cover bg-white"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-serif text-xs font-semibold text-[#1F2520] truncate">
                                  {item.name}
                                </h4>
                                <span className="text-[11px] text-[#736B63]">
                                  Qty: {item.quantity} · {item.color || 'Standard'}
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-[#1F2520]">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.trackingCode && (
                          <div className="text-[11px] text-[#2A352C] bg-[#EAE2D9]/40 p-2.5 rounded-xl flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>White Glove Delivery Tracking: <strong>{order.trackingCode}</strong></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-[#1F2520]">Saved Furniture ({wishlist.length})</h3>
                {wishlist.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#736B63] space-y-3">
                    <Heart className="w-10 h-10 text-[#8C8379] mx-auto" />
                    <p>You haven't saved any pieces yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => {
                      const prod = typeof item === 'object' ? item : null;
                      if (!prod) return null;
                      return (
                        <div key={prod._id} className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D9] flex gap-4 items-center">
                          <img
                            src={prod.images?.[0]}
                            alt={prod.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-xs font-semibold text-[#1F2520] truncate">{prod.name}</h4>
                            <span className="text-xs font-bold text-[#1F2520] block mt-0.5">₹{prod.price?.toLocaleString('en-IN')}</span>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => addToCart(prod, 1)}
                                className="px-3 py-1 bg-[#1F2520] text-white text-[10px] rounded-full font-medium"
                              >
                                Add to Bag
                              </button>
                              <button
                                onClick={() => toggleWishlist(prod)}
                                className="text-[10px] text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 3. Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-md">
                <h3 className="font-serif text-xl font-semibold text-[#1F2520]">Personal Information</h3>
                <div>
                  <label className="text-xs font-medium text-[#2D2A26] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2D2A26] block mb-1">Email (Cannot be changed)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] bg-[#FAF7F2] text-xs text-[#736B63]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2D2A26] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1F2520] text-white text-xs font-medium hover:bg-[#2A352C] transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* 4. Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#1F2520]">Saved Delivery Addresses</h3>
                {user.addresses && user.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-[#EAE2D9] bg-[#FAF7F2] space-y-1 text-xs">
                        <span className="font-bold text-[#1F2520] block">{addr.fullName}</span>
                        <p className="text-[#5C564F]">{addr.street}</p>
                        <p className="text-[#5C564F]">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-[#736B63] pt-1">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#736B63]">No addresses saved yet. Addresses are saved automatically upon checkout.</p>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountPage;
