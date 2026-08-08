import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  Eye,
  EyeOff,
  Menu,
  X,
  UserCheck,
  ArrowRight,
  Lock,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useSafeguard } from '../../context/SafeguardContext';
import { useToast } from '../../context/ToastContext';
import { QuickExitButton } from './QuickExitButton';

export const Navbar: React.FC = () => {
  const { discreetMode, toggleDiscreetMode, isDemoMode, resetDemo } = useSafeguard();
  const { addToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetDemo = () => {
    resetDemo();
    addToast({
      title: 'Demo Reset',
      description: 'Restored standard clean state.',
      type: 'info',
    });
    navigate('/');
  };

  return (
    <>
      {isDemoMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-900 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-950 font-extrabold text-[10px] uppercase tracking-wider shrink-0">
                Demo Mode
              </span>
              <span className="font-semibold text-amber-900/90 truncate">
                Demo data — fictional (Maya Sharma, ₹45,000 income, 6 months)
              </span>
            </div>
            <button
              onClick={handleResetDemo}
              className="inline-flex items-center space-x-1 font-bold text-amber-950 hover:text-amber-800 underline decoration-amber-500/40 cursor-pointer text-xs shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset demo</span>
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#EDECE8] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Safeguard Logo & Icon */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
                <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                {discreetMode ? 'Personal Ledger' : 'Safeguard'}
              </span>
            </NavLink>

            {/* Middle Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                How it works
              </button>
              <button
                onClick={() => handleNavClick('privacy')}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Privacy
              </button>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                Resources
              </NavLink>
              <NavLink
                to="/assessment"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                Assessment
              </NavLink>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDiscreetMode}
                title={discreetMode ? 'Switch branding back' : 'Activate discreet mode'}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-[#FAF9F6] border border-[#EDECE8] transition-colors text-xs flex items-center space-x-1"
              >
                {discreetMode ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4" />}
                <span className="hidden xl:inline text-xs font-medium">
                  {discreetMode ? 'Discreet' : 'Discreet'}
                </span>
              </button>

              <QuickExitButton compact />

              <button
                onClick={() => setShowSignInModal(true)}
                className="hidden sm:inline-flex px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-[#FAF9F6] rounded-xl transition-colors cursor-pointer"
              >
                Sign in
              </button>

              <NavLink to="/assessment">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-transform active:scale-[0.98] shadow-sm flex items-center space-x-1.5 cursor-pointer">
                  <span>Start privately</span>
                </button>
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-stone-100 border border-[#EDECE8]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EDECE8] bg-white px-6 pt-4 pb-6 space-y-3 animate-slide-down shadow-lg">
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="block w-full text-left py-2 text-base font-semibold text-slate-800 border-b border-stone-100"
            >
              How it works
            </button>
            <button
              onClick={() => handleNavClick('privacy')}
              className="block w-full text-left py-2 text-base font-semibold text-slate-800 border-b border-stone-100"
            >
              Privacy
            </button>
            <NavLink
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 border-b border-stone-100"
            >
              Resources
            </NavLink>
            <NavLink
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 border-b border-stone-100"
            >
              Assessment
            </NavLink>
            <NavLink
              to="/financial-data"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 border-b border-stone-100"
            >
              Financial Pattern Scanner
            </NavLink>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSignInModal(true);
                }}
                className="w-full py-2.5 text-slate-700 font-semibold border border-[#EDECE8] rounded-xl text-center text-sm"
              >
                Sign in
              </button>
              <NavLink to="/assessment" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-center text-sm">
                  Start privately
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Local Confidential Session / Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[24px] border border-[#EDECE8] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <button
                onClick={() => setShowSignInModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Private Session Active</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Safeguard does not require an email or cloud account. Your assessment state and uploaded sample records stay 100% inside your local browser memory.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#EDECE8] text-xs text-slate-600 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-900 font-semibold">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Anonymous Anonymous ID: #SAFE-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <p>You can clear all local records anytime in Settings or click Quick Exit.</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowSignInModal(false);
                  navigate('/dashboard');
                }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-transform active:scale-[0.98] cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => setShowSignInModal(false)}
                className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

