import { ChevronLeft, Palette, LogIn, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { themes, useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { currentTheme, setTheme } = useTheme();
  const { toast } = useToast();
  const [showThemes, setShowThemes] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleLogin = () => {
    toast({ title: "Google Login", description: "Connect your Google account to sync progress across devices." });
  };

  const handleFacebookLogin = () => {
    toast({ title: "Facebook Login", description: "Connect your Facebook account to sync progress across devices." });
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold">Settings</h1>
          <div className="w-6" />
        </div>

        {/* Theme Section */}
        <button
          onClick={() => { setShowThemes(!showThemes); setShowLogin(false); }}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl gym-gradient-card p-4 transition-transform active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold">Themes</p>
            <p className="text-[10px] text-muted-foreground">Current: {currentTheme.name}</p>
          </div>
        </button>

        {showThemes && (
          <div className="mt-3 grid grid-cols-2 gap-2 animate-fade-in">
            {themes.map((theme) => {
              const isActive = currentTheme.id === theme.id;
              const primaryColor = `hsl(${theme.colors["--primary"]})`;
              const bgColor = `hsl(${theme.colors["--background"]})`;
              const cardColor = `hsl(${theme.colors["--card"]})`;
              return (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`relative flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-300 active:scale-90 ${
                    isActive ? "ring-2 ring-primary scale-[1.02]" : "gym-gradient-card hover:scale-[1.02]"
                  }`}
                  style={isActive ? { background: `linear-gradient(145deg, ${cardColor}, ${bgColor})` } : {}}
                >
                  {isActive && (
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]" style={{ background: primaryColor }}>
                      ✓
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    <div className="h-8 w-8 rounded-lg" style={{ background: primaryColor }} />
                    <div className="h-8 w-8 rounded-lg" style={{ background: bgColor, border: `1px solid hsl(${theme.colors["--border"]})` }} />
                    <div className="h-8 w-8 rounded-lg" style={{ background: cardColor }} />
                  </div>
                  <span className="text-lg">{theme.emoji}</span>
                  <span className="text-[10px] font-semibold">{theme.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Login Section */}
        <button
          onClick={() => { setShowLogin(!showLogin); setShowThemes(false); }}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl gym-gradient-card p-4 transition-transform active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <LogIn className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold">Login & Accounts</p>
            <p className="text-[10px] text-muted-foreground">Sign in to sync your progress</p>
          </div>
        </button>

        {showLogin && (
          <div className="mt-3 space-y-3 animate-fade-in">
            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="flex w-full items-center gap-3 rounded-2xl gym-gradient-card p-4 transition-all active:scale-95 hover:scale-[1.01]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">Sign in with Google</p>
                <p className="text-[10px] text-muted-foreground">Use your Google account</p>
              </div>
            </button>

            {/* Facebook Login */}
            <button
              onClick={handleFacebookLogin}
              className="flex w-full items-center gap-3 rounded-2xl gym-gradient-card p-4 transition-all active:scale-95 hover:scale-[1.01]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">Sign in with Facebook</p>
                <p className="text-[10px] text-muted-foreground">Use your Facebook account</p>
              </div>
            </button>

            {/* Sign Up */}
            <div className="gym-gradient-card rounded-2xl p-4">
              <p className="text-xs font-bold text-center">Don't have an account?</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleGoogleLogin}
                  className="flex-1 rounded-xl gym-gradient-orange py-2.5 text-xs font-bold text-primary-foreground active:scale-95 transition-transform"
                >
                  Sign Up with Google
                </button>
                <button
                  onClick={handleFacebookLogin}
                  className="flex-1 rounded-xl bg-[#1877F2] py-2.5 text-xs font-bold text-white active:scale-95 transition-transform"
                >
                  Sign Up with Facebook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Settings;
