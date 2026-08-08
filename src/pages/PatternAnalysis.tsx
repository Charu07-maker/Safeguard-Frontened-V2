import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Repeat,
  Info,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  PieChart,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { AIInsight } from '../components/common/AIInsight';
import { BackButton } from '../components/common/BackButton';

// Fictional 6-month spending data
const SPENDING_DATA = [
  { month: 'Nov 2025', spending: 28400, withdrawals: 12000 },
  { month: 'Dec 2025', spending: 35200, withdrawals: 18500 },
  { month: 'Jan 2026', spending: 30100, withdrawals: 14000 },
  { month: 'Feb 2026', spending: 31800, withdrawals: 20000 },
  { month: 'Mar 2026', spending: 38500, withdrawals: 22000 },
  { month: 'Apr 2026', spending: 31800, withdrawals: 19500 },
];

export const PatternAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; spending: number } | null>(null);

  const handleContinue = () => {
    addToast({
      title: 'Proceeding to Private Questionnaire',
      description: 'Your pattern analysis summary has been reviewed.',
      type: 'info',
    });
    navigate('/questionnaire');
  };

  const handleSkipQuestionnaire = () => {
    addToast({
      title: 'Questionnaire Skipped',
      description: 'Navigating directly to your final reflection report.',
      type: 'info',
    });
    navigate('/results');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in py-4 sm:py-6">
      <BackButton fallbackPath="/financial-data" />
      {/* HEADER */}
      <div className="space-y-3 border-b border-[#EDECE8] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-700">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Assisted Analysis</span>
          </div>

          <span className="px-3 py-1 bg-stone-100 text-slate-700 border border-stone-200 rounded-full text-xs font-bold uppercase tracking-wider">
            Informational analysis
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
          Financial pattern overview
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl leading-relaxed">
          Here are patterns identified in the information you provided. All findings are purely observational to support your voluntary personal reflection.
        </p>
      </div>

      {/* SUMMARY CARDS (4 cards with fictional data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-[#EDECE8] rounded-[20px] p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block">
            Transactions analyzed
          </span>
          <div className="text-2xl font-extrabold text-[#1A1A1A]">184</div>
          <span className="text-[10px] text-slate-400">Past 6 months</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#EDECE8] rounded-[20px] p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block">
            Monthly income
          </span>
          <div className="text-2xl font-extrabold text-indigo-600">₹45,000</div>
          <span className="text-[10px] text-slate-400">Regular payroll credit</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#EDECE8] rounded-[20px] p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block">
            Average monthly spending
          </span>
          <div className="text-2xl font-extrabold text-[#1A1A1A]">₹31,800</div>
          <span className="text-[10px] text-slate-400">70.6% income utilization</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#EDECE8] rounded-[20px] p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block">
            Patterns identified
          </span>
          <div className="text-2xl font-extrabold text-amber-600">3</div>
          <span className="text-[10px] text-slate-400">Signals for reflection</span>
        </div>
      </div>

      {/* SPENDING TREND LINE CHART */}
      <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#EDECE8] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">Monthly spending trend</h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              6-month historical spending trajectory based on provided sample data
            </p>
          </div>
          {hoveredPoint && (
            <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-700 animate-fade-in">
              {hoveredPoint.month}: ₹{hoveredPoint.spending.toLocaleString('en-IN')}
            </div>
          )}
        </div>

        {/* SVG Interactive Line Chart */}
        <div className="relative pt-6 pb-2">
          <div className="h-44 w-full flex items-end justify-between gap-2 relative">
            {/* Background horizontal gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-300 w-full"></div>
              <div className="border-b border-slate-300 w-full"></div>
              <div className="border-b border-slate-300 w-full"></div>
            </div>

            {/* SVG Line & Points */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="spendingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Polygon Fill */}
              <polygon
                points="0,150 0,90 100,30 200,70 300,50 400,10 500,50 500,150"
                fill="url(#spendingGrad)"
              />
              {/* Polyline */}
              <polyline
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,90 100,30 200,70 300,50 400,10 500,50"
              />
            </svg>

            {/* Interactive Circles / Data Points */}
            {SPENDING_DATA.map((d, idx) => {
              // Y position mapping (min ~28000 -> y=90, max ~38500 -> y=10)
              const percents = [40, 80, 50, 65, 95, 65];
              return (
                <div
                  key={d.month}
                  onMouseEnter={() => setHoveredPoint({ month: d.month, spending: d.spending })}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="flex-1 flex flex-col items-center justify-end h-full z-10 group cursor-pointer"
                >
                  <div className="relative flex flex-col items-center mb-2">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md mb-1 whitespace-nowrap shadow-md pointer-events-none">
                      ₹{d.spending.toLocaleString('en-IN')}
                    </div>
                    {/* Point Circle */}
                    <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 group-hover:scale-125 group-hover:bg-indigo-600 transition-all shadow-xs"></div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 mt-2">{d.month.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* WITHDRAWAL PATTERN & TRANSFER PATTERN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WITHDRAWAL PATTERN VISUALIZATION */}
        <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-xs space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Cash withdrawal pattern</h3>
              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Observation
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              Several months show higher-than-usual cash withdrawals.
            </p>
          </div>

          {/* Bar chart representation */}
          <div className="space-y-2 pt-2">
            {SPENDING_DATA.map((d) => {
              const maxW = 25000;
              const pct = Math.min(100, Math.round((d.withdrawals / maxW) * 100));
              const isHigh = d.withdrawals >= 19000;
              return (
                <div key={d.month} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">{d.month}</span>
                    <span className={`font-mono font-bold ${isHigh ? 'text-amber-700' : 'text-slate-700'}`}>
                      ₹{d.withdrawals.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? 'bg-amber-500' : 'bg-indigo-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-[#9CA3AF] italic pt-2 border-t border-[#EDECE8]">
            Note: Cash withdrawals are logged neutrally. High cash usage can occur for routine daily expenditures.
          </p>
        </div>

        {/* TRANSFER PATTERN CARD */}
        <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Repeat className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Recurring transfers</h3>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Fixed Outflow
              </span>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#EDECE8] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Identified Transfer</span>
                  <span className="text-base font-extrabold text-slate-900">₹8,500 recurring transfer</span>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-100">
                  Detected 5 times
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#EDECE8]">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Frequency</span>
                  <span className="font-semibold text-slate-700">Monthly (1st)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Monthly Trend</span>
                  <span className="font-semibold text-slate-700">Consistent outflow</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed font-medium">
            This pattern may be worth reviewing with your personal context.
          </div>
        </div>
      </div>

      {/* AI INSIGHT LAYER */}
      <AIInsight
        pattern="ATM withdrawals increased significantly over the last three months."
        context="You also indicated that you sometimes have limited access to money."
        interpretation="Together, these signals may be worth reviewing as part of your financial autonomy."
        limitation="These signals cannot establish intent, coercion or financial abuse."
        patternConfidence="High"
        confidenceExplanation="The transaction pattern is clearly present in the supplied data."
        whyAmISeeingThis="Safeguard correlates identified transaction anomalies (like cash withdrawal spikes) with optional answers provided during private reflection."
        whatDataDoesNotTellMe="Transaction lists cannot determine intent, verbal agreements, or why funds were withdrawn. Only you know your personal circumstances."
      />

      {/* THREE DETAILED PATTERN CARDS */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#1A1A1A]">Identified Pattern Details</h3>

        {/* CARD 1 */}
        <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDECE8] pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                Pattern 01
              </span>
              <h4 className="text-lg font-bold text-slate-900">Frequent cash withdrawals</h4>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-100">
              High Confidence Pattern
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Observed Pattern</h5>
              <p className="text-sm text-slate-800 font-medium leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#EDECE8]">
                ATM withdrawals occurred within 24 hours of monthly income deposits during 4 of the last 6 months.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Why it may matter</h5>
              <p className="text-sm text-slate-600 leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#EDECE8]">
                Immediate cash conversion reduces digital traceability and can limit independent access to emergency digital reserves.
              </p>
            </div>
          </div>

          {/* Visually emphasized "What this cannot tell us" */}
          <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>What this cannot tell us</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              The transaction record does not indicate whether these withdrawals were voluntary.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDECE8] pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                Pattern 02
              </span>
              <h4 className="text-lg font-bold text-slate-900">Income withdrawn shortly after deposit</h4>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
              Moderate Signal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Observed Pattern</h5>
              <p className="text-sm text-slate-800 font-medium leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#EDECE8]">
                Substantial proportion (40%+) of primary income transferred or withdrawn within 48 hours of credit.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Why it may matter</h5>
              <p className="text-sm text-slate-600 leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#EDECE8]">
                Rapid depletion of primary accounts leaves minimal independent operating buffer for personal choices.
              </p>
            </div>
          </div>

          {/* Visually emphasized "What this cannot tell us" */}
          <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>What this cannot tell us</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              The data cannot confirm whether this outflow pays for joint household expenses, savings, or external obligations.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDECE8] pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                Pattern 03
              </span>
              <h4 className="text-lg font-bold text-slate-900">Recent change in spending behavior</h4>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
              Moderate Signal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Observed Pattern</h5>
              <p className="text-sm text-slate-800 font-medium leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#EDECE8]">
                25% decrease in personal debit transactions alongside a 60% increase in third-party online transfers over 90 days.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Why it may matter</h5>
              <p className="text-sm text-slate-600 leading-relaxed bg-[#FAF9F6] p-4 rounded-xl border border-[#EDECE8]">
                Shifting spending channels can signal reduced direct decision-making power over day-to-day household purchases.
              </p>
            </div>
          </div>

          {/* Visually emphasized "What this cannot tell us" */}
          <div className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>What this cannot tell us</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              A shift in spending channels can be a normal budgeting decision or mutual agreement between family members.
            </p>
          </div>
        </div>
      </div>

      {/* AI EXPLANATION SECTION */}
      <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-[#1A1A1A]">How Safeguard interprets patterns</h4>
        </div>

        <p className="text-sm text-[#6B7280] leading-relaxed pl-9">
          Patterns are signals, not conclusions. Financial transactions alone cannot tell us why a transaction happened or whether someone was pressured.
        </p>
      </div>

      {/* BOTTOM NAVIGATION ACTIONS */}
      <div className="pt-6 border-t border-[#EDECE8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/financial-data')}
          className="px-5 py-3 bg-white hover:bg-stone-50 text-slate-700 font-bold text-xs rounded-xl border border-[#EDECE8] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleSkipQuestionnaire}
            className="px-6 py-3.5 bg-white hover:bg-stone-50 text-slate-700 font-bold text-xs rounded-xl border border-[#EDECE8] transition-all flex items-center justify-center space-x-1 cursor-pointer"
          >
            <span>Skip questionnaire</span>
          </button>

          <button
            onClick={handleContinue}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Continue to private questions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatternAnalysis;
