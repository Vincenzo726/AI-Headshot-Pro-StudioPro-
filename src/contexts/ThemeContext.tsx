import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (userId?: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme, userId }: { children: React.ReactNode; initialTheme?: Theme; userId?: string }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('studio-pro-theme');
    return (saved as Theme) || initialTheme || 'light';
  });

  useEffect(() => {
    if (initialTheme && !localStorage.getItem('studio-pro-theme')) {
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('studio-pro-theme', theme);
  }, [theme]);

  const toggleTheme = async (uid?: string) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (uid) {
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { theme: newTheme });
      } catch (err) {
        console.error("Failed to save theme preference:", err);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
