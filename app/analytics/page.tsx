"use client";

/**
 * Analytics Page - Songstats API Integration Mapping
 * 
 * All charts are designed to work with Songstats API endpoints:
 * 
 * ✅ 6-Month Growth Trend → Get Artist Historic Stats (monthly)
 * ✅ Weekly Performance → Get Artist Historic Stats (weekly)
 * ✅ Top Performing Tracks → Get Artist Top Tracks
 * ✅ Platform Distribution → Get Artist Current Stats (by platform)
 * ✅ Daily Streams → Get Artist Historic Stats (daily breakdown)
 * ✅ Top Countries → Get Artist Audience (geographic data)
 * ✅ Platform Listeners → Get Artist Current Stats (monthly listeners by platform)
 * ✅ Platform Engagement → Get Artist Current Stats (calculated from followers/streams)
 * ✅ Performance Radar → Get Artist Current Stats (composite metrics)
 * ✅ Year-over-Year Growth → Get Artist Historic Stats (annual comparison)
 * 
 * Note: All data is currently mocked. When integrating Songstats API,
 * replace mock data with API responses from the endpoints listed above.
 */

import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";

const monthlyData = [
  { month: "Jan", streams: 120000, followers: 8500, revenue: 2100, plays: 95000 },
  { month: "Feb", streams: 145000, followers: 9200, revenue: 2400, plays: 112000 },
  { month: "Mar", streams: 168000, followers: 10100, revenue: 2800, plays: 135000 },
  { month: "Apr", streams: 192000, followers: 11200, revenue: 3200, plays: 158000 },
  { month: "May", streams: 215000, followers: 12500, revenue: 3600, plays: 182000 },
  { month: "Jun", streams: 240000, followers: 14000, revenue: 4200, plays: 205000 },
];

const weeklyData = [
  { day: "Mon", streams: 42000, engagement: 8.5 },
  { day: "Tue", streams: 48000, engagement: 9.2 },
  { day: "Wed", streams: 45000, engagement: 8.8 },
  { day: "Thu", streams: 52000, engagement: 9.5 },
  { day: "Fri", streams: 58000, engagement: 10.2 },
  { day: "Sat", streams: 65000, engagement: 11.8 },
  { day: "Sun", streams: 61000, engagement: 10.5 },
];

const topTracks = [
  { track: "Midnight Dreams", streams: 450000, growth: 18, revenue: 1850 },
  { track: "Electric Nights", streams: 380000, growth: 12, revenue: 1520 },
  { track: "City Lights", streams: 320000, growth: 8, revenue: 1280 },
  { track: "Ocean Waves", streams: 285000, growth: 15, revenue: 1140 },
  { track: "Sunset Drive", streams: 240000, growth: 5, revenue: 960 },
];

const platformData = [
  { name: "Spotify", value: 45, color: "#ffffff" },
  { name: "Apple Music", value: 25, color: "#cccccc" },
  { name: "YouTube", value: 20, color: "#888888" },
  { name: "Instagram", value: 6, color: "#666666" },
  { name: "TikTok", value: 4, color: "#444444" },
];

// Songstats API: Get Artist Historic Stats - Daily breakdown
const dailyData = [
  { day: "Mon", streams: 12000 }, { day: "Tue", streams: 15000 }, { day: "Wed", streams: 14000 },
  { day: "Thu", streams: 18000 }, { day: "Fri", streams: 22000 }, { day: "Sat", streams: 28000 },
  { day: "Sun", streams: 24000 },
];

const geoData = [
  { country: "US", streams: 45000, percent: 35 },
  { country: "UK", streams: 18000, percent: 14 },
  { country: "CA", streams: 12000, percent: 9 },
  { country: "AU", streams: 9500, percent: 7 },
  { country: "DE", streams: 8500, percent: 6 },
  { country: "Other", streams: 37500, percent: 29 },
];

// Songstats API: Get Artist Current Stats - Monthly listeners by platform
const platformListenersData = [
  { platform: "Spotify", listeners: 72000, percent: 56 },
  { platform: "Apple", listeners: 38000, percent: 30 },
  { platform: "YouTube", listeners: 18000, percent: 14 },
];

const engagementData = [
  { platform: "Spotify", followers: 52000, engagement: 8.5 },
  { platform: "Apple", followers: 28000, engagement: 7.2 },
  { platform: "YouTube", followers: 22000, engagement: 12.5 },
  { platform: "Instagram", followers: 18000, engagement: 15.8 },
  { platform: "TikTok", followers: 12000, engagement: 22.3 },
];

const radarData = [
  { subject: "Streams", value: 85, fullMark: 100 },
  { subject: "Followers", value: 78, fullMark: 100 },
  { subject: "Revenue", value: 72, fullMark: 100 },
  { subject: "Engagement", value: 88, fullMark: 100 },
  { subject: "Growth", value: 82, fullMark: 100 },
];

