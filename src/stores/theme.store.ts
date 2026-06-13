import { create } from "zustand";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Theme store — manages dark/light mode toggling.
 *
 * Applies the mode as a CSS class on <html> so Tailwind's `dark:` variant works.
 * Persists preference to localStorage.
 */

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
  return stored || "dark";
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    applyThemeToDOM(next);
    set({ theme: next });
  },

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    applyThemeToDOM(theme);
    set({ theme });
  },
}));

// Apply initial theme on module load
applyThemeToDOM(getInitialTheme());
