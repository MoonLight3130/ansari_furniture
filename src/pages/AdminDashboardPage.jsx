import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Search,
  Filter,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const AdminDashboardPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    compareAtPrice: '',
    category: 'Sofas',
    room: 'Living Room',
    collectionName: 'Milano Collection',
    material: 'Solid Teak & Bouclé',
    description: '',
    stock: 15,
    images: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
    featured: false,
    bestseller: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      addToast('Administrator access required.', 'error');
      navigate('/login');
      return;
    }

    if (isAdmin) {
      loadDashboardData();
    }
  }, [user, isAdmin, authLoading]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, productsRes, ordersRes, usersRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/admin/products'),
        api.get('/admin/orders'),
        api.get('/admin/users'),
      ]);
      setAnalytics(analyticsRes.data);
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
      setUsersList(usersRes.data || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      addToast('Failed to load administrative data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price),
        compareAtPrice: newProduct.compareAtPrice ? Number(newProduct.compareAtPrice) : undefined,
        stock: Number(newProduct.stock),
        images: [newProduct.images],
      };
      const res = await api.post('/admin/products', payload);
      setProducts([res.data, ...products]);
      setIsAddModalOpen(false);
      addToast(`Product "${res.data.name}" added to catalog.`);
      setNewProduct({
        name: '',
        price: '',
        compareAtPrice: '',
        category: 'Sofas',
        room: 'Living Room',
        collectionName: 'Milano Collection',
        material: 'Solid Teak & Bouclé',
        description: '',
        stock: 15,
        images: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80',
        featured: false,
        bestseller: false,
      });
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to create product', 'error');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      try {
        await api.delete(`/admin/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        addToast(`Removed "${name}" from inventory.`);
      } catch (err) {
        addToast('Failed to delete product', 'error');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map((o) => (o._id === orderId ? res.data : o)));
      addToast(`Order updated to ${newStatus}`);
    } catch (err) {
      addToast('Failed to update order status', 'error');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#1F2520] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#736B63] font-serif">Loading Administrator Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D9]">
          <div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-[#736B63] uppercase block mb-1">
              MANAGEMENT CONSOLE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F2520]">
              Ansari Atelier Operations
            </h1>
            <p className="text-xs text-[#736B63] mt-0.5">
              Live inventory management, customer orders, and sales performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Furniture</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 pt-6 border-b border-[#EAE2D9] mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Analytics Overview' },
            { id: 'products', label: `Inventory (${products.length})` },
            { id: 'orders', label: `Orders (${orders.length})` },
            { id: 'users', label: `Customers (${usersList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-xs font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? 'text-[#1F2520]' : 'text-[#736B63] hover:text-[#1F2520]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#1F2520]" />
              )}
            </button>
          ))}
        </div>

        {/* 1. Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-[#EAE2D9] shadow-xs">
                <span className="text-xs text-[#736B63] uppercase font-semibold">Total Revenue</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2520] mt-2">
                  ₹{analytics.totalSales?.toLocaleString('en-IN')}
                </h3>
                <span className="text-[11px] text-green-700 font-medium block mt-1">
                  100% Verified Settled
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE2D9] shadow-xs">
                <span className="text-xs text-[#736B63] uppercase font-semibold">Total Orders</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2520] mt-2">
                  {analytics.totalOrders}
                </h3>
                <span className="text-[11px] text-[#736B63] block mt-1">
                  Across all territories
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE2D9] shadow-xs">
                <span className="text-xs text-[#736B63] uppercase font-semibold">Active Catalog</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2520] mt-2">
                  {analytics.totalProducts}
                </h3>
                <span className="text-[11px] text-[#736B63] block mt-1">
                  Bespoke handcrafted designs
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE2D9] shadow-xs">
                <span className="text-xs text-[#736B63] uppercase font-semibold">Registered Clients</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2520] mt-2">
                  {analytics.totalUsers}
                </h3>
                <span className="text-[11px] text-[#736B63] block mt-1">
                  Verified buyers &amp; collectors
                </span>
              </div>
            </div>

            {/* Recent Orders & Low Stock split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Recent Orders (col-span-8) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D9]">
                <h3 className="font-serif text-lg font-semibold text-[#1F2520] mb-4">
                  Recent Orders
                </h3>
                <div className="divide-y divide-[#F4EFEB]">
                  {analytics.recentOrders?.map((ord) => (
                    <div key={ord._id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1F2520] block">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[11px] text-[#736B63]">
                          {ord.customerDetails?.fullName} · {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#1F2520] block">
                          ₹{ord.total?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-[#1F2520]">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Watchlist (col-span-4) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D9]">
                <div className="flex items-center gap-2 mb-4 text-[#7B5E43]">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="font-serif text-lg font-semibold text-[#1F2520]">
                    Stock Watchlist
                  </h3>
                </div>
                {analytics.lowStockProducts?.length === 0 ? (
                  <p className="text-xs text-[#736B63]">All items adequately stocked in warehouse.</p>
                ) : (
                  <div className="space-y-3">
                    {analytics.lowStockProducts?.map((item) => (
                      <div key={item._id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D9]">
                        <span className="font-medium text-[#1F2520] truncate max-w-[170px]">{item.name}</span>
                        <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-md">
                          Only {item.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 2. Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-[#EAE2D9] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#736B63] uppercase tracking-wider border-b border-[#EAE2D9]">
                  <tr>
                    <th className="p-4">Piece</th>
                    <th className="p-4">Space / Room</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Tags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D9]">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.images?.[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover bg-white shrink-0 border border-[#EAE2D9]"
                        />
                        <div>
                          <span className="font-serif font-bold text-sm text-[#1F2520] block">{p.name}</span>
                          <span className="text-[11px] text-[#736B63]">{p.category}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#5C564F]">{p.room}</td>
                      <td className="p-4 font-bold text-[#1F2520]">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-semibold ${
                          p.stock <= 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5">
                          {p.bestseller && (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                              Bestseller
                            </span>
                          )}
                          {p.featured && (
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                          className="text-red-500 hover:text-red-700 p-1.5 transition-colors"
                          title="Delete piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#EAE2D9] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#736B63] uppercase tracking-wider border-b border-[#EAE2D9]">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D9]">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#1F2520]">{ord.orderNumber}</td>
                      <td className="p-4">
                        <span className="font-semibold text-[#1F2520] block">{ord.customerDetails?.fullName}</span>
                        <span className="text-[11px] text-[#736B63]">{ord.customerDetails?.phone}</span>
                      </td>
                      <td className="p-4 text-[#5C564F]">
                        {ord.shippingAddress?.city}, {ord.shippingAddress?.state}
                      </td>
                      <td className="p-4 text-[#5C564F]">
                        {ord.items?.length} items ({ord.items?.map((i) => i.name).join(', ')})
                      </td>
                      <td className="p-4 font-bold text-[#1F2520]">₹{ord.total?.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F2] border border-[#DED6CC] text-[#1F2520] focus:outline-none cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-[#EAE2D9] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#736B63] uppercase tracking-wider border-b border-[#EAE2D9]">
                  <tr>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Member Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE2D9]">
                  {usersList.map((u) => (
                    <tr key={u._id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="p-4 font-bold text-[#1F2520]">{u.name}</td>
                      <td className="p-4 text-[#5C564F]">{u.email}</td>
                      <td className="p-4 text-[#5C564F]">{u.phone || '—'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-[#736B63]">
                        {new Date(u.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE2D9] z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EAE2D9] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1F2520]">Add New Furniture Piece</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#736B63] hover:text-[#1F2520]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Piece Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sylvan Minimalist Bookshelf"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="34999"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Compare At Price (₹)</label>
                  <input
                    type="number"
                    placeholder="42000"
                    value={newProduct.compareAtPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, compareAtPrice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Room</label>
                  <select
                    value={newProduct.room}
                    onChange={(e) => setNewProduct({ ...newProduct, room: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining Room">Dining Room</option>
                    <option value="Home Office">Home Office</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none"
                  >
                    <option value="Sofas">Sofas</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Tables">Tables</option>
                    <option value="Beds">Beds</option>
                    <option value="Storage">Storage</option>
                    <option value="Lighting">Lighting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Material Details</label>
                <input
                  type="text"
                  placeholder="e.g. Solid American White Oak & Brass"
                  value={newProduct.material}
                  onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.images}
                  onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2D2A26] block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe dimensions, upholstery weave, and finish..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.bestseller}
                    onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })}
                    className="accent-[#1F2520]"
                  />
                  <span>Mark as Bestseller</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                    className="accent-[#1F2520]"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#1F2520] text-white hover:bg-[#2A352C] transition-all text-xs font-medium"
              >
                Publish to Ansari Catalog
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
