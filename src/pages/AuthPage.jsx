import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User as UserIcon, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/account');
      }
    } else {
      const res = await register(formData);
      if (res.success) {
        navigate('/account');
      }
    }
    setLoading(false);
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setFormData({
        name: 'Ansari Administrator',
        email: 'admin@ansarifurniture.com',
        password: 'admin123',
        phone: '+91 98765 43210',
      });
      setIsLogin(true);
    } else {
      setFormData({
        name: 'Aanya Sharma',
        email: 'aanya@example.com',
        password: 'customer123',
        phone: '+91 98123 45678',
      });
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE2D9] shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center group">
            <span className="font-serif text-3xl font-semibold tracking-tight text-[#1F2520]">
              Ansari
            </span>
            <span className="text-[9px] tracking-[0.3em] font-medium text-[#736B63] uppercase">
              F U R N I T U R E
            </span>
          </Link>
          <p className="text-xs text-[#736B63] mt-2">
            {isLogin ? 'Sign in to your client sanctuary' : 'Create an account to curate your home'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-full bg-[#FAF7F2] p-1 border border-[#EAE2D9] mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
              isLogin ? 'bg-white text-[#1F2520] shadow-xs' : 'text-[#736B63] hover:text-[#1F2520]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
              !isLogin ? 'bg-white text-[#1F2520] shadow-xs' : 'text-[#736B63] hover:text-[#1F2520]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-[#2D2A26] block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Aanya Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-[#2D2A26] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#2D2A26] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-[#2D2A26] block mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DED6CC] text-xs focus:outline-none focus:border-[#1F2520]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#1F2520] text-[#FAF7F2] hover:bg-[#2A352C] transition-all text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-md disabled:opacity-60 mt-2"
          >
            <span>{loading ? 'Processing...' : isLogin ? 'Sign In to Account' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Logins for Testing */}
        <div className="mt-8 pt-6 border-t border-[#EAE2D9] text-center">
          <p className="text-[11px] font-medium text-[#736B63] uppercase tracking-wider mb-2.5">
            Quick Fill Demo Profiles
          </p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="px-3 py-1.5 rounded-lg border border-[#DED6CC] bg-[#FAF7F2] hover:bg-white text-[11px] font-semibold text-[#1F2520] transition-colors"
            >
              Admin (admin@ansarifurniture.com)
            </button>
            <button
              type="button"
              onClick={() => fillDemo('customer')}
              className="px-3 py-1.5 rounded-lg border border-[#DED6CC] bg-[#FAF7F2] hover:bg-white text-[11px] font-semibold text-[#1F2520] transition-colors"
            >
              Customer (aanya@example.com)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
