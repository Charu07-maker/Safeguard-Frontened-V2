import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FinancialPattern,
  Transaction,
  UserSettings,
  AssessmentAnswer,
} from '../types';
import {
  DEMO_TRANSACTIONS,
  DEMO_PATTERNS,
  DEMO_QUESTIONNAIRE_ANSWERS,
} from '../data/demoData';

// Default initial mock patterns (non-diagnostic, reflective)
const INITIAL_PATTERNS: FinancialPattern[] = [
  {
    id: 'pat-1',
    category: 'account_access',
    title: 'Single-Party Credential Control',
    description:
      'Primary digital banking access and password recovery options are registered under a single shared contact address or restricted email.',
    severity: 'elevated',
    dateDetected: '2026-08-01',
    evidenceCount: 2,
    reflectionQuestions: [
      'Do you have direct, unmonitored access to log into your joint or individual bank accounts?',
      'Can you reset account passwords independently if needed?',
    ],
    recommendedActions: [
      'Set up a secondary confidential personal email for sensitive financial communications.',
      'Request individual online banking credentials from your financial institution.',
    ],
  },
  {
    id: 'pat-2',
    category: 'transaction_anomaly',
    title: 'Unusual High-Volume Cash Withdrawals',
    description:
      'A series of regular cash withdrawals were logged from a joint checking account following pay deposit dates without secondary receipts.',
    severity: 'moderate',
    dateDetected: '2026-08-05',
    evidenceCount: 4,
    reflectionQuestions: [
      'Are cash withdrawals mutually agreed upon or discussed prior to execution?',
      'Do you feel comfortable asking about joint account cash withdrawals?',
    ],
    recommendedActions: [
      'Enable instant push notifications for joint account transfers over $50.',
      'Keep personal record of individual contribution allocations.',
    ],
  },
  {
    id: 'pat-3',
    category: 'documentation',
    title: 'Restricted Access to Critical Tax Documents',
    description:
      'Joint tax filings, credit reports, and deed titles are held exclusively in a restricted offline or digital location.',
    severity: 'informational',
    dateDetected: '2026-07-28',
    evidenceCount: 1,
    reflectionQuestions: [
      'Do you have copies or digital scans of your official government ID, tax returns, and social security card?',
    ],
    recommendedActions: [
      'Create a secure, encrypted personal cloud folder or physical document folder stored in a safe location.',
    ],
  },
];

// Mock initial financial transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-101',
    date: '2026-08-06',
    description: 'ATM Cash Withdrawal - Main St Branch',
    amount: 500.0,
    category: 'Cash & ATM',
    accountName: 'Joint Checking (..4821)',
    isJoint: true,
    flagged: true,
    flagReason: 'Unusual cash outflow relative to monthly average',
    userNote: 'Unexplained cash withdrawal following salary deposit',
  },
  {
    id: 'tx-102',
    date: '2026-08-04',
    description: 'Auto Transfer to External Savings',
    amount: 1200.0,
    category: 'Transfer',
    accountName: 'Joint Checking (..4821)',
    isJoint: true,
    flagged: true,
    flagReason: 'Transfer to non-joint external account',
    userNote: 'Moved funds out of shared view',
  },
  {
    id: 'tx-103',
    date: '2026-08-02',
    description: 'Grocery Superstore',
    amount: 142.5,
    category: 'Groceries',
    accountName: 'Joint Credit Card (..9012)',
    isJoint: true,
    flagged: false,
  },
  {
    id: 'tx-104',
    date: '2026-07-29',
    description: 'Primary Income Salary Deposit',
    amount: 3450.0,
    category: 'Income',
    accountName: 'Joint Checking (..4821)',
    isJoint: true,
    flagged: false,
  },
  {
    id: 'tx-105',
    date: '2026-07-25',
    description: 'Department Store - Card Authorization Removed',
    amount: 85.0,
    category: 'Shopping',
    accountName: 'Joint Credit Card (..9012)',
    isJoint: true,
    flagged: true,
    flagReason: 'Authorized secondary card user status altered',
  },
];

export interface User {
  id: string;
  email: string;
  name: string;
}

