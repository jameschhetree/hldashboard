"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useSidebar } from "@/lib/sidebar";
import { StatCard } from "@/components/StatCard";
import { PlatformCard } from "@/components/PlatformCard";
import {
  Music,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { AICoachCard } from "@/components/AICoachCard";
import { SpotifyIcon, AppleIcon, YouTubeIcon, InstagramIcon, TikTokIcon } from "@/components/PlatformIcons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

// Mock data for charts - Top 5 platforms
const weeklyData = [
  { day: "Mon", Spotify: 45000, "Apple Music": 28000, YouTube: 22000, Instagram: 8500, TikTok: 4500 },
  { day: "Tue", Spotify: 52000, "Apple Music": 32000, YouTube: 25000, Instagram: 9200, TikTok: 5200 },
  { day: "Wed", Spotify: 48000, "Apple Music": 30000, YouTube: 23000, Instagram: 8800, TikTok: 4800 },
  { day: "Thu", Spotify: 61000, "Apple Music": 38000, YouTube: 29000, Instagram: 11000, TikTok: 6000 },
  { day: "Fri", Spotify: 55000, "Apple Music": 34000, YouTube: 27000, Instagram: 10000, TikTok: 5500 },
  { day: "Sat", Spotify: 72000, "Apple Music": 45000, YouTube: 35000, Instagram: 13000, TikTok: 7000 },
  { day: "Sun", Spotify: 68000, "Apple Music": 42000, YouTube: 33000, Instagram: 12000, TikTok: 6800 },
];

// Platform distribution data for different time periods
const platformData = {
  week: [
    { name: "Spotify", value: 45, color: "#ffffff" },
    { name: "Apple Music", value: 25, color: "#cccccc" },
    { name: "YouTube", value: 20, color: "#888888" },
    { name: "Instagram", value: 6, color: "#666666" },
    { name: "TikTok", value: 4, color: "#444444" },
  ],
  month: [
    { name: "Spotify", value: 48, color: "#ffffff" },
    { name: "Apple Music", value: 24, color: "#cccccc" },
    { name: "YouTube", value: 18, color: "#888888" },
    { name: "Instagram", value: 7, color: "#666666" },
    { name: "TikTok", value: 3, color: "#444444" },
  ],
  year: [
    { name: "Spotify", value: 52, color: "#ffffff" },
    { name: "Apple Music", value: 22, color: "#cccccc" },
    { name: "YouTube", value: 16, color: "#888888" },
    { name: "Instagram", value: 7, color: "#666666" },
    { name: "TikTok", value: 3, color: "#444444" },
  ],
};

const platformDistribution = [
  { name: "Spotify", value: 45, color: "#ffffff" },
  { name: "Apple Music", value: 25, color: "#cccccc" },
  { name: "YouTube", value: 20, color: "#888888" },
  { name: "Instagram", value: 6, color: "#666666" },
  { name: "TikTok", value: 4, color: "#444444" },
];

export default function Home() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");
  const { isCollapsed } = useSidebar();
  const platformDistribution = platformData[timeframe];

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
      <main className={cn("flex-1 p-3 sm:p-4 lg:p-5 relative z-10 transition-all duration-300", isCollapsed ? "ml-0" : "ml-0 sm:ml-64")}>
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Header */}
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-dark-text mb-0.5">
                Dashboard
              </h1>
              <p className="text-xs text-dark-text-muted">
                Overview of your music performance metrics
              </p>
            </div>
            {/* Quote of the Day */}
            <div className="text-right max-w-[200px] sm:max-w-[250px]">
              <p className="text-[10px] sm:text-xs text-dark-text-muted italic leading-tight">
                "Music is the universal language of mankind."
              </p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <StatCard
              title="Total Streams"
              value="2.4M"
              change="+12.5%"
              changeType="positive"
              icon={Music}
            />
            <StatCard
              title="Total Followers"
              value="125K"
              change="+8.2%"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Monthly Listeners"
              value="89.2K"
              change="+15.3%"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Estimated Revenue"
              value="$4.2K"
              change="+9.7%"
              changeType="positive"
              icon={DollarSign}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
            {/* Weekly Performance */}
            <div className="relative rounded-xl p-3 border backdrop-blur-xl border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/2 shadow-xl overflow-hidden">
              <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
              <div className="absolute inset-0 rounded-xl opacity-60 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-dark-text">
                    Weekly Performance
                  </h2>
                  <Link
                    href="/analytics"
                    className="text-xs font-medium px-3 py-1.5 rounded-md transition-all text-dark-text-muted hover:text-white hover:bg-white/10"
                  >
                    See More
                  </Link>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                    <XAxis
                      dataKey="day"
                      stroke="#666666"
                      style={{ fontSize: "11px" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#666666" 
                      style={{ fontSize: "11px" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #1a1a1a",
                        borderRadius: "6px",
                        padding: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: "8px", fontSize: "10px" }}
                      iconType="line"
                    />
                    <Line
                      type="monotone"
                      dataKey="Spotify"
                      stroke="#ffffff"
                      strokeWidth={2}
                      dot={false}
                      name="Spotify"
                    />
                    <Line
                      type="monotone"
                      dataKey="Apple Music"
                      stroke="#cccccc"
                      strokeWidth={2}
                      dot={false}
                      name="Apple Music"
                    />
                    <Line
                      type="monotone"
                      dataKey="YouTube"
                      stroke="#888888"
                      strokeWidth={2}
                      dot={false}
                      name="YouTube"
                    />
                    <Line
                      type="monotone"
                      dataKey="Instagram"
                      stroke="#666666"
                      strokeWidth={2}
                      dot={false}
                      name="Instagram"
                    />
                    <Line
                      type="monotone"
                      dataKey="TikTok"
                      stroke="#444444"
                      strokeWidth={2}
                      dot={false}
                      name="TikTok"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="relative rounded-xl p-3 border backdrop-blur-xl border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/2 shadow-xl overflow-hidden">
              <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
              <div className="absolute inset-0 rounded-xl opacity-60 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-dark-text">
                    Platform Distribution
                  </h2>
                  <Link
                    href="/analytics"
                    className="text-xs font-medium px-3 py-1.5 rounded-md transition-all text-dark-text-muted hover:text-white hover:bg-white/10"
                  >
                    See More
                  </Link>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={platformDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={65}
                      innerRadius={35}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #1a1a1a",
                        borderRadius: "6px",
                        padding: "8px",
                        fontSize: "12px",
                        color: "#ffffff",
                      }}
                      labelStyle={{
                        color: "#ffffff",
                      }}
                      itemStyle={{
                        color: "#ffffff",
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                      iconType="circle"
                      formatter={(value) => (
                        <span style={{ color: '#888', fontSize: '10px' }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Platform Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-dark-text">
                Platform Overview
              </h2>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => setTimeframe("week")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                    timeframe === "week"
                      ? "bg-white/10 text-white"
                      : "text-dark-text-muted hover:text-white"
                  )}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeframe("month")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                    timeframe === "month"
                      ? "bg-white/10 text-white"
                      : "text-dark-text-muted hover:text-white"
                  )}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeframe("year")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                    timeframe === "year"
                      ? "bg-white/10 text-white"
                      : "text-dark-text-muted hover:text-white"
                  )}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
              <PlatformCard
                platform=""
                icon={SpotifyIcon}
                iconColor="bg-green-500/20 text-green-500"
                followers={timeframe === "week" ? "85.2K" : timeframe === "month" ? "88.5K" : "92.1K"}
                streams={timeframe === "week" ? "1.2M" : timeframe === "month" ? "4.8M" : "58.2M"}
                growth={timeframe === "week" ? "+12.5%" : timeframe === "month" ? "+15.2%" : "+18.7%"}
                growthType="positive"
              />
              <PlatformCard
                platform=""
                icon={AppleIcon}
                iconColor="bg-red-500/20 text-red-500"
                followers={timeframe === "week" ? "28.5K" : timeframe === "month" ? "29.2K" : "31.5K"}
                streams={timeframe === "week" ? "680K" : timeframe === "month" ? "2.7M" : "32.4M"}
                growth={timeframe === "week" ? "+8.3%" : timeframe === "month" ? "+10.1%" : "+12.5%"}
                growthType="positive"
              />
              <PlatformCard
                platform=""
                icon={YouTubeIcon}
                iconColor="bg-red-600/20 text-red-600"
                followers={timeframe === "week" ? "15.8K" : timeframe === "month" ? "16.5K" : "18.2K"}
                streams={timeframe === "week" ? "420K" : timeframe === "month" ? "1.8M" : "21.6M"}
                growth={timeframe === "week" ? "+15.2%" : timeframe === "month" ? "+18.5%" : "+22.1%"}
                growthType="positive"
              />
              <PlatformCard
                platform=""
                icon={InstagramIcon}
                iconColor="bg-pink-500/20 text-pink-500"
                followers={timeframe === "week" ? "12.3K" : timeframe === "month" ? "12.8K" : "13.5K"}
                streams={timeframe === "week" ? "85K" : timeframe === "month" ? "340K" : "4.1M"}
                growth={timeframe === "week" ? "+6.7%" : timeframe === "month" ? "+8.2%" : "+10.5%"}
                growthType="positive"
              />
              <PlatformCard
                platform=""
                icon={TikTokIcon}
                iconColor="bg-black/20 text-white"
                followers={timeframe === "week" ? "8.2K" : timeframe === "month" ? "8.9K" : "9.8K"}
                streams={timeframe === "week" ? "45K" : timeframe === "month" ? "180K" : "2.2M"}
                growth={timeframe === "week" ? "+22.1%" : timeframe === "month" ? "+25.3%" : "+28.7%"}
                growthType="positive"
              />
            </div>
          </div>

          {/* AI Coach Quotes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-dark-text">
                AI Coach Insights
              </h2>
              <Link
                href="/ai-coach"
                className="text-xs font-medium px-3 py-1.5 rounded-md transition-all text-dark-text-muted hover:text-white hover:bg-white/10"
              >
                See More
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <AICoachCard
                title="Stream Growth Opportunity"
                description="Your Spotify streams increased 12% this week. Consider releasing a new single to capitalize on this momentum."
                icon={TrendingUp}
              />
              <AICoachCard
                title="Audience Engagement"
                description="Instagram engagement is up 8%. Post behind-the-scenes content to maintain this growth."
                icon={Users}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
