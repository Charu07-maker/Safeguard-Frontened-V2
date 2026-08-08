import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  Shield,
  X,
  CheckCircle2,
  Upload,
  Sparkles,
  FileText,
  ArrowRight,
  ArrowLeft,
  Lock,
  Info,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RadioOption } from '../components/ui/RadioOption';
import { useSafeguard } from '../context/SafeguardContext';
import { useToast } from '../context/ToastContext';
import { BackButton } from '../components/common/BackButton';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    value: string;
    title: string;
    description: string;
    weight: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1_account_access',
    title: 'How are your primary bank accounts structured and accessed?',
    subtitle: 'Select the option that best reflects your current day-to-day login access.',
    options: [
      {
        value: 'opt_independent',
        title: 'Full Independent Access',
        description: 'You have individual logins, private passwords, and full unmonitored online banking access.',
        weight: 0,
      },
      {
        value: 'opt_shared_transparent',
        title: 'Shared Accounts with Mutual Access',
        description: 'Joint accounts where both parties have individual logins and equal visibility into balance details.',
        weight: 1,
      },
      {
        value: 'opt_monitored_approval',
        title: 'Monitored Access or Shared Passwords',
        description: 'Accounts where your logins are shared, monitored, or password reset emails go to someone else.',
        weight: 3,
      },
      {
        value: 'opt_restricted_no_access',
        title: 'Restricted or No Direct Digital Access',
        description: 'You do not have online passwords or card access to primary household or joint bank accounts.',
        weight: 4,
      },
    ],
  },
  {
    id: 'q2_spending_autonomy',
    title: 'How are everyday personal and household spending decisions handled?',
    subtitle: 'Reflect on whether small or moderate purchases require prior permission.',
    options: [
      {
        value: 'opt_full_freedom',
        title: 'Full Individual Discretion',
        description: 'You can make personal purchases under reasonable thresholds without asking or feeling audited.',
        weight: 0,
      },
      {
        value: 'opt_mutual_budget',
        title: 'Agreed Mutual Budget',
        description: 'Large purchases above an agreed threshold are discussed together, but personal allowances exist.',
        weight: 1,
      },
      {
        value: 'opt_frequent_scrutiny',
        title: 'Frequent Justification Required',
        description: 'You are regularly asked to justify basic daily expenses, receipts, or small purchases.',
        weight: 3,
      },
      {
        value: 'opt_strict_allowance',
        title: 'Strict Allowance or Full Approval Required',
        description: 'All funds are strictly controlled by another person, and you must ask for an allowance or permission.',
        weight: 4,
      },
    ],
  },
  {
    id: 'q3_emergency_savings',
    title: 'Do you have access to independent emergency funds in your own name?',
    subtitle: 'Independent savings ensure financial safety in unexpected personal circumstances.',
    options: [
      {
        value: 'opt_separate_fund',
        title: 'Dedicated Individual Account',
        description: 'You have a sole-owner savings account with sufficient funds for independent needs.',
        weight: 0,
      },
      {
        value: 'opt_small_reserve',
        title: 'Small Individual Cash or Card Reserve',
        description: 'You have a modest personal reserve, though major funds remain joint.',
        weight: 1,
      },
      {
        value: 'opt_joint_only',
        title: 'Joint Funds Only',
        description: 'All savings exist in joint accounts where funds could be transferred or frozen by either party.',
        weight: 2,
      },
      {
        value: 'opt_no_reserve',
        title: 'No Individual Cash or Savings Access',
        description: 'You have zero independent savings and no personal cash reserves.',
        weight: 4,
      },
    ],
  },
  {
    id: 'q4_credit_docs',
    title: 'Where are your vital financial and identity documents kept?',
    subtitle: 'Includes Social Security card, tax returns, passport, credit reports, and deed papers.',
    options: [
      {
        value: 'opt_self_held',
        title: 'Self-Held or Easily Accessible',
        description: 'You hold your physical documents or have full access to private digital copies anytime.',
        weight: 0,
      },
      {
        value: 'opt_shared_location',
        title: 'Stored in Open Shared Location',
        description: 'Documents are kept in an open home safe or shared cabinet accessible to everyone.',
        weight: 1,
      },
      {
        value: 'opt_locked_restricted',
        title: 'Locked or Held by Someone Else',
        description: 'Your vital documents or passport are held in a location you cannot access without asking.',
        weight: 3,
      },
      {
        value: 'opt_unknown_location',
        title: 'Location Unknown or Access Denied',
        description: 'You do not know where your financial identity papers are or have been refused access.',
        weight: 4,
      },
    ],
  },
];