interface SafeguardContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (email: string, password?: string, name?: string) => { success: boolean; error?: string };
  logout: () => void;
  showAuthModal: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup', redirectTarget?: string) => void;
  closeAuthModal: () => void;
  authRedirectTarget: string | null;
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  discreetMode: boolean;
  toggleDiscreetMode: () => void;
  isDemoMode: boolean;
  startDemo: () => void;
  resetDemo: () => void;
  patterns: FinancialPattern[];
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  toggleFlagTransaction: (id: string, reason?: string) => void;
  updateTransactionNote: (id: string, note: string) => void;
  questionnaireAnswers: Record<string, string>;
  setQuestionnaireAnswer: (questionId: string, answer: string) => void;
  assessmentAnswers: Record<string, AssessmentAnswer>;
  setAssessmentAnswer: (questionId: string, answer: AssessmentAnswer) => void;
  triggerQuickExit: () => void;
  wipeAllData: () => void;
  calculatedScore: {
    autonomyIndex: number; // 0 - 100
    vulnerabilityLevel: 'low' | 'moderate' | 'elevated' | 'high';
    keyInsights: string[];
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  discreetMode: false,
  quickExitUrl: 'https://www.weather.com',
  autoClearOnExit: false,
  pinProtected: false,
  analyticsOptOut: true,
  themeStyle: 'default',
};

const SafeguardContext = createContext<SafeguardContextType | undefined>(undefined);

