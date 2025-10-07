export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
  filename?: string;
}

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface UseCase {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category:
    | "health"
    | "commerce"
    | "social"
    | "education"
    | "productivity"
    | "entertainment";
  icon: string;
  summary: string;
  problemStatement: string;
  solution: string;
  images?: { src: string; alt: string; isDark?: boolean }[];
  targetAudience: string[];
  keyFeatures: Feature[];
  coreCapabilities: string[];
  codeExamples: CodeExample[];
  metrics: Metric[];
  timeSavings: string;
  costSavings: string;
  relatedTutorials: string[];
  relatedComparisons: string[];
  screenshot?: string;
}

export const useCases: UseCase[] = [
  {
    slug: "pomodoro-timer-app",
    title: "Build a Pomodoro Timer & Focus App",
    metaTitle:
      "Pomodoro Timer App Template | Build Focus & Productivity App with Next.js",
    metaDescription:
      "Create a Pomodoro timer app with work/break intervals, session history, statistics, and local notifications. Built with Next.js and Capacitor for iOS & Android.",
    category: "productivity",
    icon: "⏱️",
    summary:
      "Launch a productivity-focused Pomodoro timer app with customizable work/break durations, offline session tracking, statistics dashboard, and local notifications for session completion.",
    problemStatement:
      "Building a timer app requires precise interval management, background execution, local notifications, offline data persistence, and statistics tracking - all while maintaining a clean, focused user experience across platforms.",
    solution:
      "NextNative provides a complete Pomodoro timer foundation with React Context state management, Capacitor Preferences for offline storage, Local Notifications for alerts, and a three-tab interface for timer, statistics, and settings.",
    images: [
      {
        src: "/showcase/pomodoro-app-1.png",
        alt: "Pomodoro Timer App Mockup 1",
      },
      {
        src: "/showcase/pomodoro-app-2.png",
        alt: "Pomodoro Timer App Mockup 2",
      },
      {
        src: "/showcase/pomodoro-app-3.png",
        alt: "Pomodoro Timer App Mockup 3",
      },
      {
        src: "/showcase/pomodoro-app-4.png",
        alt: "Pomodoro Timer App Mockup 4",
      },
    ],
    targetAudience: [
      "Productivity app developers",
      "Students building portfolio projects",
      "Indie developers creating focus tools",
      "Teams needing custom time-tracking solutions",
      "Developers learning mobile app patterns",
    ],
    keyFeatures: [
      {
        icon: "⏱️",
        title: "Customizable Timer",
        description:
          "Set work duration (1-60 min) and break duration (1-30 min) with circular progress visualization and automatic mode switching.",
      },
      {
        icon: "🔔",
        title: "Local Notifications",
        description:
          "Receive native notifications when work sessions complete or break time ends using Capacitor Local Notifications.",
      },
      {
        icon: "📊",
        title: "Session Statistics",
        description:
          "Track total work sessions, work time, break time, today's sessions, and current streak with visual cards and icons.",
      },
      {
        icon: "💾",
        title: "Offline Storage",
        description:
          "All sessions and settings stored locally using Capacitor Preferences with automatic persistence across app restarts.",
      },
      {
        icon: "🎯",
        title: "Focus Modes",
        description:
          "Distinct work and break modes with different colors (indigo for work, green for break) and descriptive messages.",
      },
      {
        icon: "🔄",
        title: "Session History",
        description:
          "Complete session history with start times, durations, and completion status stored offline for later review.",
      },
    ],
    coreCapabilities: [
      "Countdown timer with minute:second display",
      "Circular progress indicator with SVG",
      "Play/pause/reset controls",
      "Automatic work ↔ break mode switching",
      "Customizable work duration (1-60 minutes)",
      "Customizable break duration (1-30 minutes)",
      "Local notification on session completion",
      "Session history tracking",
      "Today's statistics (sessions & time)",
      "All-time statistics (total sessions, work time, break time)",
      "Current streak calculation (consecutive days)",
      "Delete all sessions functionality",
      "Settings persistence with Capacitor Preferences",
      "Dark mode support",
      "Tab navigation (Timer, Statistics, Settings)",
    ],
    codeExamples: [
      {
        title: "Timer State Management with React Context",
        description:
          "Manage timer state globally using React Context and custom hook with Capacitor Preferences for persistence.",
        language: "typescript",
        filename: "hooks/usePomodoro.ts",
        code: `import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

const STORAGE_KEYS = {
  SETTINGS: 'pomodoro-settings',
  SESSIONS: 'pomodoro-sessions',
  STATISTICS: 'pomodoro-statistics',
};

export function usePomodoro() {
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
  });
  
  const [timer, setTimer] = useState({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    mode: 'work',
  });

  // Load settings from storage
  useEffect(() => {
    const loadSettings = async () => {
      const result = await Preferences.get({ 
        key: STORAGE_KEYS.SETTINGS 
      });
      if (result.value) {
        const loaded = JSON.parse(result.value);
        setSettings(loaded);
        setTimer(prev => ({ 
          ...prev, 
          minutes: loaded.workDuration 
        }));
      }
    };
    loadSettings();
  }, []);

  // Save settings when changed
  const updateSettings = async (newSettings) => {
    setSettings(newSettings);
    await Preferences.set({
      key: STORAGE_KEYS.SETTINGS,
      value: JSON.stringify(newSettings),
    });
  };

  return { settings, timer, updateSettings, setTimer };
}`,
      },
      {
        title: "Local Notifications on Session Complete",
        description:
          "Send native notifications when Pomodoro sessions complete using Capacitor Local Notifications.",
        language: "typescript",
        filename: "hooks/usePomodoro.ts",
        code: `import { LocalNotifications } from '@capacitor/local-notifications';

// Request notification permission on app load
const requestNotificationPermission = async () => {
  await LocalNotifications.requestPermissions();
};

// Send notification when session completes
const switchMode = async () => {
  const message = timer.mode === 'work'
    ? 'Work session completed! Time for a break!'
    : 'Break time is over! Ready to work?';

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Pomodoro Timer',
          body: message,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 100) },
        },
      ],
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }

  // Switch to next mode
  setTimer({
    minutes: timer.mode === 'work' ? breakDuration : workDuration,
    seconds: 0,
    isRunning: false,
    mode: timer.mode === 'work' ? 'break' : 'work',
  });
};`,
      },
      {
        title: "Statistics Calculation & Streak Tracking",
        description:
          "Calculate session statistics and track consecutive day streaks for gamification.",
        language: "typescript",
        filename: "hooks/usePomodoro.ts",
        code: `const calculateStatistics = (sessions) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const completedSessions = sessions.filter(s => s.completed);

  const workSessions = completedSessions.filter(s => s.mode === 'work');
  const breakSessions = completedSessions.filter(s => s.mode === 'break');
  const todaySessions = workSessions.filter(s => s.startTime >= today);

  return {
    totalWorkSessions: workSessions.length,
    totalWorkTime: workSessions.reduce((sum, s) => sum + s.duration, 0),
    totalBreakTime: breakSessions.reduce((sum, s) => sum + s.duration, 0),
    todayWorkSessions: todaySessions.length,
    todayWorkTime: todaySessions.reduce((sum, s) => sum + s.duration, 0),
    currentStreak: calculateStreak(workSessions),
  };
};

const calculateStreak = (workSessions) => {
  if (workSessions.length === 0) return 0;

  const sorted = [...workSessions].sort((a, b) => b.startTime - a.startTime);
  let streak = 0;
  let currentDate = new Date().setHours(0, 0, 0, 0);

  for (const session of sorted) {
    const sessionDate = new Date(session.startTime).setHours(0, 0, 0, 0);
    
    // Check if session is today or yesterday (consecutive)
    if (sessionDate === currentDate || 
        sessionDate === currentDate - 86400000) {
      streak++;
      currentDate = sessionDate;
    } else {
      break;
    }
  }

  return streak;
};`,
      },
    ],
    metrics: [
      {
        label: "Development Time",
        value: "3-5 days",
        description: "vs 3-4 weeks building from scratch",
      },
      {
        label: "Cost Savings",
        value: "$5,000+",
        description: "Compared to custom timer app development",
      },
      {
        label: "Features",
        value: "Production Ready",
        description: "Timer, statistics, notifications, and settings",
      },
      {
        label: "Offline Support",
        value: "100%",
        description: "Full functionality without internet connection",
      },
    ],
    timeSavings: "3-4 weeks",
    costSavings: "$5,000-15,000",
    relatedTutorials: [
      "convert-nextjs-to-mobile-app",
      "add-push-notifications-nextjs",
    ],
    relatedComparisons: ["pwa-vs-native-app"],
  },
  {
    slug: "expense-tracker-app",
    title: "Build an Expense Tracker & Budget Manager App",
    metaTitle:
      "Expense Tracker App Template | Build Budget Manager with Next.js & Capacitor",
    metaDescription:
      "Create a professional expense tracking app with category-based organization, date filtering, and analytics. Built with Next.js and Capacitor for iOS & Android.",
    category: "productivity",
    icon: "💰",
    summary:
      "Launch a full-featured expense tracking app with add/edit/delete functionality, category-based organization, date filtering, monthly analytics, and offline storage.",
    problemStatement:
      "Building a finance tracking app requires complex data management, real-time calculations, visual analytics, and secure offline storage - typically taking months to develop for both iOS and Android.",
    solution:
      "NextNative provides a complete expense tracker foundation with React Context state management, Capacitor Preferences for offline storage, category-based filtering, and a three-tab interface for expenses, analytics, and settings.",
    images: [
      {
        src: "/showcase/expense-app-1.png",
        alt: "Expense Tracker App Mockup 1",
      },
      {
        src: "/showcase/expense-app-2.png",
        alt: "Expense Tracker App Mockup 2",
      },
      {
        src: "/showcase/expense-app-3.png",
        alt: "Expense Tracker App Mockup 3",
      },
      {
        src: "/showcase/expense-app-4.png",
        alt: "Expense Tracker App Mockup 4",
      },
    ],
    targetAudience: [
      "Fintech startups validating MVPs",
      "Personal finance coaches building client apps",
      "Budget-conscious individuals tracking spending",
      "Small business owners managing expenses",
      "Developers building finance management tools",
    ],
    keyFeatures: [
      {
        icon: "💵",
        title: "Expense Management",
        description:
          "Add, edit, and delete expenses with name, amount, category, and date. Full CRUD operations with instant updates.",
      },
      {
        icon: "📊",
        title: "Category Organization",
        description:
          "Organize expenses into 6 categories: Food, Transportation, Entertainment, Shopping, Bills, and Other.",
      },
      {
        icon: "🔍",
        title: "Smart Filtering",
        description:
          "Filter expenses by category and date range. View total amount for filtered results in real-time.",
      },
      {
        icon: "📈",
        title: "Monthly Analytics",
        description:
          "Track monthly total, daily average, category breakdown with percentages, and identify most expensive category.",
      },
      {
        icon: "💾",
        title: "Offline Storage",
        description:
          "All data stored locally using Capacitor Preferences. No internet required, no server costs.",
      },
      {
        icon: "📱",
        title: "Native UI",
        description:
          "Built with Ionic React components for native-feeling iOS and Android experience.",
      },
    ],
    coreCapabilities: [
      "Add expenses with custom name, amount, category, and date",
      "Edit existing expenses with full data modification",
      "Delete individual expenses with confirmation alert",
      "Filter by 6 expense categories (Food, Transportation, etc.)",
      "Filter by date range (start date and end date)",
      "Calculate total amount for filtered expenses",
      "Monthly overview with total spent and daily average",
      "Daily spending breakdown for current month",
      "Category breakdown with amount and percentage",
      "Identify most expensive category automatically",
      "Offline-first with Capacitor Preferences storage",
      "Clear all data with confirmation",
      "Three-tab navigation (Expenses, Analytics, Settings)",
      "Dark mode support with Ionic theming",
      "Responsive design for all screen sizes",
    ],
    codeExamples: [
      {
        title: "Expense State Management with React Context",
        description:
          "Centralized expense state using React Context pattern. Provides all CRUD operations and analytics to child components.",
        language: "typescript",
        filename: "ExpenseContext.tsx",
        code: `"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useExpenses } from "./hooks/useExpenses";

type ExpenseContextType = ReturnType<typeof useExpenses>;

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const expenseState = useExpenses();

  return (
    <ExpenseContext.Provider value={expenseState}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenseContext must be used within ExpenseProvider");
  }
  return context;
}`,
      },
      {
        title: "Offline Storage with Capacitor Preferences",
        description:
          "Persist expense data locally using Capacitor Preferences API. Auto-save on every change with load on mount.",
        language: "typescript",
        filename: "hooks/useExpenses.ts",
        code: `import { useState, useEffect, useCallback } from "react";
import { Preferences } from "@capacitor/preferences";
import { Expense } from "../types";

const EXPENSES_KEY = "expenses";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load expenses from Capacitor Preferences on mount
  useEffect(() => {
    loadExpenses();
  }, []);

  // Save expenses to Capacitor Preferences whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveExpenses();
    }
  }, [expenses, isLoading]);

  const loadExpenses = async () => {
    try {
      const { value } = await Preferences.get({ key: EXPENSES_KEY });
      if (value) {
        const parsed = JSON.parse(value);
        setExpenses(parsed);
      }
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveExpenses = async () => {
    try {
      await Preferences.set({
        key: EXPENSES_KEY,
        value: JSON.stringify(expenses),
      });
    } catch (error) {
      console.error("Failed to save expenses:", error);
    }
  };

  const addExpense = useCallback((expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  }, []);

  const updateExpense = useCallback((id: string, updates: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  return { expenses, addExpense, updateExpense, deleteExpense };
}`,
      },
      {
        title: "Monthly Analytics Calculation",
        description:
          "Calculate category breakdown, daily spending, monthly totals, and identify most expensive category from expense data.",
        language: "typescript",
        filename: "hooks/useExpenses.ts",
        code: `import { useMemo } from "react";
import { Expense, ExpenseAnalytics, DailySpending } from "../types";

export function calculateAnalytics(expenses: Expense[]): ExpenseAnalytics | null {
  if (expenses.length === 0) return null;

  // Category breakdown
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryTotals).map(
    ([name, value]) => ({ name, value })
  );

  // Daily spending for current month
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthEnd = new Date(year, month + 1, 0);
  const daysInMonth = monthEnd.getDate();

  const dailySpending: DailySpending[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0]; // yyyy-MM-dd
    const monthDay = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    
    const total = expenses
      .filter((e) => e.date === dateStr)
      .reduce((sum, e) => sum + e.amount, 0);
    
    dailySpending.push({ date: monthDay, amount: total });
  }

  // Monthly total and average
  const monthlyTotal = dailySpending.reduce(
    (sum: number, day: DailySpending) => sum + day.amount,
    0
  );
  const dailyAverage = monthlyTotal / daysInMonth;

  // Most expensive category
  const mostExpensive = categoryData.length > 0
    ? categoryData.reduce((a, b) => (a.value > b.value ? a : b))
    : { name: "None", value: 0 };

  return {
    categoryData,
    dailySpending,
    monthlyTotal,
    dailyAverage,
    mostExpensive,
  };
}`,
      },
    ],
    metrics: [
      {
        label: "Development Time",
        value: "2-4 days",
        description: "vs 3-4 weeks building from scratch",
      },
      {
        label: "Cost Savings",
        value: "$4,000+",
        description: "Compared to custom expense tracker development",
      },
      {
        label: "Categories",
        value: "6 Built-in",
        description:
          "Food, Transportation, Entertainment, Shopping, Bills, Other",
      },
      {
        label: "Offline Support",
        value: "100%",
        description: "Full functionality without internet connection",
      },
    ],
    timeSavings: "3-4 weeks",
    costSavings: "$4,000-12,000",
    relatedTutorials: ["convert-nextjs-to-mobile-app"],
    relatedComparisons: ["capacitor-vs-flutter"],
  },
  {
    slug: "flashcard-learning-app",
    title: "Build a Flashcard & Spaced Repetition Learning App",
    metaTitle:
      "Flashcard App Template | Build Learning App with Next.js & Capacitor",
    metaDescription:
      "Create a powerful flashcard learning app with quiz mode, flip animations, and progress tracking. Built with Next.js and Capacitor for iOS & Android.",
    category: "education",
    icon: "🎴",
    summary:
      "Launch a full-featured flashcard learning app with add/edit/delete cards, interactive quiz mode with flip animations, accuracy tracking, and detailed statistics.",
    problemStatement:
      "Building an educational flashcard app requires complex UI animations, state management for quiz logic, accurate progress tracking, and offline data persistence - typically taking weeks to develop properly.",
    solution:
      "NextNative provides a complete flashcard app foundation with React Context state management, Capacitor Preferences for offline storage, CSS flip animations, and a three-tab interface for cards, quiz, and statistics.",
    images: [
      {
        src: "/showcase/flashcard-app-1.png",
        alt: "Flashcard Learning App Mockup 1",
      },
      {
        src: "/showcase/flashcard-app-2.png",
        alt: "Flashcard Learning App Mockup 2",
      },
      {
        src: "/showcase/flashcard-app-3.png",
        alt: "Flashcard Learning App Mockup 3",
      },
      {
        src: "/showcase/flashcard-app-4.png",
        alt: "Flashcard Learning App Mockup 4",
      },
    ],
    targetAudience: [
      "Educators creating study materials",
      "Students building personalized study tools",
      "EdTech startups validating MVPs",
      "Language learning app developers",
      "Test prep companies building practice tools",
    ],
    keyFeatures: [
      {
        icon: "🃏",
        title: "Card Management",
        description:
          "Add, edit, and delete flashcards with question and answer fields. Full CRUD operations with instant updates.",
      },
      {
        icon: "🔄",
        title: "Interactive Quiz Mode",
        description:
          "Take quizzes with smooth flip animations to reveal answers. Track correct/incorrect responses in real-time.",
      },
      {
        icon: "📊",
        title: "Progress Tracking",
        description:
          "Track quiz results, accuracy percentages, and learning progress over time with detailed statistics.",
      },
      {
        icon: "🎯",
        title: "Accuracy Metrics",
        description:
          "View overall accuracy, total correct/incorrect answers, and performance trends across all quizzes.",
      },
      {
        icon: "💾",
        title: "Offline Storage",
        description:
          "All flashcards and quiz results stored locally using Capacitor Preferences. No internet required.",
      },
      {
        icon: "📱",
        title: "Native UI",
        description:
          "Built with Ionic React components for smooth native iOS and Android experience.",
      },
    ],
    coreCapabilities: [
      "Add flashcards with custom questions and answers",
      "Edit existing flashcards with full data modification",
      "Delete individual flashcards with confirmation",
      "Interactive quiz mode with progress indicator",
      "Smooth 3D flip animation to reveal answers",
      "Self-assessment with correct/incorrect marking",
      "Real-time score tracking during quizzes",
      "Quiz results summary with accuracy percentage",
      "Overall statistics with total cards and quizzes",
      "Average accuracy calculation across all quizzes",
      "Quiz history with timestamps and scores",
      "Last reviewed date tracking for each card",
      "Offline-first with Capacitor Preferences storage",
      "Clear all flashcards with confirmation",
      "Clear quiz history with confirmation",
      "Three-tab navigation (Cards, Quiz, Statistics)",
      "Dark mode support with Ionic theming",
    ],
    codeExamples: [
      {
        title: "Flashcard State Management with React Context",
        description:
          "Centralized flashcard and quiz state using React Context pattern. Provides CRUD operations and statistics to all screens.",
        language: "typescript",
        filename: "FlashcardContext.tsx",
        code: `"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useFlashcards } from "./hooks/useFlashcards";

type FlashcardContextType = ReturnType<typeof useFlashcards>;

const FlashcardContext = createContext<FlashcardContextType | undefined>(
  undefined
);

export function FlashcardProvider({ children }: { children: ReactNode }) {
  const flashcardState = useFlashcards();

  return (
    <FlashcardContext.Provider value={flashcardState}>
      {children}
    </FlashcardContext.Provider>
  );
}

export function useFlashcardContext() {
  const context = useContext(FlashcardContext);
  if (context === undefined) {
    throw new Error(
      "useFlashcardContext must be used within FlashcardProvider"
    );
  }
  return context;
}`,
      },
      {
        title: "Offline Storage with Capacitor Preferences",
        description:
          "Persist flashcards and quiz results locally using Capacitor Preferences API. Auto-save on every change.",
        language: "typescript",
        filename: "hooks/useFlashcards.ts",
        code: `import { useState, useEffect, useCallback } from "react";
import { Preferences } from "@capacitor/preferences";
import { Flashcard, QuizResult } from "../types";

const FLASHCARDS_KEY = "flashcards";
const QUIZ_RESULTS_KEY = "quiz-results";

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Capacitor Preferences on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save flashcards whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveFlashcards();
    }
  }, [flashcards, isLoading]);

  const loadData = async () => {
    try {
      const [flashcardsData, quizResultsData] = await Promise.all([
        Preferences.get({ key: FLASHCARDS_KEY }),
        Preferences.get({ key: QUIZ_RESULTS_KEY }),
      ]);

      if (flashcardsData.value) {
        setFlashcards(JSON.parse(flashcardsData.value));
      }
      if (quizResultsData.value) {
        setQuizResults(JSON.parse(quizResultsData.value));
      }
    } catch (error) {
      console.error("Failed to load flashcard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFlashcards = async () => {
    try {
      await Preferences.set({
        key: FLASHCARDS_KEY,
        value: JSON.stringify(flashcards),
      });
    } catch (error) {
      console.error("Failed to save flashcards:", error);
    }
  };

  const addFlashcard = useCallback((question: string, answer: string) => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question,
      answer,
      createdAt: new Date().toISOString(),
    };
    setFlashcards((prev) => [...prev, newCard]);
  }, []);

  return { flashcards, addFlashcard, /* ... other methods */ };
}`,
      },
      {
        title: "3D Flip Animation for Flashcards",
        description:
          "CSS-based 3D flip animation to reveal answers. Uses transform and backface-visibility for smooth transitions.",
        language: "typescript",
        filename: "screens/quiz-screen.tsx",
        code: `// Flashcard container with perspective
<div
  style={{
    perspective: "1000px",
  }}
>
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "300px",
      transition: "transform 0.6s",
      transformStyle: "preserve-3d",
      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    }}
  >
    {/* Question Side (Front) */}
    <IonCard
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <IonCardContent>
        <h2>{currentCard.question}</h2>
      </IonCardContent>
    </IonCard>

    {/* Answer Side (Back) */}
    <IonCard
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <IonCardContent>
        <h2>{currentCard.answer}</h2>
      </IonCardContent>
    </IonCard>
  </div>
</div>`,
      },
    ],
    metrics: [
      {
        label: "Development Time",
        value: "2-3 days",
        description: "vs 2-3 weeks building from scratch",
      },
      {
        label: "Cost Savings",
        value: "$3,000+",
        description: "Compared to custom flashcard app development",
      },
      {
        label: "Features",
        value: "Production Ready",
        description: "Cards, quiz mode, statistics, and progress tracking",
      },
      {
        label: "Offline Support",
        value: "100%",
        description: "Full functionality without internet connection",
      },
    ],
    timeSavings: "2-3 weeks",
    costSavings: "$3,000-10,000",
    relatedTutorials: ["convert-nextjs-to-mobile-app"],
    relatedComparisons: ["nextjs-vs-react-native", "capacitor-vs-react-native"],
  },
  {
    slug: "fitness-app",
    title: "Build a Fitness & Workout Tracking App",
    metaTitle:
      "Fitness App Template | Build Workout Tracker with Next.js & Capacitor",
    metaDescription:
      "Create a professional fitness tracking app with workout plans, progress tracking, and offline support. Built with Next.js and Capacitor. Deploy to iOS & Android in hours.",
    category: "health",
    icon: "💪",
    summary:
      "Build a full-featured fitness and workout tracking app with exercise libraries, progress tracking, and offline support. Perfect for personal trainers, gym owners, or fitness enthusiasts.",
    problemStatement:
      "Building a fitness app from scratch requires months of development, native expertise for iOS and Android, complex state management for workout data, and expensive cloud infrastructure.",
    solution:
      "NextNative provides a pre-built fitness app foundation with workout tracking, offline sync, and real-time progress analytics. Deploy to both platforms using your existing Next.js skills.",
    images: [
      { src: "/showcase/fitness-app-1.png", alt: "Fitness App Mockup 1" },
      { src: "/showcase/fitness-app-2.png", alt: "Fitness App Mockup 2" },
      { src: "/showcase/fitness-app-3.png", alt: "Fitness App Mockup 3" },
      { src: "/showcase/fitness-app-4.png", alt: "Fitness App Mockup 4" },
    ],
    targetAudience: [
      "Personal trainers building client apps",
      "Gym owners creating member apps",
      "Fitness influencers monetizing content",
      "Health tech startups validating MVPs",
      "Developers building fitness SaaS",
    ],
    keyFeatures: [
      {
        icon: "📊",
        title: "Workout Tracking",
        description:
          "Track exercises, sets, reps, and weight in real-time with automatic personal record detection.",
      },
      {
        icon: "🔌",
        title: "Offline-First",
        description:
          "All data stored locally using Capacitor Preferences. Work out anywhere without internet.",
      },
      {
        icon: "🏋️‍♂️",
        title: "Exercise Library",
        description:
          "Browse 20+ exercises categorized by muscle group with descriptions and equipment info.",
      },
      {
        icon: "⏱️",
        title: "Rest Timer",
        description:
          "Built-in rest timer with customizable durations (30s, 60s, 90s, 120s, 180s) between sets.",
      },
      {
        icon: "📈",
        title: "Progress Analytics",
        description:
          "View workout history, personal records, volume tracking, and workout frequency stats.",
      },
      {
        icon: "🎯",
        title: "Workout Plans",
        description:
          "Pre-built workout plans with quick start functionality and custom plan creation.",
      },
    ],
    coreCapabilities: [
      "Real-time workout tracking with sets, reps, weight",
      "Exercise library with 20+ exercises",
      "Personal records (PR) tracking per exercise",
      "Workout history with completed session logs",
      "Quick start empty workouts",
      "Pre-built workout plans",
      "Rest timer with customizable duration",
      "Search and filter exercises by muscle group",
      "Offline data persistence",
      "Dark mode support",
      "Tab navigation (Workouts, Exercises, Progress, Settings)",
    ],
    codeExamples: [
      {
        title: "Workout Tracking State",
        description:
          "Manage workout sessions with real-time updates and offline persistence using local storage.",
        language: "typescript",
        filename: "hooks/use-workout.ts",
        code: `import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

interface Exercise {
  id: string;
  name: string;
  sets: { reps: number; weight: number }[];
}

export function useWorkout() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isActive, setIsActive] = useState(false);

  // Load workout from local storage
  useEffect(() => {
    const loadWorkout = async () => {
      const { value } = await Preferences.get({ key: 'current-workout' });
      if (value) setExercises(JSON.parse(value));
    };
    loadWorkout();
  }, []);

  // Auto-save workout progress
  useEffect(() => {
    if (exercises.length > 0) {
      Preferences.set({
        key: 'current-workout',
        value: JSON.stringify(exercises),
      });
    }
  }, [exercises]);

  const addSet = (exerciseId: string, reps: number, weight: number) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId
          ? { ...ex, sets: [...ex.sets, { reps, weight }] }
          : ex
      )
    );
  };

  return { exercises, isActive, addSet, setIsActive };
}`,
      },
      {
        title: "Personal Record Tracking",
        description:
          "Automatically detect and save personal records when completing sets.",
        language: "typescript",
        filename: "hooks/use-workout.ts",
        code: `const checkPersonalRecord = async (
  exerciseId: string,
  weight: number,
  reps: number
) => {
  const existingRecord = personalRecords.find(
    (record) => record.exerciseId === exerciseId
  );

  const newRecordValue = weight * reps; // Simple PR calculation
  const existingRecordValue = existingRecord
    ? existingRecord.weight * existingRecord.reps
    : 0;

  if (newRecordValue > existingRecordValue) {
    const newRecord: PersonalRecord = {
      exerciseId,
      weight,
      reps,
      date: Date.now(),
    };

    const updatedRecords = existingRecord
      ? personalRecords.map((record) =>
          record.exerciseId === exerciseId ? newRecord : record
        )
      : [...personalRecords, newRecord];

    setPersonalRecords(updatedRecords);
    await Preferences.set({
      key: STORAGE_KEYS.PERSONAL_RECORDS,
      value: JSON.stringify(updatedRecords),
    });
  }
};`,
      },
      {
        title: "Offline Data Persistence",
        description:
          "Store workout data locally using Capacitor Preferences for offline-first experience.",
        language: "typescript",
        filename: "hooks/use-workout.ts",
        code: `import { Preferences } from '@capacitor/preferences';

const STORAGE_KEYS = {
  WORKOUT_SESSIONS: 'fitness-workout-sessions',
  WORKOUT_PLANS: 'fitness-workout-plans',
  PERSONAL_RECORDS: 'fitness-personal-records',
  CURRENT_WORKOUT: 'fitness-current-workout',
};

// Load all data from storage
const loadAllData = async () => {
  // Load workout sessions
  const sessionsResult = await Preferences.get({
    key: STORAGE_KEYS.WORKOUT_SESSIONS,
  });
  if (sessionsResult.value) {
    setWorkoutSessions(JSON.parse(sessionsResult.value));
  }

  // Load personal records
  const recordsResult = await Preferences.get({
    key: STORAGE_KEYS.PERSONAL_RECORDS,
  });
  if (recordsResult.value) {
    setPersonalRecords(JSON.parse(recordsResult.value));
  }
};

// Save workout session
const completeWorkout = async () => {
  const completedWorkout = {
    ...currentWorkout,
    endTime: Date.now(),
    isCompleted: true,
  };

  const updatedSessions = [completedWorkout, ...workoutSessions];
  await Preferences.set({
    key: STORAGE_KEYS.WORKOUT_SESSIONS,
    value: JSON.stringify(updatedSessions),
  });
};`,
      },
    ],
    metrics: [
      {
        label: "Development Time",
        value: "2-3 weeks",
        description: "vs 3-6 months building from scratch",
      },
      {
        label: "Cost Savings",
        value: "$25,000+",
        description: "Compared to hiring native iOS/Android developers",
      },
      {
        label: "App Store Ready",
        value: "Day 1",
        description: "Production-ready code with no tech debt",
      },
      {
        label: "Performance",
        value: "60 FPS",
        description: "Native-like performance with smooth animations",
      },
    ],
    timeSavings: "3-6 months",
    costSavings: "$25,000-50,000",
    relatedTutorials: ["convert-nextjs-to-mobile-app"],
    relatedComparisons: ["nextjs-vs-react-native", "pwa-vs-native-app"],
  },
  {
    slug: "food-delivery-app",
    title: "Build a Food Delivery & Restaurant App",
    metaTitle:
      "Food Delivery App Template | Restaurant Ordering App with Next.js",
    metaDescription:
      "Create a food delivery and restaurant ordering app with simulated order tracking, promo codes, and menu customization. Built with Next.js and Capacitor for iOS & Android.",
    category: "commerce",
    icon: "🍔",
    summary:
      "Launch a professional food delivery platform with restaurant menus, simulated order tracking, promo code system, and menu customization. Perfect for restaurants, ghost kitchens, or food delivery startups.",
    problemStatement:
      "Food delivery apps require complex real-time features, payment processing, location tracking, multi-user roles (customers, restaurants, drivers), and must work flawlessly on both iOS and Android.",
    solution:
      "NextNative provides the complete infrastructure for a food delivery app including simulated order tracking, promo code system, menu customization, advanced filtering, and offline-first data persistence.",
    images: [
      {
        src: "/showcase/food-delivery-app-1.png",
        alt: "Food Delivery App Mockup 1",
      },
      {
        src: "/showcase/food-delivery-app-2.png",
        alt: "Food Delivery App Mockup 2",
      },
      {
        src: "/showcase/food-delivery-app-3.png",
        alt: "Food Delivery App Mockup 3",
      },
      {
        src: "/showcase/food-delivery-app-4.png",
        alt: "Food Delivery App Mockup 4",
      },
      {
        src: "/showcase/food-delivery-app-5.png",
        alt: "Food Delivery App Mockup 5",
      },
      {
        src: "/showcase/food-delivery-app-6.png",
        alt: "Food Delivery App Mockup 6",
      },
    ],
    targetAudience: [
      "Restaurant owners going digital",
      "Ghost kitchen operators",
      "Food delivery startups",
      "Cloud kitchen aggregators",
      "Meal prep services",
    ],
    keyFeatures: [
      {
        icon: "🍽️",
        title: "Restaurant Browsing",
        description:
          "Beautiful restaurant cards with images, ratings, delivery time, and availability status.",
      },
      {
        icon: "🔍",
        title: "Advanced Search & Filters",
        description:
          "Multi-criteria filtering by cuisine (12+ types), price range, ratings, delivery time, and dietary options.",
      },
      {
        icon: "🎁",
        title: "Promo Code System",
        description:
          "Full promotional code system with percentage/fixed discounts, expiry dates, and minimum order requirements.",
      },
      {
        icon: "⚙️",
        title: "Menu Customization",
        description:
          "Dynamic item customization (pizza sizes, toppings, special instructions) with live price updates.",
      },
      {
        icon: "📍",
        title: "Order Tracking Simulation",
        description:
          "Order status updates with simulated driver location, delivery time estimates, and status timeline.",
      },
      {
        icon: "⭐",
        title: "Reviews & Ratings",
        description:
          "5-star rating system with written reviews, rating distribution charts, and helpful vote system.",
      },
    ],
    coreCapabilities: [
      "Restaurant browsing with high-quality images",
      "Search restaurants by name and cuisine",
      "Advanced filtering (cuisine, price, rating, delivery time, dietary)",
      "Promo code application with 4 sample codes",
      "Shopping cart with multi-restaurant handling",
      "Menu item customization with dynamic pricing",
      "Real-time order status tracking (6 stages: pending → confirmed → preparing → ready → out-for-delivery → delivered)",
      "Simulated GPS driver location updates",
      "Order history with reorder functionality",
      "Favorite restaurants system",
      "Order rating and feedback",
      "Popular dishes carousel",
      "Stats dashboard (restaurants, cuisines, deals)",
      "Loading skeletons for better UX",
      "Success animations on order placement",
      "Dark mode support",
      "Offline-first data persistence",
    ],
    codeExamples: [
      {
        title: "Order Management with Promo Codes",
        description:
          "Complete order state management with promo code validation and dynamic cart calculations.",
        language: "typescript",
        filename: "hooks/useOrder.ts",
        code: `import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

export function useOrder() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const applyPromoCode = async (code: string): Promise<PromoCode | null> => {
    if (!cart) return null;
    
    const promo = getPromoCode(code);
    if (!promo) return null;

    // Check minimum order requirement
    if (promo.minimumOrder && cart.subtotal < promo.minimumOrder) {
      return null;
    }

    const updatedCart = calculateCart(cart.items, cart.restaurantId, promo);
    setCart(updatedCart);
    
    await Preferences.set({
      key: 'food-delivery-cart',
      value: JSON.stringify(updatedCart),
    });

    return promo;
  };

  const calculateCart = (items, restaurantId, promoCode?) => {
    const subtotal = items.reduce((sum, item) => {
      let itemPrice = item.menuItem.price;
      if (item.customizations) {
        item.customizations.forEach(custom => {
          itemPrice += custom.priceModifier;
        });
      }
      return sum + itemPrice * item.quantity;
    }, 0);

    let discount = 0;
    if (promoCode) {
      discount = promoCode.discountType === 'percentage' 
        ? (subtotal * promoCode.discountValue) / 100
        : promoCode.discountValue;
    }

    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax - discount;

    return { subtotal, tax, discount, total, promoCode };
  };

  return { cart, orders, applyPromoCode };
}`,
      },
      {
        title: "Real-time Order Tracking Simulation",
        description:
          "Simulated order status updates with driver location and visual timeline.",
        language: "typescript",
        filename: "components/OrderTracking.tsx",
        code: `export default function OrderTracking({ order, onCallDriver }) {
  const [driverLocation, setDriverLocation] = useState(order.driverLocation);

  useEffect(() => {
    if (order.status === 'out-for-delivery') {
      // Simulate driver movement every 2 seconds
      const interval = setInterval(() => {
        setDriverLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [order.status]);

  const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 
                          'out-for-delivery', 'delivered'];

  return (
    <div>
      {/* Status Timeline */}
      <div className="space-y-4">
        {ORDER_STATUSES.map(status => (
          <div key={status} className="flex items-center gap-3">
            <CheckCircle2 
              className={status === order.status ? 'text-green-500' : 'text-gray-300'} 
            />
            <span>{STATUS_LABELS[status]}</span>
          </div>
        ))}
      </div>

      {/* Driver Info */}
      {order.driverName && (
        <div className="mt-6">
          <h3>{order.driverName}</h3>
          <p>Lat: {driverLocation.lat.toFixed(4)}, Lng: {driverLocation.lng.toFixed(4)}</p>
          <IonButton onClick={onCallDriver}>Call Driver</IonButton>
        </div>
      )}
    </div>
  );
}`,
      },
      {
        title: "Advanced Filtering System",
        description:
          "Multi-criteria restaurant filtering with dynamic sorting options.",
        language: "typescript",
        filename: "screens/home-screen.tsx",
        code: `export default function HomeScreen() {
  const [filters, setFilters] = useState<FilterOptions>({
    cuisines: [],
    priceRange: { min: 0, max: 50 },
    minRating: undefined,
    maxDeliveryTime: undefined,
    dietary: [],
    sortBy: undefined,
  });

  const applyFilters = (restaurants) => {
    let filtered = restaurants;

    // Cuisine filter
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter(r =>
        r.cuisine.some(c => filters.cuisines.includes(c))
      );
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(r => r.rating >= filters.minRating);
    }

    // Delivery time filter
    if (filters.maxDeliveryTime) {
      filtered = filtered.filter(r => {
        const time = parseInt(r.deliveryTime.split('-')[1]);
        return time <= filters.maxDeliveryTime;
      });
    }

    // Sort
    if (filters.sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'delivery-time') {
      filtered = [...filtered].sort((a, b) => 
        parseInt(a.deliveryTime.split('-')[0]) - 
        parseInt(b.deliveryTime.split('-')[0])
      );
    }

    return filtered;
  };

  return (
    <FilterModal currentFilters={filters} onApply={setFilters} />
  );
}`,
      },
    ],
    metrics: [
      {
        label: "Time to Launch",
        value: "3-4 weeks",
        description: "vs 6-12 months for custom development",
      },
      {
        label: "Development Cost",
        value: "$30,000+",
        description: "Saved compared to agency pricing",
      },
      // {
      //   label: "Order Processing",
      //   value: "<2 seconds",
      //   description: "Fast checkout experience",
      // },
      // {
      //   label: "Uptime",
      //   value: "99.9%",
      //   description: "Reliable service during peak hours",
      // },
    ],
    timeSavings: "6-12 months",
    costSavings: "$30,000-80,000",
    relatedTutorials: ["convert-nextjs-to-mobile-app"],
    relatedComparisons: ["capacitor-vs-react-native"],
  },
  {
    slug: "ai-plant-identifier-app",
    title: "Build an AI Plant Identification App",
    metaTitle:
      "AI Plant Identifier App Template | Build Plant Recognition App with Next.js",
    metaDescription:
      "Create an AI-powered plant identification app with camera integration, history tracking, and premium subscriptions. Built with Next.js, Capacitor, and RevenueCat for iOS & Android.",
    category: "education",
    icon: "🌱",
    summary:
      "Launch an AI-powered plant identification app that uses camera or gallery photos to identify plants, provides care instructions, and includes a freemium monetization model with RevenueCat subscriptions.",
    problemStatement:
      "Building an AI-powered mobile app requires integrating AI services, camera APIs, secure backend endpoints, subscription management, device identification, and maintaining a freemium model - all while working across iOS and Android.",
    solution:
      "NextNative provides a complete AI plant identifier foundation with Capacitor Camera integration, secure API endpoints, RevenueCat subscription management, device-based free generation limits, and offline history storage.",
    images: [
      {
        src: "/showcase/sproutly-1.png",
        alt: "AI Plant Identifier App Mockup 1",
        isDark: true,
      },
      {
        src: "/showcase/sproutly-2.png",
        alt: "AI Plant Identifier App Mockup 2",
      },
      {
        src: "/showcase/sproutly-3.png",
        alt: "AI Plant Identifier App Mockup 3",
        isDark: true,
      },
      {
        src: "/showcase/sproutly-4.png",
        alt: "AI Plant Identifier App Mockup 4",
        isDark: true,
      },
      {
        src: "/showcase/sproutly-5.png",
        alt: "AI Plant Identifier App Mockup 5",
      },
      {
        src: "/showcase/sproutly-6.png",
        alt: "AI Plant Identifier App Mockup 6",
      },
    ],
    targetAudience: [
      "Indie developers building AI apps",
      "Gardening enthusiasts creating tools",
      "EdTech startups in nature/science",
      "Developers learning AI integration",
      "Entrepreneurs validating AI product ideas",
    ],
    keyFeatures: [
      {
        icon: "📸",
        title: "Camera Integration",
        description:
          "Capture plant photos with device camera or upload from gallery using Capacitor Camera API with base64 data URLs for persistence.",
      },
      {
        icon: "🤖",
        title: "AI Plant Identification",
        description:
          "Identify plants via secure backend API that returns plant name, scientific name, family, care instructions, and interesting facts.",
      },
      {
        icon: "💎",
        title: "RevenueCat Subscriptions",
        description:
          "Weekly and annual subscription plans with automatic pricing, purchase handling, and restoration using RevenueCat SDK.",
      },
      {
        icon: "🎁",
        title: "Freemium Model",
        description:
          "Device-based free generation tracking with backend API that limits non-premium users while allowing unlimited access for subscribers.",
      },
      {
        icon: "📜",
        title: "Identification History",
        description:
          "Offline-first history storage with plant images, identification data, timestamps, and ability to view or delete past identifications.",
      },
      {
        icon: "🌿",
        title: "Care Instructions",
        description:
          "Display detailed plant care information including light, water, soil, temperature requirements, and interesting facts about each species.",
      },
    ],
    coreCapabilities: [
      "Capacitor Camera integration (photo & gallery)",
      "Base64 image data persistence across app restarts",
      "AI plant identification via backend API",
      "Device ID-based free generation limits",
      "RevenueCat subscription management (weekly/annual)",
      "Premium status detection and unlimited access",
      "Automatic purchase restoration",
      "Offline plant history storage",
      "Plant data display with confidence levels",
      "Delete history items",
      "Premium upsell modals",
      "Dark mode support",
      "Tab navigation (Identify, History, Settings)",
    ],
    codeExamples: [
      {
        title: "Camera Integration with Capacitor",
        description:
          "Capture photos using Capacitor Camera API with persistent base64 data URLs.",
        language: "typescript",
        filename: "screens/identify-screen.tsx",
        code: `import { Camera, CameraResultType } from '@capacitor/camera';

const handleCamera = async () => {
  try {
    const photo = await Camera.getPhoto({
      promptLabelHeader: 'Choose a photo',
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Use DataUrl for persistence
    });

    // photo.dataUrl is a base64 data URL that persists across app restarts
    const photoData = photo.dataUrl;

    if (photoData) {
      setPhoto(photoData);
      await identifyPlant(photoData);
    }
  } catch (error) {
    console.error('Error taking photo:', error);
  }
};`,
      },
      {
        title: "Device-Based Free Generations",
        description:
          "Track free generation limits per device using Capacitor Device ID and backend API.",
        language: "typescript",
        filename: "hooks/useFreeGenerations.ts",
        code: `import { Device } from '@capacitor/device';
import { useState, useEffect } from 'react';

export const useFreeGenerations = () => {
  const [deviceId, setDeviceId] = useState<string>('');
  const [remainingGenerations, setRemainingGenerations] = useState(0);

  useEffect(() => {
    const getDeviceId = async () => {
      const info = await Device.getId();
      setDeviceId(info.identifier);
    };
    getDeviceId();
  }, []);

  const fetchFreeGenerations = async () => {
    const response = await fetch(
      \`/api/free-generations?deviceId=\${deviceId}\`
    );
    const data = await response.json();
    setRemainingGenerations(data.remainingGenerations);
  };

  const hasRemainingGenerations = remainingGenerations > 0;

  return { 
    deviceId, 
    remainingGenerations, 
    hasRemainingGenerations,
    refreshFreeGenerations: fetchFreeGenerations 
  };
};`,
      },
      {
        title: "RevenueCat Subscription Integration",
        description:
          "Implement premium subscriptions with purchase and restore functionality using RevenueCat.",
        language: "typescript",
        filename: "screens/premium-screen.tsx",
        code: `import { useRevenueCat } from '@/services/revenue-cat';

function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'annually'>('weekly');
  
  const { 
    isPro, 
    purchase, 
    restore, 
    pricing 
  } = useRevenueCat();

  const handlePurchase = async () => {
    try {
      await purchase(selectedPlan);
      toast.success('Purchase successful! Enjoy premium features.');
    } catch (err) {
      console.error('Purchase failed:', err);
    }
  };

  const handleRestore = async () => {
    try {
      await restore();
      if (isPro) {
        toast.success('Premium access restored successfully!');
      } else {
        toast.error('No previous purchases found.');
      }
    } catch (err) {
      console.error('Restore failed:', err);
    }
  };

  return (
    <div>
      <h1>Sproutly Premium</h1>
      <p>Price: {pricing?.weekly?.price || 'Loading...'}</p>
      <button onClick={handlePurchase}>Subscribe</button>
      <button onClick={handleRestore}>Restore Purchases</button>
    </div>
  );
}`,
      },
    ],
    metrics: [
      {
        label: "Development Time",
        value: "1-2 weeks",
        description: "vs 2-4 months building from scratch",
      },
      {
        label: "Cost Savings",
        value: "$15,000+",
        description: "Compared to custom AI app development",
      },
      {
        label: "Monetization",
        value: "Day 1",
        description: "RevenueCat subscriptions ready to use",
      },
      {
        label: "AI Integration",
        value: "Pre-built",
        description: "Secure backend API with AI service integration",
      },
    ],
    timeSavings: "2-4 months",
    costSavings: "$15,000-30,000",
    relatedTutorials: [
      "convert-nextjs-to-mobile-app",
      "setup-in-app-purchases",
    ],
    relatedComparisons: ["nextjs-vs-react-native", "pwa-vs-native-app"],
  },

  //   {
  //     slug: "social-media-app",
  //     title: "Build a Social Media & Community App",
  //     metaTitle: "Social Media App Template | Community Platform with Next.js",
  //     metaDescription:
  //       "Create a social media app with feeds, messaging, media sharing, and engagement features. Built with Next.js and Capacitor. Deploy to iOS & Android.",
  //     category: "social",
  //     icon: "📱",
  //     summary:
  //       "Build an engaging social media platform with real-time feeds, direct messaging, photo/video sharing, and community features. Perfect for niche communities, influencer platforms, or social startups.",
  //     problemStatement:
  //       "Social apps need real-time updates, media handling, push notifications, infinite scrolling, complex engagement features, and must handle high concurrent users across iOS and Android.",
  //     solution:
  //       "NextNative provides a battle-tested social media foundation with real-time feeds, media upload, push notifications, messaging, and all the infrastructure you need to launch a successful social platform.",
  //     targetAudience: [
  //       "Community builders and creators",
  //       "Niche social network founders",
  //       "Influencers building platforms",
  //       "Social commerce startups",
  //       "Content creator platforms",
  //     ],
  //     keyFeatures: [
  //       {
  //         icon: "📸",
  //         title: "Media Sharing",
  //         description:
  //           "Upload photos and videos with the device camera or gallery. Automatic compression and optimization.",
  //       },
  //       {
  //         icon: "💬",
  //         title: "Real-time Chat",
  //         description:
  //           "Direct messaging with typing indicators, read receipts, and message reactions.",
  //       },
  //       {
  //         icon: "🔔",
  //         title: "Engagement Alerts",
  //         description:
  //           "Push notifications for likes, comments, follows, and mentions to drive engagement.",
  //       },
  //       {
  //         icon: "♾️",
  //         title: "Infinite Scroll Feed",
  //         description:
  //           "Smooth infinite scrolling with virtualized lists for optimal performance.",
  //       },
  //       {
  //         icon: "👤",
  //         title: "User Profiles",
  //         description:
  //           "Customizable profiles with bio, stats, followers, and content galleries.",
  //       },
  //       {
  //         icon: "🔍",
  //         title: "Discovery & Search",
  //         description:
  //           "Search users, hashtags, and content with trending topics and recommendations.",
  //       },
  //     ],
  //     coreCapabilities: [
  //       "Photo and video posting",
  //       "Story/ephemeral content",
  //       "Comments and reactions",
  //       "Follow/unfollow system",
  //       "Content moderation tools",
  //       "Hashtag trending",
  //       "Share to external platforms",
  //       "Block and report users",
  //       "Analytics dashboard",
  //     ],
  //     codeExamples: [
  //       {
  //         title: "Camera Integration",
  //         description: "Capture photos or videos and upload to your social feed.",
  //         language: "typescript",
  //         filename: "components/camera-capture.tsx",
  //         code: `import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

  // export async function capturePhoto() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Camera,
  //   });

  //   // Upload to your backend
  //   const response = await fetch('/api/upload', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       image: image.base64String,
  //       format: image.format,
  //     }),
  //   });

  //   const { url } = await response.json();
  //   return url;
  // }

  // export async function pickFromGallery() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Photos,
  //   });

  //   return image.base64String;
  // }`,
  //       },
  //       {
  //         title: "Infinite Scroll Feed",
  //         description: "Implement performant infinite scrolling with pagination.",
  //         language: "typescript",
  //         filename: "components/feed.tsx",
  //         code: `import { useInfiniteQuery } from '@tanstack/react-query';
  // import { useInView } from 'react-intersection-observer';

  // export function Feed() {
  //   const { ref, inView } = useInView();

  //   const {
  //     data,
  //     fetchNextPage,
  //     hasNextPage,
  //     isFetchingNextPage,
  //   } = useInfiniteQuery({
  //     queryKey: ['feed'],
  //     queryFn: ({ pageParam = 0 }) =>
  //       fetch(\`/api/posts?page=\${pageParam}\`).then(r => r.json()),
  //     getNextPageParam: (lastPage, pages) =>
  //       lastPage.hasMore ? pages.length : undefined,
  //   });

  //   useEffect(() => {
  //     if (inView && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   }, [inView, hasNextPage]);

  //   return (
  //     <div>
  //       {data?.pages.map((page) =>
  //         page.posts.map((post) => (
  //           <PostCard key={post.id} post={post} />
  //         ))
  //       )}
  //       <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
  //     </div>
  //   );
  // }`,
  //       },
  //       {
  //         title: "Real-time Notifications",
  //         description:
  //           "Subscribe to engagement events and show instant notifications.",
  //         language: "typescript",
  //         filename: "lib/notifications.ts",
  //         code: `import { PushNotifications } from '@capacitor/push-notifications';

  // export async function setupPushNotifications() {
  //   // Request permission
  //   const permission = await PushNotifications.requestPermissions();

  //   if (permission.receive === 'granted') {
  //     await PushNotifications.register();
  //   }

  //   // Listen for new notifications
  //   PushNotifications.addListener('pushNotificationReceived',
  //     (notification) => {
  //       console.log('New like/comment:', notification);
  //       // Update UI in real-time
  //       updateNotificationBadge();
  //     }
  //   );

  //   // Handle notification tap
  //   PushNotifications.addListener('pushNotificationActionPerformed',
  //     (notification) => {
  //       const { type, postId } = notification.notification.data;

  //       if (type === 'like') {
  //         navigate(\`/post/\${postId}\`);
  //       } else if (type === 'follow') {
  //         navigate('/profile/followers');
  //       }
  //     }
  //   );
  // }`,
  //       },
  //     ],
  //     metrics: [
  //       {
  //         label: "Development Time",
  //         value: "4-6 weeks",
  //         description: "vs 6-12 months from scratch",
  //       },
  //       {
  //         label: "Cost Savings",
  //         value: "$40,000+",
  //         description: "Compared to custom development",
  //       },
  //       {
  //         label: "Feed Performance",
  //         value: "60 FPS",
  //         description: "Smooth scrolling with thousands of posts",
  //       },
  //       {
  //         label: "Image Upload",
  //         value: "<3 seconds",
  //         description: "Fast media processing and delivery",
  //       },
  //     ],
  //     timeSavings: "6-12 months",
  //     costSavings: "$40,000-100,000",
  //     relatedTutorials: [
  //       "convert-nextjs-to-mobile-app",
  //       "add-push-notifications-nextjs",
  //     ],
  //     relatedComparisons: [
  //       "nextjs-capacitor-vs-react-native",
  //       "pwa-vs-native-app",
  //     ],
  //   },
  //   {
  //     slug: "ecommerce-app",
  //     title: "Build an E-commerce & Shopping App",
  //     metaTitle: "E-commerce App Template | Mobile Shopping App with Next.js",
  //     metaDescription:
  //       "Create a professional e-commerce shopping app with product catalog, cart, checkout, and order tracking. Built with Next.js and Capacitor for iOS & Android.",
  //     category: "commerce",
  //     icon: "🛍️",
  //     summary:
  //       "Launch a complete mobile shopping experience with product browsing, cart management, secure checkout, order tracking, and customer accounts. Perfect for retailers, brands, or e-commerce startups.",
  //     problemStatement:
  //       "E-commerce apps require product catalogs, cart persistence, payment security, inventory sync, push notifications for deals, and seamless checkout across mobile platforms.",
  //     solution:
  //       "NextNative provides a production-ready e-commerce foundation with Stripe integration, cart management, push notifications for abandoned carts, and offline product browsing.",
  //     targetAudience: [
  //       "Online retailers going mobile",
  //       "Shopify/WooCommerce store owners",
  //       "Direct-to-consumer brands",
  //       "Marketplace builders",
  //       "Dropshipping businesses",
  //     ],
  //     keyFeatures: [
  //       {
  //         icon: "🛒",
  //         title: "Smart Shopping Cart",
  //         description:
  //           "Persistent cart across devices with saved items and price alerts.",
  //       },
  //       {
  //         icon: "💳",
  //         title: "Secure Checkout",
  //         description:
  //           "PCI-compliant payments with Stripe, Apple Pay, and Google Pay support.",
  //       },
  //       {
  //         icon: "🔍",
  //         title: "Product Search",
  //         description:
  //           "Advanced search and filtering with category browsing and recommendations.",
  //       },
  //       {
  //         icon: "📦",
  //         title: "Order Tracking",
  //         description:
  //           "Real-time order status updates and shipping notifications.",
  //       },
  //       {
  //         icon: "❤️",
  //         title: "Wishlist & Favorites",
  //         description:
  //           "Save products for later with price drop alerts and back-in-stock notifications.",
  //       },
  //       {
  //         icon: "🎯",
  //         title: "Personalization",
  //         description:
  //           "Personalized product recommendations based on browsing and purchase history.",
  //       },
  //     ],
  //     coreCapabilities: [
  //       "Product catalog with variants",
  //       "Review and rating system",
  //       "Discount codes and promotions",
  //       "Multiple shipping options",
  //       "Guest checkout option",
  //       "Order history and reordering",
  //       "Customer support chat",
  //       "Inventory management",
  //       "Sales analytics dashboard",
  //     ],
  //     codeExamples: [
  //       {
  //         title: "Shopping Cart State",
  //         description:
  //           "Manage shopping cart with persistence and price calculations.",
  //         language: "typescript",
  //         filename: "hooks/use-cart.ts",
  //         code: `import { create } from 'zustand';
  // import { persist } from 'zustand/middleware';

  // interface CartItem {
  //   id: string;
  //   name: string;
  //   price: number;
  //   quantity: number;
  //   variant?: string;
  // }

  // interface CartStore {
  //   items: CartItem[];
  //   addItem: (item: CartItem) => void;
  //   removeItem: (id: string) => void;
  //   updateQuantity: (id: string, quantity: number) => void;
  //   clearCart: () => void;
  //   total: () => number;
  // }

  // export const useCart = create<CartStore>()(
  //   persist(
  //     (set, get) => ({
  //       items: [],

  //       addItem: (item) =>
  //         set((state) => {
  //           const existing = state.items.find(i => i.id === item.id);
  //           if (existing) {
  //             return {
  //               items: state.items.map(i =>
  //                 i.id === item.id
  //                   ? { ...i, quantity: i.quantity + item.quantity }
  //                   : i
  //               ),
  //             };
  //           }
  //           return { items: [...state.items, item] };
  //         }),

  //       removeItem: (id) =>
  //         set((state) => ({
  //           items: state.items.filter(i => i.id !== id),
  //         })),

  //       updateQuantity: (id, quantity) =>
  //         set((state) => ({
  //           items: state.items.map(i =>
  //             i.id === id ? { ...i, quantity } : i
  //           ),
  //         })),

  //       clearCart: () => set({ items: [] }),

  //       total: () =>
  //         get().items.reduce((sum, item) =>
  //           sum + item.price * item.quantity, 0
  //         ),
  //     }),
  //     { name: 'shopping-cart' }
  //   )
  // );`,
  //       },
  //       {
  //         title: "Stripe Payment Integration",
  //         description:
  //           "Process secure payments with Stripe and Apple/Google Pay.",
  //         language: "typescript",
  //         filename: "app/checkout/payment.tsx",
  //         code: `import { loadStripe } from '@stripe/stripe-js';
  // import { Elements, PaymentElement } from '@stripe/react-stripe-js';

  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  // export function CheckoutForm({ amount }: { amount: number }) {
  //   const [clientSecret, setClientSecret] = useState('');

  //   useEffect(() => {
  //     // Create payment intent
  //     fetch('/api/create-payment-intent', {
  //       method: 'POST',
  //       body: JSON.stringify({ amount }),
  //     })
  //       .then(res => res.json())
  //       .then(data => setClientSecret(data.clientSecret));
  //   }, [amount]);

  //   const handleSubmit = async (event: FormEvent) => {
  //     event.preventDefault();

  //     const stripe = await stripePromise;
  //     const { error } = await stripe!.confirmPayment({
  //       clientSecret,
  //       confirmParams: {
  //         return_url: 'https://yourapp.com/order-confirmation',
  //       },
  //     });

  //     if (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   return (
  //     <Elements stripe={stripePromise} options={{ clientSecret }}>
  //       <form onSubmit={handleSubmit}>
  //         <PaymentElement />
  //         <button type="submit">Pay \${amount}</button>
  //       </form>
  //     </Elements>
  //   );
  // }`,
  //       },
  //     ],
  //     metrics: [
  //       {
  //         label: "Launch Time",
  //         value: "2-4 weeks",
  //         description: "vs 4-8 months custom development",
  //       },
  //       {
  //         label: "Cost Savings",
  //         value: "$35,000+",
  //         description: "Compared to agency development",
  //       },
  //       {
  //         label: "Checkout Speed",
  //         value: "<5 seconds",
  //         description: "Fast, frictionless purchase experience",
  //       },
  //       {
  //         label: "Conversion Rate",
  //         value: "+40%",
  //         description: "Higher than mobile web checkout",
  //       },
  //     ],
  //     timeSavings: "4-8 months",
  //     costSavings: "$35,000-75,000",
  //     relatedTutorials: [
  //       "convert-nextjs-to-mobile-app",
  //       "setup-in-app-purchases",
  //     ],
  //     relatedComparisons: ["nextjs-capacitor-vs-flutter", "pwa-vs-native-app"],
  //   },
  //   {
  //     slug: "education-app",
  //     title: "Build an Education & E-learning App",
  //     metaTitle: "Education App Template | E-learning Platform with Next.js",
  //     metaDescription:
  //       "Create an education and e-learning app with courses, quizzes, progress tracking, and offline content. Built with Next.js and Capacitor for iOS & Android.",
  //     category: "education",
  //     icon: "📚",
  //     summary:
  //       "Build a comprehensive e-learning platform with video courses, interactive quizzes, progress tracking, certificates, and offline learning. Perfect for educators, course creators, or edtech startups.",
  //     problemStatement:
  //       "Education apps need video streaming, offline content downloads, progress tracking, quiz engines, certificates, payment for courses, and work across all devices.",
  //     solution:
  //       "NextNative provides a complete e-learning infrastructure with video hosting, offline downloads, quiz builder, progress tracking, and certificate generation ready to deploy.",
  //     targetAudience: [
  //       "Online course creators",
  //       "Educational institutions",
  //       "Corporate training programs",
  //       "Tutoring services",
  //       "Certification providers",
  //     ],
  //     keyFeatures: [
  //       {
  //         icon: "🎥",
  //         title: "Video Courses",
  //         description:
  //           "Stream HD video lessons with adaptive bitrate and offline downloads.",
  //       },
  //       {
  //         icon: "✅",
  //         title: "Interactive Quizzes",
  //         description:
  //           "Multiple choice, true/false, and fill-in-the-blank questions with instant feedback.",
  //       },
  //       {
  //         icon: "📈",
  //         title: "Progress Tracking",
  //         description:
  //           "Track course completion, quiz scores, and learning streaks with beautiful analytics.",
  //       },
  //       {
  //         icon: "🏆",
  //         title: "Certificates",
  //         description:
  //           "Generate and share completion certificates for finished courses.",
  //       },
  //       {
  //         icon: "📱",
  //         title: "Offline Learning",
  //         description:
  //           "Download courses and study anywhere without internet connection.",
  //       },
  //       {
  //         icon: "👨‍🏫",
  //         title: "Instructor Tools",
  //         description:
  //           "Course creation, student analytics, and messaging built-in.",
  //       },
  //     ],
  //     coreCapabilities: [
  //       "Course curriculum builder",
  //       "Live class scheduling",
  //       "Discussion forums",
  //       "Assignment submissions",
  //       "Peer reviews",
  //       "Leaderboards and gamification",
  //       "Study reminders",
  //       "Note-taking during videos",
  //       "Course recommendations",
  //     ],
  //     codeExamples: [
  //       {
  //         title: "Offline Course Downloads",
  //         description:
  //           "Download video content for offline viewing using Capacitor Filesystem.",
  //         language: "typescript",
  //         filename: "lib/offline-content.ts",
  //         code: `import { Filesystem, Directory } from '@capacitor/filesystem';
  // import { Capacitor } from '@capacitor/core';

  // export async function downloadCourseVideo(
  //   videoUrl: string,
  //   courseId: string,
  //   lessonId: string
  // ) {
  //   const response = await fetch(videoUrl);
  //   const blob = await response.blob();
  //   const base64 = await blobToBase64(blob);

  //   const fileName = \`\${courseId}-\${lessonId}.mp4\`;

  //   await Filesystem.writeFile({
  //     path: \`courses/\${fileName}\`,
  //     data: base64,
  //     directory: Directory.Data,
  //   });

  //   return fileName;
  // }

  // export async function getOfflineVideo(
  //   courseId: string,
  //   lessonId: string
  // ) {
  //   const fileName = \`\${courseId}-\${lessonId}.mp4\`;

  //   const file = await Filesystem.readFile({
  //     path: \`courses/\${fileName}\`,
  //     directory: Directory.Data,
  //   });

  //   return Capacitor.convertFileSrc(file.data);
  // }

  // function blobToBase64(blob: Blob): Promise<string> {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result as string);
  //     reader.readAsDataURL(blob);
  //   });
  // }`,
  //       },
  //       {
  //         title: "Quiz Engine",
  //         description:
  //           "Interactive quiz system with scoring and instant feedback.",
  //         language: "typescript",
  //         filename: "components/quiz.tsx",
  //         code: `interface Question {
  //   id: string;
  //   question: string;
  //   options: string[];
  //   correctAnswer: number;
  //   explanation: string;
  // }

  // export function Quiz({ questions }: { questions: Question[] }) {
  //   const [currentQuestion, setCurrentQuestion] = useState(0);
  //   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  //   const [score, setScore] = useState(0);
  //   const [showResult, setShowResult] = useState(false);

  //   const handleAnswer = (answerIndex: number) => {
  //     setSelectedAnswer(answerIndex);

  //     if (answerIndex === questions[currentQuestion].correctAnswer) {
  //       setScore(score + 1);
  //     }
  //   };

  //   const nextQuestion = () => {
  //     if (currentQuestion < questions.length - 1) {
  //       setCurrentQuestion(currentQuestion + 1);
  //       setSelectedAnswer(null);
  //     } else {
  //       setShowResult(true);
  //       // Save score to backend
  //       saveQuizResult(score, questions.length);
  //     }
  //   };

  //   if (showResult) {
  //     return (
  //       <div>
  //         <h2>Quiz Complete!</h2>
  //         <p>Your score: {score}/{questions.length}</p>
  //         <p>Percentage: {(score / questions.length * 100).toFixed(0)}%</p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div>
  //       <h3>{questions[currentQuestion].question}</h3>
  //       {questions[currentQuestion].options.map((option, index) => (
  //         <button
  //           key={index}
  //           onClick={() => handleAnswer(index)}
  //           disabled={selectedAnswer !== null}
  //         >
  //           {option}
  //         </button>
  //       ))}
  //       {selectedAnswer !== null && (
  //         <div>
  //           <p>{questions[currentQuestion].explanation}</p>
  //           <button onClick={nextQuestion}>Next</button>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }`,
  //       },
  //     ],
  //     metrics: [
  //       {
  //         label: "Development Time",
  //         value: "3-5 weeks",
  //         description: "vs 5-10 months from scratch",
  //       },
  //       {
  //         label: "Cost Savings",
  //         value: "$30,000+",
  //         description: "Compared to custom LMS development",
  //       },
  //       {
  //         label: "Video Streaming",
  //         value: "99.9% uptime",
  //         description: "Reliable course delivery",
  //       },
  //       {
  //         label: "Student Engagement",
  //         value: "+60%",
  //         description: "vs web-only platforms",
  //       },
  //     ],
  //     timeSavings: "5-10 months",
  //     costSavings: "$30,000-70,000",
  //     relatedTutorials: [
  //       "convert-nextjs-to-mobile-app",
  //       "add-push-notifications-nextjs",
  //       "setup-in-app-purchases",
  //     ],
  //     relatedComparisons: ["nextjs-capacitor-vs-react-native"],
  //   },
  //   {
  //     slug: "productivity-app",
  //     title: "Build a Productivity & Task Management App",
  //     metaTitle:
  //       "Productivity App Template | Task Manager with Next.js & Capacitor",
  //     metaDescription:
  //       "Create a productivity and task management app with to-do lists, reminders, calendar sync, and collaboration. Built with Next.js and Capacitor for iOS & Android.",
  //     category: "productivity",
  //     icon: "✅",
  //     summary:
  //       "Build a powerful productivity app with task management, reminders, calendar integration, team collaboration, and offline sync. Perfect for productivity startups or SaaS founders.",
  //     problemStatement:
  //       "Productivity apps require complex state management, offline sync, push notifications, calendar integration, recurring tasks, and seamless collaboration features.",
  //     solution:
  //       "NextNative provides a complete productivity foundation with task management, notification scheduling, offline sync, calendar integration, and real-time collaboration.",
  //     targetAudience: [
  //       "Productivity SaaS founders",
  //       "Team collaboration tool builders",
  //       "Freelancers building client tools",
  //       "Project management startups",
  //       "Personal productivity entrepreneurs",
  //     ],
  //     keyFeatures: [
  //       {
  //         icon: "📝",
  //         title: "Task Management",
  //         description:
  //           "Create, organize, and prioritize tasks with tags, due dates, and subtasks.",
  //       },
  //       {
  //         icon: "🔔",
  //         title: "Smart Reminders",
  //         description:
  //           "Location-based and time-based reminders with recurring task support.",
  //       },
  //       {
  //         icon: "📅",
  //         title: "Calendar Sync",
  //         description:
  //           "Sync with device calendar and view tasks in calendar view.",
  //       },
  //       {
  //         icon: "👥",
  //         title: "Team Collaboration",
  //         description:
  //           "Share tasks, assign to team members, and track progress together.",
  //       },
  //       {
  //         icon: "🔄",
  //         title: "Offline Sync",
  //         description:
  //           "Work offline and sync changes when back online automatically.",
  //       },
  //       {
  //         icon: "📊",
  //         title: "Productivity Analytics",
  //         description:
  //           "Track completion rates, time spent, and productivity trends.",
  //       },
  //     ],
  //     coreCapabilities: [
  //       "Project and list organization",
  //       "Priority levels and tags",
  //       "Recurring tasks",
  //       "Attachments and notes",
  //       "Task templates",
  //       "Pomodoro timer",
  //       "Focus mode",
  //       "Export to CSV/PDF",
  //       "Dark mode support",
  //     ],
  //     codeExamples: [
  //       {
  //         title: "Task Reminder System",
  //         description:
  //           "Schedule local notifications for task reminders and recurring tasks.",
  //         language: "typescript",
  //         filename: "lib/reminders.ts",
  //         code: `import { LocalNotifications } from '@capacitor/local-notifications';

  // export async function scheduleTaskReminder(
  //   taskId: string,
  //   title: string,
  //   dueDate: Date,
  //   recurring?: 'daily' | 'weekly' | 'monthly'
  // ) {
  //   const schedule = recurring
  //     ? { every: recurring, on: { hour: dueDate.getHours(), minute: dueDate.getMinutes() } }
  //     : { at: dueDate };

  //   await LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         id: parseInt(taskId),
  //         title: 'Task Reminder ⏰',
  //         body: title,
  //         schedule,
  //         actionTypeId: 'TASK_REMINDER',
  //         extra: { taskId },
  //       },
  //     ],
  //   });
  // }

  // export async function cancelTaskReminder(taskId: string) {
  //   await LocalNotifications.cancel({
  //     notifications: [{ id: parseInt(taskId) }],
  //   });
  // }

  // // Handle reminder tap
  // LocalNotifications.addListener('localNotificationActionPerformed',
  //   async (notification) => {
  //     const { taskId } = notification.notification.extra;
  //     // Navigate to task detail
  //     window.location.href = \`/tasks/\${taskId}\`;
  //   }
  // );`,
  //       },
  //       {
  //         title: "Offline Task Sync",
  //         description:
  //           "Manage tasks offline and sync changes when connection returns.",
  //         language: "typescript",
  //         filename: "hooks/use-tasks.ts",
  //         code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  // import { Preferences } from '@capacitor/preferences';
  // import { Network } from '@capacitor/network';

  // export function useTasks() {
  //   const queryClient = useQueryClient();

  //   // Load tasks from cache first
  //   const { data: tasks } = useQuery({
  //     queryKey: ['tasks'],
  //     queryFn: async () => {
  //       const status = await Network.getStatus();

  //       if (status.connected) {
  //         const response = await fetch('/api/tasks');
  //         const data = await response.json();
  //         // Cache for offline use
  //         await Preferences.set({
  //           key: 'tasks-cache',
  //           value: JSON.stringify(data),
  //         });
  //         return data;
  //       } else {
  //         // Load from cache when offline
  //         const { value } = await Preferences.get({ key: 'tasks-cache' });
  //         return value ? JSON.parse(value) : [];
  //       }
  //     },
  //   });

  //   const createTask = useMutation({
  //     mutationFn: async (task: Task) => {
  //       const status = await Network.getStatus();

  //       if (status.connected) {
  //         return fetch('/api/tasks', {
  //           method: 'POST',
  //           body: JSON.stringify(task),
  //         });
  //       } else {
  //         // Queue for later sync
  //         await queueOfflineChange('create', task);
  //         return task;
  //       }
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['tasks'] });
  //     },
  //   });

  //   return { tasks, createTask };
  // }`,
  //       },
  //     ],
  //     metrics: [
  //       {
  //         label: "Time to Market",
  //         value: "2-3 weeks",
  //         description: "vs 4-6 months custom development",
  //       },
  //       {
  //         label: "Development Cost",
  //         value: "$20,000+",
  //         description: "Saved vs hiring developers",
  //       },
  //       {
  //         label: "Sync Speed",
  //         value: "<1 second",
  //         description: "Fast offline-to-online sync",
  //       },
  //       {
  //         label: "User Retention",
  //         value: "+50%",
  //         description: "vs web-only alternatives",
  //       },
  //     ],
  //     timeSavings: "4-6 months",
  //     costSavings: "$20,000-50,000",
  //     relatedTutorials: [
  //       "convert-nextjs-to-mobile-app",
  //       "add-push-notifications-nextjs",
  //     ],
  //     relatedComparisons: [
  //       "nextjs-capacitor-vs-react-native",
  //       "pwa-vs-native-app",
  //     ],
  //   },
];