const yearData = [
  { year: "2021", streams: 240000, revenue: 4800 },
  { year: "2022", streams: 480000, revenue: 9600 },
  { year: "2023", streams: 890000, revenue: 17800 },
  { year: "2024", streams: 1400000, revenue: 28000 },
];

function ChartCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn(
      "relative rounded-xl p-3 border backdrop-blur-xl shadow-xl overflow-hidden",
      isDark 
        ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10" 
        : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10",
      className
    )}>
      <div className={cn(
        "absolute inset-0 rounded-xl backdrop-blur-md",
        isDark 
          ? "bg-gradient-to-br from-white/8 via-white/4 to-transparent" 
          : "bg-gradient-to-br from-black/8 via-black/4 to-transparent"
      )} />
      <div className="relative z-10">
        <h3 className={cn(
          "text-xs font-semibold mb-2",
          isDark ? "text-dark-text" : "text-light-text"
        )}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      <MobileMenu />
      <main className={cn("flex-1 p-3 sm:p-4 lg:p-5 relative z-10 transition-all duration-300", isCollapsed ? "ml-0" : "ml-0 sm:ml-64")}>
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-dark-text mb-0.5">Analytics</h1>
            <p className="text-xs text-dark-text-muted">
              Comprehensive performance metrics and insights
            </p>
          </div>

          {/* Top Row - Large Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <ChartCard title="6-Month Growth Trend">
              {/* Songstats API: Get Artist Historic Stats - Monthly historical data */}
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#888888" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#666666" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "11px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Area type="monotone" dataKey="streams" stroke="#ffffff" fillOpacity={1} fill="url(#colorStreams)" />
                  <Area type="monotone" dataKey="revenue" stroke="#888888" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Weekly Performance">
              {/* Songstats API: Get Artist Historic Stats - Weekly breakdown */}
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis dataKey="day" stroke="#666666" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#666666" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#888888" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "11px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Bar yAxisId="left" dataKey="streams" fill="#ffffff" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#cccccc" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Second Row - Top Tracks & Platform Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <ChartCard title="Top Performing Tracks">
              {/* Songstats API: Get Artist Top Tracks */}
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={topTracks} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis type="number" stroke="#666666" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="track" type="category" stroke="#666666" style={{ fontSize: "10px" }} width={80} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "11px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="streams" fill="#ffffff" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Platform Distribution">
              {/* Songstats API: Get Artist Current Stats - Streams/followers by platform */}
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={platformData} cx="50%" cy="50%" outerRadius={50} innerRadius={25} dataKey="value">
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "11px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Third Row - Multiple Small Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <ChartCard title="Daily Streams">
              {/* Songstats API: Get Artist Historic Stats - Daily breakdown */}
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis dataKey="day" stroke="#666666" style={{ fontSize: "9px" }} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" style={{ fontSize: "9px" }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "10px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="streams" fill="#ffffff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top Countries">
              {/* Songstats API: Get Artist Audience - Geographic distribution */}
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={geoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis dataKey="country" stroke="#666666" style={{ fontSize: "9px" }} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" style={{ fontSize: "9px" }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "10px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="streams" fill="#cccccc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Platform Listeners">
              {/* Songstats API: Get Artist Current Stats - Monthly listeners by platform */}
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={platformListenersData} cx="50%" cy="50%" outerRadius={45} innerRadius={20} dataKey="percent">
                    {platformListenersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#ffffff", "#cccccc", "#888888"][index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "10px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "9px", paddingTop: "6px" }} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Platform Engagement">
              {/* Songstats API: Get Artist Current Stats - Calculated from followers/streams ratio */}
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis dataKey="platform" stroke="#666666" style={{ fontSize: "9px" }} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666666" style={{ fontSize: "9px" }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "10px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Bar dataKey="engagement" fill="#888888" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Fourth Row - Radar & Year Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <ChartCard title="Performance Radar">
              {/* Songstats API: Get Artist Current Stats - Multi-metric composite score */}
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#666666" opacity={0.3} />
                  <PolarAngleAxis dataKey="subject" stroke="#888888" style={{ fontSize: "10px" }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666666" style={{ fontSize: "9px" }} />
                  <Radar name="Performance" dataKey="value" stroke="#ffffff" fill="#ffffff" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Year-over-Year Growth">
              {/* Songstats API: Get Artist Historic Stats - Annual comparison */}
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={yearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" opacity={0.2} />
                  <XAxis dataKey="year" stroke="#666666" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#ffffff" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#888888" style={{ fontSize: "10px" }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#111111", 
                      border: "1px solid #1a1a1a", 
                      borderRadius: "6px", 
                      padding: "6px", 
                      fontSize: "11px",
                      color: "#ffffff"
                    }}
                    labelStyle={{ color: "#ffffff" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }} />
                  <Line yAxisId="left" type="monotone" dataKey="streams" stroke="#ffffff" strokeWidth={2} dot={false} name="Streams" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#cccccc" strokeWidth={2} dot={false} name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
}
