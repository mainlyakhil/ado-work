import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  emoji: string;
  colors: Record<string, string>;
}

export const themes: Theme[] = [
  {
    id: "volcanic",
    name: "Volcanic Orange",
    emoji: "🌋",
    colors: {
      "--background": "0 0% 7%",
      "--foreground": "0 0% 96%",
      "--card": "0 0% 11%",
      "--card-foreground": "0 0% 96%",
      "--primary": "27 96% 54%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "0 0% 15%",
      "--secondary-foreground": "0 0% 96%",
      "--muted": "0 0% 18%",
      "--muted-foreground": "0 0% 55%",
      "--accent": "27 96% 54%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "0 0% 20%",
      "--input": "0 0% 20%",
      "--ring": "27 96% 54%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    emoji: "🌊",
    colors: {
      "--background": "222 47% 6%",
      "--foreground": "210 40% 96%",
      "--card": "222 47% 10%",
      "--card-foreground": "210 40% 96%",
      "--primary": "217 91% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "222 47% 14%",
      "--secondary-foreground": "210 40% 96%",
      "--muted": "222 47% 18%",
      "--muted-foreground": "215 20% 55%",
      "--accent": "217 91% 60%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "222 47% 20%",
      "--input": "222 47% 20%",
      "--ring": "217 91% 60%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "emerald-night",
    name: "Emerald Night",
    emoji: "🌿",
    colors: {
      "--background": "150 20% 6%",
      "--foreground": "150 10% 96%",
      "--card": "150 20% 10%",
      "--card-foreground": "150 10% 96%",
      "--primary": "152 69% 50%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "150 20% 14%",
      "--secondary-foreground": "150 10% 96%",
      "--muted": "150 15% 18%",
      "--muted-foreground": "150 10% 55%",
      "--accent": "152 69% 50%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "150 15% 20%",
      "--input": "150 15% 20%",
      "--ring": "152 69% 50%",
      "--gym-green": "152 69% 50%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "crimson-fury",
    name: "Crimson Fury",
    emoji: "🔥",
    colors: {
      "--background": "0 20% 6%",
      "--foreground": "0 10% 96%",
      "--card": "0 20% 10%",
      "--card-foreground": "0 10% 96%",
      "--primary": "0 72% 51%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "0 15% 14%",
      "--secondary-foreground": "0 10% 96%",
      "--muted": "0 10% 18%",
      "--muted-foreground": "0 10% 55%",
      "--accent": "0 72% 51%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "0 15% 20%",
      "--input": "0 15% 20%",
      "--ring": "0 72% 51%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    emoji: "💜",
    colors: {
      "--background": "270 30% 6%",
      "--foreground": "270 10% 96%",
      "--card": "270 25% 10%",
      "--card-foreground": "270 10% 96%",
      "--primary": "271 76% 53%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "270 20% 14%",
      "--secondary-foreground": "270 10% 96%",
      "--muted": "270 15% 18%",
      "--muted-foreground": "270 10% 55%",
      "--accent": "271 76% 53%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "270 15% 20%",
      "--input": "270 15% 20%",
      "--ring": "271 76% 53%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    emoji: "🌅",
    colors: {
      "--background": "35 30% 6%",
      "--foreground": "35 10% 96%",
      "--card": "35 25% 10%",
      "--card-foreground": "35 10% 96%",
      "--primary": "43 96% 56%",
      "--primary-foreground": "0 0% 10%",
      "--secondary": "35 20% 14%",
      "--secondary-foreground": "35 10% 96%",
      "--muted": "35 15% 18%",
      "--muted-foreground": "35 10% 55%",
      "--accent": "43 96% 56%",
      "--accent-foreground": "0 0% 10%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "35 15% 20%",
      "--input": "35 15% 20%",
      "--ring": "43 96% 56%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "arctic-frost",
    name: "Arctic Frost",
    emoji: "❄️",
    colors: {
      "--background": "200 30% 6%",
      "--foreground": "200 10% 96%",
      "--card": "200 25% 10%",
      "--card-foreground": "200 10% 96%",
      "--primary": "195 85% 55%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "200 20% 14%",
      "--secondary-foreground": "200 10% 96%",
      "--muted": "200 15% 18%",
      "--muted-foreground": "200 10% 55%",
      "--accent": "195 85% 55%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "200 15% 20%",
      "--input": "200 15% 20%",
      "--ring": "195 85% 55%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
  {
    id: "neon-pink",
    name: "Neon Pink",
    emoji: "💖",
    colors: {
      "--background": "330 25% 6%",
      "--foreground": "330 10% 96%",
      "--card": "330 20% 10%",
      "--card-foreground": "330 10% 96%",
      "--primary": "330 81% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "330 15% 14%",
      "--secondary-foreground": "330 10% 96%",
      "--muted": "330 10% 18%",
      "--muted-foreground": "330 10% 55%",
      "--accent": "330 81% 60%",
      "--accent-foreground": "0 0% 100%",
      "--destructive": "0 84% 60%",
      "--destructive-foreground": "0 0% 100%",
      "--border": "330 15% 20%",
      "--input": "330 15% 20%",
      "--ring": "330 81% 60%",
      "--gym-green": "142 71% 45%",
      "--gym-gold": "43 96% 56%",
    },
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes[0],
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("ado-work-theme");
    return themes.find((t) => t.id === saved) || themes[0];
  });

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    // Update gradient utilities dynamically
    const primaryHsl = theme.colors["--primary"];
    root.style.setProperty("--theme-primary-hsl", primaryHsl);
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = (id: string) => {
    const theme = themes.find((t) => t.id === id);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem("ado-work-theme", id);
      applyTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
