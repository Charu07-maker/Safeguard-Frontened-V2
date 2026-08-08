import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  ClipboardList,
  FileCheck,
  BookOpen,
  ShieldCheck,
  Settings,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Info,
  Clock,
  User,
  Shield,
  Lock,
} from 'lucide-react';
import { useSafeguard } from '../context/SafeguardContext';
import { AIInsight } from '../components/common/AIInsight';
import { BackButton } from '../components/common/BackButton';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { discreetMode, questionnaireAnswers, transactions } = useSafeguard();

  // Dynamic status checks if user has filled data
  const hasPatterns = transactions.length > 0;
  const hasQuestionnaire = Object.keys(questionnaireAnswers).length > 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col md:flex-row w-full min-w-0 overflow-x-hidden">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r border-[#EDECE8] flex flex-col justify-between shrink-0 p-5 space-y-8">
        <div className="space-y-8">
          {/* Safeguard Logo */}
          <NavLink to="/" className="flex items-center space-x-3 px-2 py-1 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              {discreetMode ? 'Personal Ledger' : 'Safeguard'}
            </span>
          </NavLink>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </NavLink>

            <NavLink
              to="/pattern-analysis"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                }`
              }
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Financial patterns</span>
            </NavLink>

            <NavLink
              to="/questionnaire"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                }`
              }
            >
              <ClipboardList className="w-4 h-4 shrink-0" />
              <span>Private assessment</span>
            </NavLink>

            <NavLink
              to="/results"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                }`
              }
            >
              <FileCheck className="w-4 h-4 shrink-0" />
              <span>Results</span>
            </NavLink>

            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                }`
              }
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Resources</span>
            </NavLink>

            <NavLink
              to="/settings/privacy"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                }`
              }
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Privacy</span>
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Bottom Nav */}
        <div className="pt-4 border-t border-[#EDECE8] space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
              }`
            }
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/resources"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-stone-50 transition-all"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Help</span>
          </NavLink>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-w-0">
        {/* TOP BAR */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#EDECE8] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-extrabold text-[#1A1A1A] tracking-tight">
              Welcome back
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Privacy Status Indicator */}
            <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Local Session Active</span>
            </div>

            {/* Settings Link */}
            <NavLink
              to="/settings"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-stone-100 border border-[#EDECE8] transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </NavLink>

            {/* Profile / Avatar */}
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-bold text-xs">
              S
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main className="p-6 sm:p-8 max-w-5xl w-full mx-auto space-y-8">
          <BackButton fallbackPath="/" />
          {/* MAIN HERO */}
          <div className="bg-white border border-[#EDECE8] rounded-[28px] p-6 sm:p-8 shadow-xs space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600"></div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              Your financial wellbeing, at a glance.
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Review patterns, complete your assessment, or manage your data.
            </p>
          </div>

          {/* QUICK ACTIONS (Three cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => navigate('/assessment')}
              className="bg-white border border-[#EDECE8] rounded-[22px] p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  Start assessment
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Reflect on financial access and decision-making questions safely.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-indigo-600 space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => navigate('/pattern-analysis')}
              className="bg-white border border-[#EDECE8] rounded-[22px] p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  Review financial patterns
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Analyze optional transactions for withdrawal or balance anomalies.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-indigo-600 space-x-1 group-hover:translate-x-1 transition-transform">
                <span>View patterns</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => navigate('/resources')}
              className="bg-white border border-[#EDECE8] rounded-[22px] p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  Explore resources
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Access confidential support directories, safety plans, and legal information.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-indigo-600 space-x-1 group-hover:translate-x-1 transition-transform">
                <span>Browse resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* GRID SECTION: ASSESSMENT STATUS & FINANCIAL OVERVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ASSESSMENT STATUS PROGRESS CARD */}
            <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Your assessment</h3>
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    75%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                  <div className="bg-indigo-600 h-2 rounded-full w-[75%] transition-all duration-500"></div>
                </div>

                {/* Steps Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs p-2.5 bg-[#FAF9F6] rounded-xl border border-[#EDECE8]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Financial patterns</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                      Completed
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 bg-[#FAF9F6] rounded-xl border border-[#EDECE8]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Private questions</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                      Completed
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="flex items-center space-x-2">
                      <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-600">Review results</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/results')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* FINANCIAL OVERVIEW */}
            <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Financial Overview</h3>
                  <span className="text-[11px] text-slate-400 italic">Optional Data</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#FAF9F6] border border-[#EDECE8] rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Monthly spending
                    </span>
                    <div className="text-lg font-extrabold text-slate-900">₹31,800</div>
                  </div>

                  <div className="bg-[#FAF9F6] border border-[#EDECE8] rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Recurring transfers
                    </span>
                    <div className="text-lg font-extrabold text-slate-900">3</div>
                  </div>

                  <div className="bg-[#FAF9F6] border border-[#EDECE8] rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Patterns identified
                    </span>
                    <div className="text-lg font-extrabold text-indigo-700">3</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-slate-500 font-medium text-center">
                Based on optional sample/ uploaded data
              </div>
            </div>
          </div>

          {/* INSIGHT CARD (AI-assisted explanation layer) */}
          <AIInsight
            pattern="ATM withdrawals increased significantly over the last three months."
            context="You also indicated that you sometimes have limited access to money."
            interpretation="Together, these signals may be worth reviewing as part of your financial autonomy."
            limitation="These signals cannot establish intent, coercion or financial abuse."
            patternConfidence="High"
            confidenceExplanation="The transaction pattern is clearly present in the supplied data."
            whyAmISeeingThis="Safeguard correlates identified transaction anomalies (like cash withdrawal spikes) with optional answers provided during your private reflection."
            whatDataDoesNotTellMe="Transaction lists cannot establish intent, verbal agreements, or why funds were withdrawn. Only you know your personal circumstances."
          />

          {/* RECENT ACTIVITY */}
          <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#EDECE8] pb-3">
              <Clock className="w-4 h-4 text-indigo-600" />
              <h3 className="text-lg font-bold text-[#1A1A1A]">Recent Activity</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-3 bg-[#FAF9F6] rounded-xl border border-[#EDECE8]">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-bold text-slate-900">Assessment completed</span>
                </div>
                <span className="text-slate-400">Today, 10:24 AM</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 bg-[#FAF9F6] rounded-xl border border-[#EDECE8]">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="font-bold text-slate-900">Financial data analyzed</span>
                </div>
                <span className="text-slate-400">Yesterday, 3:15 PM</span>
              </div>

              <div className="flex items-center justify-between text-xs p-3 bg-[#FAF9F6] rounded-xl border border-[#EDECE8]">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="font-bold text-slate-900">Privacy settings updated</span>
                </div>
                <span className="text-slate-400">3 days ago</span>
              </div>
            </div>
          </div>

          {/* BOTTOM PRIVACY REMINDER */}
          <div className="text-center pt-2">
            <p className="text-xs text-[#9CA3AF] font-medium">
              You control what information you share.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
