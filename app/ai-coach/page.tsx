"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import { Send, Sparkles, TrendingUp, Users, Music, DollarSign } from "lucide-react";

const weeklySuggestions = [
  {
    icon: TrendingUp,
    title: "Stream Growth Opportunity",
    description: "Your Spotify streams increased 12% this week. Consider releasing a new single to capitalize on this momentum.",
  },
  {
    icon: Users,
    title: "Audience Engagement",
    description: "Instagram engagement is up 8%. Post behind-the-scenes content to maintain this growth.",
  },
  {
    icon: Music,
    title: "Playlist Placement",
    description: "Your track 'Midnight Dreams' is performing well. Submit to more editorial playlists this week.",
  },
  {
    icon: DollarSign,
    title: "Revenue Optimization",
    description: "Apple Music revenue increased 15%. Focus on promoting your music on this platform.",
  },
];

const typewriterPrompts = [
  "Want to get help with your artist career?",
  "Ask me anything about branding, marketing, royalties",
  "Need advice on growing your fanbase?",
  "Curious about playlist strategies and promotion?",
  "Looking for insights on music distribution and revenue?",
];

export default function AICoachPage() {
  const [input, setInput] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  useEffect(() => {
    const currentPrompt = typewriterPrompts[currentPromptIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping && !isDeleting) {
      // Typing forward
      if (typewriterText.length < currentPrompt.length) {
        timeout = setTimeout(() => {
          setTypewriterText(currentPrompt.slice(0, typewriterText.length + 1));
        }, 50);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else if (isDeleting) {
      // Deleting
      if (typewriterText.length > 0) {
        timeout = setTimeout(() => {
          setTypewriterText(typewriterText.slice(0, -1));
        }, 30);
      } else {
        // Finished deleting, move to next prompt
        setIsDeleting(false);
        setCurrentPromptIndex((prev) => (prev + 1) % typewriterPrompts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, currentPromptIndex, isTyping, isDeleting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement AI chat functionality
    console.log("Question:", input);
    setInput("");
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <Sidebar />
      <MobileMenu />
      <main className={cn("flex-1 p-6 sm:p-8 lg:p-10 relative z-10 transition-all duration-300", isCollapsed ? "ml-0" : "ml-0 sm:ml-64")}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/2 mb-4 shadow-xl">
              <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
              <div className="absolute inset-0 rounded-2xl opacity-60 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
              <Sparkles className="w-8 h-8 text-white relative z-10" />
            </div>
            <h1 className="text-4xl font-semibold text-dark-text mb-2">
              AI Coach
            </h1>
            <p className="text-sm text-dark-text-muted">
              Get personalized insights and recommendations for your music career
            </p>
          </div>

          {/* Chat Input */}
          <div className="mb-12">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative rounded-2xl p-6 border backdrop-blur-xl border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/2 shadow-xl">
                <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                <div className="absolute inset-0 rounded-2xl opacity-60 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <div className="relative z-10">
                  {!input && (
                    <div className="absolute top-6 left-6 pointer-events-none z-20">
                      <span className="text-dark-text-muted-2 text-base leading-relaxed">
                        {typewriterText}
                        <span className="animate-pulse ml-0.5">|</span>
                      </span>
                    </div>
                  )}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder=""
                    className={cn(
                      "w-full bg-transparent border-none outline-none resize-none text-dark-text",
                      "text-base leading-relaxed relative z-10"
                    )}
                    rows={4}
                  />
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border/30">
                    <p className="text-xs text-dark-text-muted-3">
                      AI can make mistakes. Verify important information.
                    </p>
                    <button
                      type="submit"
                      className={cn(
                        "p-3 rounded-xl backdrop-blur-md border transition-all hover:scale-105",
                        isDark
                          ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white shadow-lg"
                          : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black shadow-lg"
                      )}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Weekly Suggestions */}
          <div>
            <h2 className="text-lg font-semibold text-dark-text mb-4">
              Weekly Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklySuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative rounded-2xl p-5 border backdrop-blur-xl transition-all duration-300 hover:shadow-xl overflow-hidden group",
                    isDark
                      ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                      : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                  )}
                >
                  <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                  <div className="absolute inset-0 rounded-2xl opacity-60 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "p-3 rounded-xl backdrop-blur-md border flex-shrink-0",
                          isDark
                            ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
                            : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
                        )}
                      >
                        <suggestion.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-dark-text mb-1.5">
                          {suggestion.title}
                        </h3>
                        <p className="text-xs text-dark-text-muted-2 leading-relaxed">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
