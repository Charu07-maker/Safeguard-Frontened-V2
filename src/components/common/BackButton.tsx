import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  fallbackPath = '/',
  className = '',
  label = 'Back'
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <div className={`flex items-center justify-start ${className}`}>
      <button
        onClick={handleBack}
        type="button"
        className="inline-flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-[#FAF9F6] border border-[#EDECE8] hover:border-slate-300 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-2xs group cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-98"
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-900 group-hover:-translate-x-0.5 transition-transform" />
        <span>{label}</span>
      </button>
    </div>
  );
};
