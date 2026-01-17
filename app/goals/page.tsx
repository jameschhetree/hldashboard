"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import {
  Target,
  Trophy,
  TrendingUp,
  Calendar,
  Plus,
  CheckCircle2,
  Circle,
  Award,
  Star,
  Zap,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

interface Goal {
  id: number;
  title: string;
  type: "streams" | "followers" | "revenue" | "releases";
  current: number;
  target: number;
  deadline: string;
  status: "active" | "completed" | "overdue";
  icon: typeof Target;
}

const goals: Goal[] = [
  {
    id: 1,
    title: "Reach 3M Total Streams",
    type: "streams",
    current: 2400000,
    target: 3000000,
    deadline: "2024-03-31",
    status: "active",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "Gain 150K Followers",
    type: "followers",
    current: 125000,
    target: 150000,
    deadline: "2024-04-15",
    status: "active",
    icon: Target,
  },
  {
    id: 3,
    title: "Earn $10K Monthly Revenue",
    type: "revenue",
    current: 4200,
    target: 10000,
    deadline: "2024-05-01",
    status: "active",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Release 4 Singles This Year",
    type: "releases",
    current: 2,
    target: 4,
    deadline: "2024-12-31",
    status: "active",
    icon: Calendar,
  },
  {
    id: 5,
    title: "Hit 1M Streams on Single",
    type: "streams",
    current: 1000000,
    target: 1000000,
    deadline: "2024-01-15",
    status: "completed",
    icon: Trophy,
  },
];

const milestones = [
  { id: 1, title: "First 100K Streams", date: "2023-06-15", icon: Star, achieved: true },
  { id: 2, title: "50K Followers", date: "2023-09-22", icon: Award, achieved: true },
  { id: 3, title: "First $1K Month", date: "2023-11-10", icon: Zap, achieved: true },
  { id: 4, title: "Playlist Feature", date: "2024-01-05", icon: Trophy, achieved: true },
  { id: 5, title: "1M Total Streams", date: "2024-02-18", icon: Star, achieved: true },
  { id: 6, title: "100K Followers", date: null, icon: Award, achieved: false },
  { id: 7, title: "First Album Release", date: null, icon: Trophy, achieved: false },
];

export default function GoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatNumber = (num: number, type: string) => {
    if (type === "revenue") return `$${num.toLocaleString()}`;
    if (type === "streams") return `${(num / 1000000).toFixed(num >= 1000000 ? 1 : 2)}M`;
    if (type === "followers") return `${(num / 1000).toFixed(num >= 1000 ? 0 : 1)}K`;
    return num.toString();
  };

  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");

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
      <main className={cn("flex-1 p-4 sm:p-6 lg:p-8 relative z-10 transition-all duration-300", isCollapsed ? "ml-0" : "ml-0 sm:ml-64")}>
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-dark-text mb-2">
              Goals & Milestones
            </h1>
            <p className="text-sm text-dark-text-muted">
              Track your progress and celebrate your achievements
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div
              className={cn(
                "relative rounded-xl p-4 border backdrop-blur-xl",
                isDark
                  ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                  : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
              )}
            >
              <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
              <div className="relative z-10">
                <p className="text-xs text-dark-text-muted mb-1">Active Goals</p>
                <p className="text-2xl font-bold text-dark-text">{activeGoals.length}</p>
              </div>
            </div>
            <div
              className={cn(
                "relative rounded-xl p-4 border backdrop-blur-xl",
                isDark
                  ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                  : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
              )}
            >
              <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
              <div className="relative z-10">
                <p className="text-xs text-dark-text-muted mb-1">Completed</p>
                <p className="text-2xl font-bold text-dark-text">{completedGoals.length}</p>
              </div>
            </div>
            <div
              className={cn(
                "relative rounded-xl p-4 border backdrop-blur-xl",
                isDark
                  ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                  : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
              )}
            >
              <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
              <div className="relative z-10">
                <p className="text-xs text-dark-text-muted mb-1">Milestones</p>
                <p className="text-2xl font-bold text-dark-text">
                  {milestones.filter((m) => m.achieved).length}
                </p>
              </div>
            </div>
          </div>

          {/* Active Goals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-dark-text">Active Goals</h2>
              <button
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-xl text-sm transition-all",
                  isDark
                    ? "bg-white/5 border-white/10 text-dark-text hover:bg-white/10"
                    : "bg-black/5 border-black/10 text-light-text hover:bg-black/10"
                )}
              >
                <Plus className="w-4 h-4" />
                New Goal
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
              {activeGoals.map((goal) => {
                const Icon = goal.icon;
                const progress = getProgress(goal.current, goal.target);
                return (
                  <div
                    key={goal.id}
                    className={cn(
                      "relative rounded-xl p-4 border backdrop-blur-xl transition-all hover:shadow-xl",
                      isDark
                        ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                        : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                    )}
                  >
                    <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg backdrop-blur-md border",
                              isDark
                                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
                                : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-dark-text">{goal.title}</h3>
                            <p className="text-xs text-dark-text-muted">
                              Due: {new Date(goal.deadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-dark-text-muted">
                            {formatNumber(goal.current, goal.type)}
                          </span>
                          <span className="text-dark-text-muted">
                            {formatNumber(goal.target, goal.type)}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden bg-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-white/40 to-white/20 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-dark-text-muted">
                        {progress.toFixed(1)}% complete
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-dark-text mb-3">Completed Goals</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
                {completedGoals.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <div
                      key={goal.id}
                      className={cn(
                        "relative rounded-xl p-4 border backdrop-blur-xl opacity-75",
                        isDark
                          ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                          : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                      )}
                    >
                      <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                            <div>
                              <h3 className="text-sm font-semibold text-dark-text line-through">
                                {goal.title}
                              </h3>
                              <p className="text-xs text-dark-text-muted">
                                Completed: {new Date(goal.deadline).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Milestones */}
          <div>
            <h2 className="text-lg font-semibold text-dark-text mb-3">Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {milestones.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <div
                    key={milestone.id}
                    className={cn(
                      "relative rounded-xl p-4 border backdrop-blur-xl transition-all",
                      milestone.achieved
                        ? isDark
                          ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                          : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                        : isDark
                        ? "bg-gradient-to-br from-white/3 via-white/2 to-white/1 border-white/5 opacity-60"
                        : "bg-gradient-to-br from-black/3 via-black/2 to-black/1 border-black/5 opacity-60"
                    )}
                  >
                    <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        {milestone.achieved ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-dark-text-muted" />
                        )}
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            milestone.achieved ? "text-white" : "text-dark-text-muted"
                          )}
                        />
                      </div>
                      <h3
                        className={cn(
                          "text-sm font-semibold mb-1",
                          milestone.achieved ? "text-dark-text" : "text-dark-text-muted"
                        )}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-dark-text-muted">
                        {milestone.date
                          ? new Date(milestone.date).toLocaleDateString()
                          : "Not achieved yet"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