export const SafeguardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('safeguard_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [authRedirectTarget, setAuthRedirectTarget] = useState<string | null>(null);

  const openAuthModal = (tab: 'login' | 'signup' = 'login', redirectTarget?: string) => {
    setAuthModalTab(tab);
    if (redirectTarget) {
      setAuthRedirectTarget(redirectTarget);
    }
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const login = (email: string, password?: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    const savedUsers = localStorage.getItem('safeguard_users_db');
    const usersList: Array<{ id: string; email: string; name: string; password?: string }> = savedUsers
      ? JSON.parse(savedUsers)
      : [{ id: 'usr-demo', email: 'user@example.com', name: 'Demo User', password: 'password123' }];

    const normalizedEmail = email.trim().toLowerCase();
    const foundUser = usersList.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (foundUser) {
      if (password && foundUser.password && foundUser.password !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
      const loggedUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };
      setUser(loggedUser);
      localStorage.setItem('safeguard_current_user', JSON.stringify(loggedUser));
      return { success: true };
    }

    // If not found in database, allow auto-creating account on login or returning user
    const newUser: User = {
      id: 'usr-' + Date.now(),
      email: normalizedEmail,
      name: normalizedEmail.split('@')[0],
    };
    usersList.push({ ...newUser, password: password || 'password' });
    localStorage.setItem('safeguard_users_db', JSON.stringify(usersList));
    setUser(newUser);
    localStorage.setItem('safeguard_current_user', JSON.stringify(newUser));
    return { success: true };
  };

  const signup = (email: string, password?: string, name?: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (password && password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }
    const savedUsers = localStorage.getItem('safeguard_users_db');
    const usersList: Array<{ id: string; email: string; name: string; password?: string }> = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    const normalizedEmail = email.trim().toLowerCase();
    const existing = usersList.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please log in instead.' };
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      email: normalizedEmail,
      name: name?.trim() || normalizedEmail.split('@')[0],
    };
    usersList.push({ ...newUser, password: password || 'password' });
    localStorage.setItem('safeguard_users_db', JSON.stringify(usersList));
    setUser(newUser);
    localStorage.setItem('safeguard_current_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safeguard_current_user');
  };

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('safeguard_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem('safeguard_is_demo') === 'true';
  });

  const [patterns] = useState<FinancialPattern[]>(INITIAL_PATTERNS);

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const isDemo = localStorage.getItem('safeguard_is_demo') === 'true';
    if (isDemo) return DEMO_TRANSACTIONS;
    const saved = localStorage.getItem('safeguard_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>(() => {
    const isDemo = localStorage.getItem('safeguard_is_demo') === 'true';
    if (isDemo) return DEMO_QUESTIONNAIRE_ANSWERS;
    const saved = localStorage.getItem('safeguard_questionnaire');
    return saved ? JSON.parse(saved) : {};
  });

  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, AssessmentAnswer>>(() => {
    const saved = localStorage.getItem('safeguard_assessment');
    return saved ? JSON.parse(saved) : {};
  });

  const startDemo = () => {
    setIsDemoMode(true);
    setTransactions(DEMO_TRANSACTIONS);
    setQuestionnaireAnswers(DEMO_QUESTIONNAIRE_ANSWERS);
    localStorage.setItem('safeguard_is_demo', 'true');
    localStorage.setItem('safeguard_transactions', JSON.stringify(DEMO_TRANSACTIONS));
    localStorage.setItem('safeguard_questionnaire', JSON.stringify(DEMO_QUESTIONNAIRE_ANSWERS));
  };

  const resetDemo = () => {
    setIsDemoMode(false);
    setTransactions(INITIAL_TRANSACTIONS);
    setQuestionnaireAnswers({});
    setAssessmentAnswers({});
    localStorage.removeItem('safeguard_is_demo');
    localStorage.setItem('safeguard_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    localStorage.setItem('safeguard_questionnaire', JSON.stringify({}));
  };

  useEffect(() => {
    localStorage.setItem('safeguard_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('safeguard_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('safeguard_questionnaire', JSON.stringify(questionnaireAnswers));
  }, [questionnaireAnswers]);

  useEffect(() => {
    localStorage.setItem('safeguard_assessment', JSON.stringify(assessmentAnswers));
  }, [assessmentAnswers]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleDiscreetMode = () => {
    setSettings((prev) => ({ ...prev, discreetMode: !prev.discreetMode }));
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: 'tx-' + Math.random().toString(36).substring(2, 8),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const toggleFlagTransaction = (id: string, reason?: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              flagged: !t.flagged,
              flagReason: !t.flagged ? reason || 'User marked for pattern review' : undefined,
            }
          : t
      )
    );
  };

  const updateTransactionNote = (id: string, note: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, userNote: note } : t))
    );
  };

  const setQuestionnaireAnswer = (questionId: string, answer: string) => {
    setQuestionnaireAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const setAssessmentAnswer = (questionId: string, answer: AssessmentAnswer) => {
    setAssessmentAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const triggerQuickExit = () => {
    if (settings.autoClearOnExit) {
      localStorage.clear();
    }
    window.location.href = settings.quickExitUrl || 'https://www.weather.com';
  };

  const wipeAllData = () => {
    localStorage.clear();
    setUser(null);
    setIsDemoMode(false);
    setTransactions(INITIAL_TRANSACTIONS);
    setQuestionnaireAnswers({});
    setAssessmentAnswers({});
    setSettings(DEFAULT_SETTINGS);
  };

  // Calculate non-diagnostic financial autonomy metric
  const calculateAutonomyScore = () => {
    let baseScore = 82; // Initial healthy autonomy starting baseline
    const flaggedCount = transactions.filter((t) => t.flagged).length;
    baseScore -= flaggedCount * 8;

    const answeredCount = Object.keys(questionnaireAnswers).length;
    if (answeredCount > 0) {
      // Adjust score based on answered questionnaire weights
      Object.values(questionnaireAnswers).forEach((val) => {
        const valStr = val as string;
        if (valStr.includes('restricted') || valStr.includes('no_access') || valStr.includes('approval_required')) {
          baseScore -= 10;
        } else if (valStr.includes('shared_collaborative') || valStr.includes('independent')) {
          baseScore += 3;
        }
      });
    }

    const finalScore = Math.max(15, Math.min(100, baseScore));

    let level: 'low' | 'moderate' | 'elevated' | 'high' = 'low';
    if (finalScore < 40) level = 'high';
    else if (finalScore < 60) level = 'elevated';
    else if (finalScore < 78) level = 'moderate';

    const insights: string[] = [
      'Your financial profile reflects mostly independent access with 1-2 areas to review.',
      'Maintaining an emergency individual account enhances financial resilience.',
      'Regular review of joint account authorization settings is recommended.',
    ];

    if (level === 'elevated' || level === 'high') {
      insights.unshift(
        'Patterns suggest significant reliance on shared accounts with restricted individual visibility.'
      );
    }

    return {
      autonomyIndex: finalScore,
      vulnerabilityLevel: level,
      keyInsights: insights,
    };
  };

  const currentPatterns = isDemoMode ? DEMO_PATTERNS : patterns;

  return (
    <SafeguardContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        signup,
        logout,
        showAuthModal,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        authRedirectTarget,
        settings,
        updateSettings,
        discreetMode: settings.discreetMode,
        toggleDiscreetMode,
        isDemoMode,
        startDemo,
        resetDemo,
        patterns: currentPatterns,
        transactions,
        addTransaction,
        toggleFlagTransaction,
        updateTransactionNote,
        questionnaireAnswers,
        setQuestionnaireAnswer,
        assessmentAnswers,
        setAssessmentAnswer,
        triggerQuickExit,
        wipeAllData,
        calculatedScore: calculateAutonomyScore(),
      }}
    >
      {children}
    </SafeguardContext.Provider>
  );
};

export const useSafeguard = () => {
  const context = useContext(SafeguardContext);
  if (!context) {
    throw new Error('useSafeguard must be used within a SafeguardProvider');
  }
  return context;
};
