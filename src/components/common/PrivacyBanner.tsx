import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="bg-stone-900 text-stone-100 py-2 px-4 rounded-2xl mb-6 shadow-xs border border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs gap-2 md:gap-6">
        <div className="flex items-center space-x-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white font-semibold">100% Confidential & Browser-Local:</strong> Your entries remain stored in local browser memory and are never transmitted to external servers.
          </span>
        </div>
        <div className="flex items-center space-x-4 text-stone-400 shrink-0">
          <span className="flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Encrypted Local State</span>
          </span>
          <span className="flex items-center space-x-1">
            <EyeOff className="w-3.5 h-3.5 text-stone-400" />
            <span>No Cookies / Tracking</span>
          </span>
        </div>
      </div>
    </div>
  );
};