export const Assessment: React.FC = () => {
  // Step 1 = Onboarding & Consent, Step 2 = Data Choice, Step 3 = Questionnaire Questions, Step 4 = Summary
  const [assessmentStep, setAssessmentStep] = useState<number>(1);

  // Consent checkboxes state
  const [consentUsed, setConsentUsed] = useState<boolean>(false);
  const [consentNonDiagnostic, setConsentNonDiagnostic] = useState<boolean>(false);

  // Data choice state: 'upload' | 'sample' | 'skip' | null
  const [dataChoice, setDataChoice] = useState<'upload' | 'sample' | 'skip' | null>(null);

  // Questionnaire inner question index (for Step 3)
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const { assessmentAnswers, setAssessmentAnswer, executeQuickExit } = useSafeguard();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const isConsentAccepted = consentUsed && consentNonDiagnostic;

  const handleConsentContinue = () => {
    if (!isConsentAccepted) return;
    setAssessmentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDataChoiceSelect = (choice: 'upload' | 'sample' | 'skip') => {
    setDataChoice(choice);
    if (choice === 'upload') {
      addToast({
        title: 'Redirecting to Statement Upload',
        description: 'You can upload CSV or bank statement records privately.',
        type: 'info',
      });
      navigate('/financial-data');
    } else if (choice === 'sample') {
      addToast({
        title: 'Sample Data Loaded',
        description: 'Continuing with fictional transactions for demonstration.',
        type: 'info',
      });
      setAssessmentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // skip
      addToast({
        title: 'Questions Only Mode',
        description: 'Proceeding directly to the autonomy questions.',
        type: 'info',
      });
      setAssessmentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Questionnaire navigation logic
  const currentQuestion = QUESTIONS[questionIndex];
  const selectedOptionValue = (assessmentAnswers[currentQuestion?.id]?.value as string) || '';

  const handleSelectOption = (value: string) => {
    setAssessmentAnswer(currentQuestion.id, {
      questionId: currentQuestion.id,
      value,
    });
  };

  const handleQuestionNext = () => {
    if (!selectedOptionValue) {
      addToast({
        title: 'Please select an option',
        description: 'Select the statement that best fits your current situation to proceed.',
        type: 'warning',
      });
      return;
    }

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      addToast({
        title: 'Assessment Complete',
        description: 'Your responses have been confidentially saved locally.',
        type: 'success',
      });
      navigate('/results');
    }
  };

  const handleQuestionBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    } else {
      setAssessmentStep(2);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-4 sm:py-6">
      <div className="max-w-3xl mx-auto mb-4">
        <BackButton fallbackPath="/" />
      </div>
      {/* Top Minimal Assessment Header */}
      <div className="max-w-3xl mx-auto flex items-center justify-between pb-6 border-b border-[#EDECE8] mb-8">
        <NavLink to="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Safeguard</span>
        </NavLink>

        <button
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-[#EDECE8] hover:bg-stone-100 transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit assessment</span>
        </button>
      </div>

      {/* Main Centered Container */}
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        {/* Step Progress Indicator */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
            Step {assessmentStep} of 4
          </span>
          <span className="text-xs text-slate-400">
            {assessmentStep === 1 && 'Consent & Overview'}
            {assessmentStep === 2 && 'Data Choice'}
            {assessmentStep === 3 && `Question ${questionIndex + 1} of ${QUESTIONS.length}`}
            {assessmentStep === 4 && 'Reflection Summary'}
          </span>
        </div>

        {/* ================= STEP 1: BEFORE WE BEGIN / CONSENT ================= */}
        {assessmentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Before we begin</h1>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Safeguard uses optional financial information and your answers to identify patterns that may be relevant to financial autonomy.
              </p>
            </div>

            {/* Prominent Privacy Card */}
            <div className="bg-white border border-[#EDECE8] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Your control comes first</h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Financial data is optional</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>You choose what to share</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>You can stop at any time</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>You can delete your information</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Results are informational, not diagnostic</span>
                </li>
              </ul>
            </div>

            {/* Consent Section */}
            <div className="bg-[#FAF9F6] border border-[#EDECE8] rounded-[24px] p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Consent & Acknowledgement
              </h4>

              <div className="space-y-3">
                {/* Checkbox 1 */}
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consentUsed}
                    onChange={(e) => setConsentUsed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug group-hover:text-slate-900">
                    I understand how my information may be used for this assessment.
                  </span>
                </label>

                {/* Checkbox 2 */}
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consentNonDiagnostic}
                    onChange={(e) => setConsentNonDiagnostic(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug group-hover:text-slate-900">
                    I understand that Safeguard cannot determine whether financial abuse has occurred from financial data alone.
                  </span>
                </label>
              </div>
            </div>

            {/* CTA Continue */}
            <div>
              <button
                onClick={handleConsentContinue}
                disabled={!isConsentAccepted}
                className={`w-full py-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${
                  isConsentAccepted
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-[0.99] cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DATA CHOICE ================= */}
        {assessmentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                How would you like to continue?
              </h1>
              <p className="text-sm text-[#6B7280]">
                Select how you want to evaluate your financial autonomy.
              </p>
            </div>

            {/* Three Elegant Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Card 1: Upload financial data */}
              <button
                onClick={() => handleDataChoiceSelect('upload')}
                className="w-full text-left bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer flex items-start space-x-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Upload financial data
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    I have a bank statement or CSV I'd like to analyze.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all self-center" />
              </button>

              {/* Card 2: Use sample data */}
              <button
                onClick={() => handleDataChoiceSelect('sample')}
                className="w-full text-left bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer flex items-start space-x-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Use sample data
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    I want to explore the prototype with fictional transactions.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all self-center" />
              </button>

              {/* Card 3: Skip financial data */}
              <button
                onClick={() => handleDataChoiceSelect('skip')}
                className="w-full text-left bg-white border border-[#EDECE8] rounded-[24px] p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer flex items-start space-x-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Skip financial data
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    I'd prefer to answer questions only.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all self-center" />
              </button>
            </div>

            {/* Small reassurance note */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>You can complete the assessment without sharing any financial data.</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setAssessmentStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to consent</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: QUESTIONNAIRE QUESTIONS ================= */}
        {assessmentStep === 3 && currentQuestion && (
          <div className="space-y-6">
            <Card padding="lg" className="shadow-sm border-[#EDECE8] bg-white rounded-[24px]">
              <CardHeader className="border-b border-[#EDECE8] pb-4">
                <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 mb-1">
                  Question {questionIndex + 1} of {QUESTIONS.length}
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentQuestion.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-500">
                  {currentQuestion.subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent className="py-6 space-y-3">
                {currentQuestion.options.map((opt) => (
                  <RadioOption
                    key={opt.value}
                    id={opt.value}
                    name={currentQuestion.id}
                    value={opt.value}
                    selectedValue={selectedOptionValue}
                    onChange={handleSelectOption}
                    title={opt.title}
                    description={opt.description}
                  />
                ))}
              </CardContent>

              <CardFooter className="pt-4 border-t border-[#EDECE8] flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleQuestionBack}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  onClick={handleQuestionNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {questionIndex === QUESTIONS.length - 1 ? 'Complete & View Report' : 'Continue'}
                </Button>
              </CardFooter>
            </Card>

            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#EDECE8] text-xs text-slate-500 flex items-center space-x-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                All choices are saved locally in your browser session and are never uploaded to remote servers.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;

