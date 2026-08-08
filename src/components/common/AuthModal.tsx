import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, Key, X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSafeguard } from '../../context/SafeguardContext';
import { useToast } from '../../context/ToastContext';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    closeAuthModal,
    authModalTab,
    login,
    signup,
    authRedirectTarget,
  } = useSafeguard();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(authModalTab || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(authModalTab || 'login');
    setErrorMessage('');
  }, [authModalTab, showAuthModal]);

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      if (activeTab === 'login') {
        const res = login(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Login failed. Please check your credentials.');
          setLoading(false);
          return;
        }
        addToast({
          title: 'Welcome Back',
          description: 'Logged in successfully.',
          type: 'success',
        });
      } else {
        const res = signup(email, password, name);
        if (!res.success) {
          setErrorMessage(res.error || 'Account creation failed.');
          setLoading(false);
          return;
        }
        addToast({
          title: 'Account Created',
          description: 'Your confidential account is ready.',
          type: 'success',
        });
      }

      setLoading(false);
      closeAuthModal();

      // Redirect as required
      const target = authRedirectTarget || '/dashboard';
      navigate(target);
    }, 400);
  };

  const fillDemoCredentials = () => {
    setEmail('user@example.com');
    setPassword('password123');
    if (activeTab === 'signup') {
      setName('Demo User');
    }
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-[28px] border border-[#EDECE8] shadow-2xl z-10 overflow-hidden transform transition-all animate-scale-up space-y-6 p-6 sm:p-8">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600" />

        {/* Header */}
        <div className="flex items-start justify-between pt-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {activeTab === 'login' ? 'Log in to Safeguard' : 'Create an Account'}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {activeTab === 'login'
                  ? 'Access your private account & financial dashboard'
                  : 'Start your confidential financial autonomy journey'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-stone-100 transition-colors"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-indigo-950 shadow-xs border border-stone-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-white text-indigo-950 shadow-xs border border-stone-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-semibold leading-relaxed animate-fade-in">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Full Name (Optional)
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Maya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#EDECE8] rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#EDECE8] rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Password
              </label>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-[#EDECE8] rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-60 mt-2"
          >
            <span>
              {loading
                ? 'Authenticating...'
                : activeTab === 'login'
                ? 'Log in to Account'
                : 'Create Confidential Account'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Helper Button */}
        <div className="pt-2 border-t border-[#EDECE8] flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
          >
            Auto-fill demo credentials
          </button>
          <div className="flex items-center space-x-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted locally</span>
          </div>
        </div>
      </div>
    </div>
  );
};
