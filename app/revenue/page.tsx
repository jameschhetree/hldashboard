"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  CheckCircle2,
  Circle,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 3200, streams: 180000 },
  { month: "Feb", revenue: 3800, streams: 210000 },
  { month: "Mar", revenue: 4200, streams: 240000 },
  { month: "Apr", revenue: 4500, streams: 260000 },
  { month: "May", revenue: 4800, streams: 280000 },
  { month: "Jun", revenue: 5200, streams: 300000 },
];

const platformRevenue = [
  { name: "Spotify", revenue: 2800, percentage: 54 },
  { name: "Apple Music", revenue: 1200, percentage: 23 },
  { name: "YouTube", revenue: 800, percentage: 15 },
  { name: "Other", revenue: 400, percentage: 8 },
];

const recentPayments = [
  {
    id: 1,
    platform: "Spotify",
    amount: 2800,
    date: "2024-01-15",
    status: "paid",
    period: "Dec 2023",
  },
  {
    id: 2,
    platform: "Apple Music",
    amount: 1200,
    date: "2024-01-10",
    status: "paid",
    period: "Dec 2023",
  },
  {
    id: 3,
    platform: "YouTube",
    amount: 800,
    date: "2024-01-08",
    status: "paid",
    period: "Dec 2023",
  },
  {
    id: 4,
    platform: "Spotify",
    amount: 3200,
    date: null,
    status: "pending",
    period: "Jan 2024",
  },
];

const COLORS = ["#ffffff", "#cccccc", "#888888", "#666666"];

export default function RevenuePage() {
  const [timeframe, setTimeframe] = useState<"month" | "year">("month");
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const avgMonthlyRevenue = totalRevenue / monthlyRevenue.length;
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
  const previousMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].revenue;
  const revenueChange = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

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
              Revenue & Finance
            </h1>
            <p className="text-sm text-dark-text-muted">
              Track your earnings and financial performance
            </p>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
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
                <p className="text-xs text-dark-text-muted mb-1">Total Revenue (6M)</p>
                <p className="text-2xl font-bold text-dark-text">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-white" />
                  <span className="text-xs text-dark-text-muted">+{revenueChange.toFixed(1)}%</span>
                </div>
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
                <p className="text-xs text-dark-text-muted mb-1">This Month</p>
                <p className="text-2xl font-bold text-dark-text">
                  ${lastMonthRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-white" />
                  <span className="text-xs text-dark-text-muted">vs last month</span>
                </div>
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
                <p className="text-xs text-dark-text-muted mb-1">Avg Monthly</p>
                <p className="text-2xl font-bold text-dark-text">
                  ${Math.round(avgMonthlyRevenue).toLocaleString()}
                </p>
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
                <p className="text-xs text-dark-text-muted mb-1">Pending</p>
                <p className="text-2xl font-bold text-dark-text">$3,200</p>
                <p className="text-xs text-dark-text-muted mt-1">Jan 2024</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Revenue Trend */}
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
                <h2 className="text-sm font-semibold text-dark-text mb-3">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={monthlyRevenue}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                    <XAxis dataKey="month" stroke="#666666" style={{ fontSize: "10px" }} />
                    <YAxis
                      stroke="#666666"
                      style={{ fontSize: "10px" }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #1a1a1a",
                        borderRadius: "6px",
                        padding: "6px",
                        fontSize: "11px",
                        color: "#ffffff",
                      }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#ffffff"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform Distribution */}
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
                <h2 className="text-sm font-semibold text-dark-text mb-3">
                  Revenue by Platform
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={platformRevenue}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                      dataKey="revenue"
                      label={({ percentage }) => `${percentage}%`}
                    >
                      {platformRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #1a1a1a",
                        borderRadius: "6px",
                        padding: "6px",
                        fontSize: "11px",
                        color: "#ffffff",
                      }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-dark-text">Payment History</h2>
              <button
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-xl text-sm transition-all",
                  isDark
                    ? "bg-white/5 border-white/10 text-dark-text hover:bg-white/10"
                    : "bg-black/5 border-black/10 text-light-text hover:bg-black/10"
                )}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="space-y-2">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={cn(
                    "relative rounded-xl p-4 border backdrop-blur-xl",
                    isDark
                      ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                      : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                  )}
                >
                  <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-2 rounded-lg backdrop-blur-md border",
                          isDark
                            ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
                            : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
                        )}
                      >
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-dark-text">{payment.platform}</h3>
                        <p className="text-xs text-dark-text-muted">{payment.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-dark-text">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        {payment.status === "paid" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-white" />
                            <span className="text-xs text-dark-text-muted">
                              {payment.date
                                ? new Date(payment.date).toLocaleDateString()
                                : "Paid"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3 h-3 text-dark-text-muted" />
                            <span className="text-xs text-dark-text-muted">Pending</span>
                          </>
                        )}
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
