"use client"

import type React from "react"
import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
}

// Ensure the dark theme is applied immediately to avoid the light theme flash
export function ThemeProvider({ children, attribute, defaultTheme, enableSystem }: ThemeProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Apply the dark theme immediately on the client
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
    setIsDarkTheme(true);
  }, []);

  if (!isDarkTheme) {
    // Prevent rendering until the theme is applied
    return null;
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
