"use client";

import { ThemeProvider } from "@/lib/theme";
import { SidebarProvider } from "@/lib/sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
