import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import { Loader2 } from 'lucide-react';

// Components
import Auth from './components/Auth';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Generate } from './components/Generate';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { Upgrade } from './components/Upgrade';
import { ThemeProvider } from './contexts/ThemeContext';

interface UserData {
  email: string;
  plan: string;
  generations_left: number;
  created_at: any;
  fullName?: string;
  profilePic?: string;
  theme?: 'light' | 'dark';
}

function AppContent({ 
  user, 
  userData, 
  handleLogout 
}: { 
  user: FirebaseUser, 
  userData: UserData | null, 
  handleLogout: () => void 
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Sidebar onLogout={handleLogout} userId={user.uid} profilePic={userData?.profilePic} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Atmospheric background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="atmosphere absolute inset-0" />
        </div>

        <Header user={user} userData={userData} />
        
        <div className="flex-1 overflow-y-auto studio-grid relative z-10">
          <div className="max-w-7xl mx-auto w-full p-6 md:p-10 lg:p-12">
            <Routes>
              <Route path="/" element={<Dashboard user={user} userData={userData} />} />
              <Route path="/generate" element={<Generate user={user} userData={userData} />} />
              <Route path="/history" element={<History />} />
              <Route path="/upgrade" element={<Upgrade user={user} userData={userData} />} />
              <Route path="/settings" element={<Settings user={user} userData={userData} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Mocking user data for now as per "Do NOT use Firestore yet"
        setUserData({
          email: user.email || '',
          plan: 'free',
          generations_left: 3,
          created_at: new Date(),
          fullName: user.displayName || user.email?.split('@')[0] || 'User',
          theme: 'light'
        });
      } else {
        setUserData(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-zinc-900 dark:bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase animate-pulse">Initializing Studio</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <ThemeProvider initialTheme={userData?.theme || 'light'} userId={user.uid}>
      <Router>
        <AppContent 
          user={user} 
          userData={userData} 
          handleLogout={handleLogout} 
        />
      </Router>
    </ThemeProvider>
  );
}
