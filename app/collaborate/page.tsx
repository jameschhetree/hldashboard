"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { SpotifyIcon, AppleIcon, YouTubeIcon, InstagramIcon, TikTokIcon } from "@/components/PlatformIcons";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Generate chart data for each user
const generateWeeklyData = (base: number) => {
  return [
    { week: "W1", value: base * 0.85 },
    { week: "W2", value: base * 0.92 },
    { week: "W3", value: base * 0.96 },
    { week: "W4", value: base },
  ];
};

const generateMonthlyData = (base: number) => {
  return [
    { month: "M1", value: Math.round(base * 0.75) },
    { month: "M2", value: Math.round(base * 0.88) },
    { month: "M3", value: Math.round(base * 0.95) },
    { month: "M4", value: Math.round(base) },
  ];
};

type PlatformStats = {
  apple: number;
  spotify: number;
  youtube: number;
  instagram: number;
  tiktok: number;
};

const generatePlatformDistribution = (stats: PlatformStats) => {
  const total = stats.apple + stats.spotify + stats.youtube + stats.instagram + stats.tiktok;
  return [
    { name: "Spotify", value: Math.round((stats.spotify / total) * 100) },
    { name: "Apple", value: Math.round((stats.apple / total) * 100) },
    { name: "YouTube", value: Math.round((stats.youtube / total) * 100) },
    { name: "Instagram", value: Math.round((stats.instagram / total) * 100) },
    { name: "TikTok", value: Math.round((stats.tiktok / total) * 100) },
  ];
};

const COLORS = ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.15)'];

// Mock user data with platform stats and bios - Fixed stats to prevent hydration errors
const users = [
  { id: 1, name: "Alex Martinez", avatar: "AM", genre: "Hip-Hop", rating: 87, location: "Los Angeles, CA", totalFollowers: "125K", monthlyStreams: "42K", bio: "Alex Martinez is a rising hip-hop artist from Los Angeles with over 100K streams across platforms. Known for smooth flow and introspective lyrics, Alex has been making waves in the underground scene. Perfect collaborator for cross-genre projects and remixes.", stats: { apple: 5200, spotify: 10200, youtube: 8500, instagram: 3200, tiktok: 2800 }, weeklyData: generateWeeklyData(10200), monthlyData: generateMonthlyData(42000), platformData: generatePlatformDistribution({ apple: 5200, spotify: 10200, youtube: 8500, instagram: 3200, tiktok: 2800 }) },
  { id: 2, name: "Sam Johnson", avatar: "SJ", genre: "Pop", rating: 89, location: "New York, NY", totalFollowers: "180K", monthlyStreams: "58K", bio: "Sam Johnson is a versatile pop singer-songwriter with a knack for catchy melodies and emotional depth. With a growing fanbase of 125K followers, Sam brings professional production quality and strong vocal range to any collaboration.", stats: { apple: 4800, spotify: 11500, youtube: 9200, instagram: 4100, tiktok: 1900 }, weeklyData: generateWeeklyData(11500), monthlyData: generateMonthlyData(58000), platformData: generatePlatformDistribution({ apple: 4800, spotify: 11500, youtube: 9200, instagram: 4100, tiktok: 1900 }) },
  { id: 3, name: "Jordan Lee", avatar: "JL", genre: "R&B", rating: 85, location: "Atlanta, GA", totalFollowers: "98K", monthlyStreams: "35K", bio: "Jordan Lee crafts soulful R&B tracks that blend classic influences with modern production. Specializing in smooth vocals and atmospheric beats, Jordan has collaborated with several established artists and brings a professional network to partnerships.", stats: { apple: 6100, spotify: 9800, youtube: 7800, instagram: 2800, tiktok: 3500 }, weeklyData: generateWeeklyData(9800), monthlyData: generateMonthlyData(35000), platformData: generatePlatformDistribution({ apple: 6100, spotify: 9800, youtube: 7800, instagram: 2800, tiktok: 3500 }) },
  { id: 4, name: "Taylor Chen", avatar: "TC", genre: "Electronic", rating: 88, location: "Miami, FL", totalFollowers: "145K", monthlyStreams: "52K", bio: "Taylor Chen is an electronic music producer known for innovative sound design and high-energy tracks. With expertise in multiple sub-genres from house to future bass, Taylor offers unique production skills and a dedicated fanbase in the EDM community.", stats: { apple: 4300, spotify: 10800, youtube: 11000, instagram: 4500, tiktok: 2200 }, weeklyData: generateWeeklyData(11000), monthlyData: generateMonthlyData(52000), platformData: generatePlatformDistribution({ apple: 4300, spotify: 10800, youtube: 11000, instagram: 4500, tiktok: 2200 }) },
  { id: 5, name: "Morgan Blake", avatar: "MB", genre: "Rock", rating: 86, location: "Seattle, WA", totalFollowers: "112K", monthlyStreams: "38K", bio: "Morgan Blake fronts an indie rock band with over 200K streams and a reputation for powerful live performances. Known for dynamic arrangements and meaningful lyrics, Morgan's music resonates with audiences seeking authentic, guitar-driven soundscapes.", stats: { apple: 5500, spotify: 9200, youtube: 8600, instagram: 3600, tiktok: 3100 }, weeklyData: generateWeeklyData(9200), monthlyData: generateMonthlyData(38000), platformData: generatePlatformDistribution({ apple: 5500, spotify: 9200, youtube: 8600, instagram: 3600, tiktok: 3100 }) },
  { id: 6, name: "Casey Rivers", avatar: "CR", genre: "Indie", rating: 84, location: "Portland, OR", totalFollowers: "87K", monthlyStreams: "31K", bio: "Casey Rivers is an indie artist with a distinctive voice and experimental approach to songwriting. With a cult following and critical acclaim, Casey brings artistic integrity and creative risk-taking to collaborative projects.", stats: { apple: 4900, spotify: 10500, youtube: 7400, instagram: 3900, tiktok: 2700 }, weeklyData: generateWeeklyData(10500), monthlyData: generateMonthlyData(31000), platformData: generatePlatformDistribution({ apple: 4900, spotify: 10500, youtube: 7400, instagram: 3900, tiktok: 2700 }) },
  { id: 7, name: "Riley Parker", avatar: "RP", genre: "Jazz", rating: 83, location: "Chicago, IL", totalFollowers: "76K", monthlyStreams: "28K", bio: "Riley Parker is a jazz musician and composer with classical training and a modern sensibility. Known for sophisticated harmonies and improvisational skills, Riley brings musical sophistication and crossover appeal to collaborations.", stats: { apple: 5100, spotify: 8900, youtube: 8100, instagram: 3400, tiktok: 2400 }, weeklyData: generateWeeklyData(8900), monthlyData: generateMonthlyData(28000), platformData: generatePlatformDistribution({ apple: 5100, spotify: 8900, youtube: 8100, instagram: 3400, tiktok: 2400 }) },
  { id: 8, name: "Quinn Walker", avatar: "QW", genre: "Folk", rating: 82, location: "Nashville, TN", totalFollowers: "68K", monthlyStreams: "24K", bio: "Quinn Walker writes introspective folk songs with storytelling at the core. With acoustic roots and a growing digital presence, Quinn's music connects emotionally and offers opportunities for intimate, authentic collaborations.", stats: { apple: 4600, spotify: 8700, youtube: 7200, instagram: 3100, tiktok: 2600 }, weeklyData: generateWeeklyData(8700), monthlyData: generateMonthlyData(24000), platformData: generatePlatformDistribution({ apple: 4600, spotify: 8700, youtube: 7200, instagram: 3100, tiktok: 2600 }) },
  { id: 9, name: "Drew Summers", avatar: "DS", genre: "Country", rating: 85, location: "Austin, TX", totalFollowers: "94K", monthlyStreams: "33K", bio: "Drew Summers is a country artist with a contemporary edge, blending traditional storytelling with modern production. With regional radio play and festival bookings, Drew brings commercial potential and authentic country credibility.", stats: { apple: 5700, spotify: 10300, youtube: 7900, instagram: 3700, tiktok: 2900 }, weeklyData: generateWeeklyData(10300), monthlyData: generateMonthlyData(33000), platformData: generatePlatformDistribution({ apple: 5700, spotify: 10300, youtube: 7900, instagram: 3700, tiktok: 2900 }) },
  { id: 10, name: "Jamie Fox", avatar: "JF", genre: "Blues", rating: 81, location: "Memphis, TN", totalFollowers: "62K", monthlyStreams: "22K", bio: "Jamie Fox is a blues guitarist and vocalist with decades of experience and a loyal following. Known for raw emotion and technical prowess, Jamie offers timeless appeal and mentorship opportunities for emerging artists.", stats: { apple: 4400, spotify: 8400, youtube: 6800, instagram: 2900, tiktok: 2100 }, weeklyData: generateWeeklyData(8400), monthlyData: generateMonthlyData(22000), platformData: generatePlatformDistribution({ apple: 4400, spotify: 8400, youtube: 6800, instagram: 2900, tiktok: 2100 }) },
  { id: 11, name: "Phoenix Stone", avatar: "PS", genre: "Metal", rating: 86, location: "Denver, CO", totalFollowers: "105K", monthlyStreams: "41K", bio: "Phoenix Stone is a metal artist pushing boundaries with progressive compositions and intense performances. With a dedicated metal community following, Phoenix brings technical skill and passion to heavy collaborations.", stats: { apple: 5300, spotify: 9600, youtube: 8300, instagram: 3800, tiktok: 3300 }, weeklyData: generateWeeklyData(9600), monthlyData: generateMonthlyData(41000), platformData: generatePlatformDistribution({ apple: 5300, spotify: 9600, youtube: 8300, instagram: 3800, tiktok: 3300 }) },
  { id: 12, name: "River Moon", avatar: "RM", genre: "Ambient", rating: 84, location: "San Francisco, CA", totalFollowers: "79K", monthlyStreams: "29K", bio: "River Moon creates ambient soundscapes and experimental electronic music. With a focus on atmospheric textures and cinematic compositions, River offers unique sonic palettes for film, gaming, and collaborative projects.", stats: { apple: 4700, spotify: 9100, youtube: 7600, instagram: 3300, tiktok: 2500 }, weeklyData: generateWeeklyData(9100), monthlyData: generateMonthlyData(29000), platformData: generatePlatformDistribution({ apple: 4700, spotify: 9100, youtube: 7600, instagram: 3300, tiktok: 2500 }) },
];

interface UserCardProps {
  user: typeof users[0];
  index: number;
}

function UserCard({ user, index }: UserCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "relative w-72 h-[420px] overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-20 rounded-2xl",
        "shadow-2xl cursor-pointer flex-shrink-0 backdrop-blur-xl",
        isDark
          ? "bg-gradient-to-br from-white/10 via-white/5 to-black/30 border-2 border-white/20"
          : "bg-gradient-to-br from-black/10 via-black/5 to-white/30 border-2 border-black/20"
      )}
    >

      {/* Texture overlay */}
      <div className={cn(
        "absolute inset-0 pointer-events-none",
        isDark 
          ? "bg-gradient-to-br from-white/5 via-transparent to-black/30" 
          : "bg-gradient-to-br from-black/5 via-transparent to-white/30"
      )} />
      <div className={cn(
        "absolute inset-0 pointer-events-none",
        isDark
          ? "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]"
          : "bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.05),transparent_50%)]"
      )} />
      
      {/* Rating badge */}
      <div className={cn(
        "absolute top-1.5 right-1.5 w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-xl z-20",
        isDark
          ? "bg-gradient-to-br from-white via-gray-200 to-gray-300 border-gray-400/50"
          : "bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-600/50"
      )}>
        <span className={cn(
          "text-lg font-black drop-shadow-lg",
          isDark ? "text-gray-900" : "text-white"
        )}>
          {user.rating}
        </span>
      </div>

      {/* Content */}
      <div className={cn(
        "relative h-full flex flex-col p-3 z-10",
        isDark
          ? "bg-gradient-to-b from-white/5 via-transparent to-black/20"
          : "bg-gradient-to-b from-black/5 via-transparent to-white/20"
      )}>
        {/* Genre tag */}
        <div className={cn(
          "text-[10px] font-black px-2 py-0.5 rounded w-fit mb-2 uppercase tracking-wide mx-auto",
          isDark
            ? "bg-white/20 text-white border border-white/30"
            : "bg-black/20 text-black border border-black/30"
        )}>
          {user.genre}
        </div>

        {/* Avatar */}
        <div 
          className={cn(
            "mx-auto mb-2 w-16 h-16 rounded-full flex items-center justify-center text-xl font-black border-2 shadow-xl",
            isDark
              ? "bg-gradient-to-br from-white to-gray-200 text-gray-900 border-white/40"
              : "bg-gradient-to-br from-gray-800 to-black text-white border-gray-600/40"
          )}
        >
          {user.avatar}
        </div>

        {/* Name */}
        <h3 className={cn(
          "text-sm font-black text-center mb-1.5 drop-shadow-lg uppercase tracking-tight leading-tight px-1",
          isDark ? "text-white" : "text-gray-900"
        )}>
          {user.name}
        </h3>

        {/* Location & Stats */}
        <div className={cn(
          "text-[9px] text-center mb-1.5 px-2",
          isDark ? "text-gray-400" : "text-gray-600"
        )}>
          {user.location} • {user.totalFollowers}
        </div>

        {/* Mini Charts Grid - 4 charts */}
        <div className="grid grid-cols-2 gap-1 mb-1.5 px-2">
          {/* Chart 1: Weekly Growth - Enhanced */}
          <div className={cn(
            "rounded p-1 border relative overflow-hidden",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <div className={cn(
              "text-[7px] font-semibold mb-0.5 relative z-10",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Weekly
            </div>
            <ResponsiveContainer width="100%" height={28}>
              <AreaChart data={user.weeklyData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                <defs>
                  <linearGradient id={`gradient-w-${user.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"} stopOpacity={1}/>
                    <stop offset="50%" stopColor={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id={`stroke-w-${user.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"}/>
                    <stop offset="100%" stopColor={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={`url(#stroke-w-${user.id})`}
                  strokeWidth={2}
                  fill={`url(#gradient-w-${user.id})`}
                  dot={{ fill: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)", r: 2, strokeWidth: 1.5, stroke: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)" }}
                  activeDot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Monthly Trend - Enhanced */}
          <div className={cn(
            "rounded p-1 border relative overflow-hidden",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <div className={cn(
              "text-[7px] font-semibold mb-0.5 relative z-10",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Monthly
            </div>
            <ResponsiveContainer width="100%" height={28}>
              <LineChart data={user.monthlyData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                <defs>
                  <linearGradient id={`line-m-${user.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)"}/>
                    <stop offset="100%" stopColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}/>
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={`url(#line-m-${user.id})`}
                  strokeWidth={2.5}
                  dot={{ fill: isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.9)", r: 2.5, strokeWidth: 2, stroke: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }}
                  activeDot={{ r: 4, fill: isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.9)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Platform Distribution Pie - Enhanced */}
          <div className={cn(
            "rounded p-1 border relative overflow-hidden",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <div className={cn(
              "text-[7px] font-semibold mb-0.5 relative z-10",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Platform
            </div>
            <ResponsiveContainer width="100%" height={28}>
              <PieChart>
                <defs>
                  {user.platformData.map((entry, index) => (
                    <linearGradient key={`pie-grad-${user.id}-${index}`} id={`pie-grad-${user.id}-${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={isDark ? `rgba(255,255,255,${0.7 - index * 0.1})` : `rgba(0,0,0,${0.6 - index * 0.1})`}/>
                      <stop offset="100%" stopColor={isDark ? `rgba(255,255,255,${0.4 - index * 0.08})` : `rgba(0,0,0,${0.3 - index * 0.08})`}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={user.platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={5}
                  outerRadius={13}
                  dataKey="value"
                  stroke={isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
                  strokeWidth={1}
                >
                  {user.platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#pie-grad-${user.id}-${index})`} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Bar Chart - Enhanced */}
          <div className={cn(
            "rounded p-1 border relative overflow-hidden",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <div className={cn(
              "text-[7px] font-semibold mb-0.5 relative z-10",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Growth
            </div>
            <ResponsiveContainer width="100%" height={28}>
              <BarChart data={user.weeklyData.slice(-3)} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                <defs>
                  <linearGradient id={`bar-grad-${user.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}/>
                    <stop offset="50%" stopColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}/>
                    <stop offset="100%" stopColor={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"}/>
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="value"
                  fill={`url(#bar-grad-${user.id})`}
                  radius={[3, 3, 0, 0]}
                  stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Streams */}
        <div className={cn(
          "text-[9px] text-center mb-1.5 px-2 font-medium",
          isDark ? "text-gray-300" : "text-gray-700"
        )}>
          {user.monthlyStreams} streams
        </div>

        {/* Platform Stats - Small Boxes Grid */}
        <div className={cn(
          "mt-auto grid grid-cols-3 gap-1 rounded-lg p-1.5 border",
          isDark
            ? "bg-white/10 border-white/20"
            : "bg-black/10 border-black/20"
        )}>
          <div className={cn(
            "flex flex-col items-center justify-center p-1 rounded border",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <AppleIcon className={cn("w-3 h-3 mb-0.5", isDark ? "text-white" : "text-gray-900")} />
            <span className={cn(
              "text-[9px] font-black",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {user.stats.apple.toLocaleString()}
            </span>
          </div>
          <div className={cn(
            "flex flex-col items-center justify-center p-1 rounded border",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <SpotifyIcon className={cn("w-3 h-3 mb-0.5", isDark ? "text-white" : "text-gray-900")} />
            <span className={cn(
              "text-[9px] font-black",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {user.stats.spotify.toLocaleString()}
            </span>
          </div>
          <div className={cn(
            "flex flex-col items-center justify-center p-1 rounded border",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <YouTubeIcon className={cn("w-3 h-3 mb-0.5", isDark ? "text-white" : "text-gray-900")} />
            <span className={cn(
              "text-[9px] font-black",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {user.stats.youtube.toLocaleString()}
            </span>
          </div>
          <div className={cn(
            "flex flex-col items-center justify-center p-1 rounded border",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <InstagramIcon className={cn("w-3 h-3 mb-0.5", isDark ? "text-white" : "text-gray-900")} />
            <span className={cn(
              "text-[9px] font-black",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {user.stats.instagram.toLocaleString()}
            </span>
          </div>
          <div className={cn(
            "flex flex-col items-center justify-center p-1 rounded border col-span-2",
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-black/5 border-black/10"
          )}>
            <TikTokIcon className={cn("w-3 h-3 mb-0.5", isDark ? "text-white" : "text-gray-900")} />
            <span className={cn(
              "text-[9px] font-black",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {user.stats.tiktok.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollaboratePage() {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";
  const [centerIndex, setCenterIndex] = useState(Math.floor(users.length / 2));
  const cardWidth = 288; // w-72 = 18rem = 288px
  const gap = 16; // Reduced gap for closer cards
  const cardOffset = cardWidth + gap;

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCenterIndex((prev) => (prev - 1 + users.length) % users.length);
    } else {
      setCenterIndex((prev) => (prev + 1) % users.length);
    }
  };

  const selectedUser = users[centerIndex];

  const scrollPosition = centerIndex * cardOffset;

  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      <MobileMenu />
      <main className={cn("flex-1 p-3 sm:p-4 lg:p-5 relative z-10 transition-all duration-300", isCollapsed ? "ml-0" : "ml-0 sm:ml-64")}>
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-dark-text mb-0.5">
              Collaborate
            </h1>
            <p className="text-xs text-dark-text-muted">
              AI-powered recommendations for artists with similar stats
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Left Arrow */}
            <button
              onClick={() => handleScroll("left")}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full backdrop-blur-md border transition-all",
                "flex items-center justify-center opacity-100 hover:scale-110 cursor-pointer",
                isDark 
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                  : "bg-black/10 border-black/20 text-black hover:bg-black/20"
              )}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => handleScroll("right")}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full backdrop-blur-md border transition-all",
                "flex items-center justify-center opacity-100 hover:scale-110 cursor-pointer",
                isDark 
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                  : "bg-black/10 border-black/20 text-black hover:bg-black/20"
              )}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Cards Container */}
            <div 
              className="overflow-visible py-16 hide-scrollbar relative"
              style={{
                perspective: "1500px",
                perspectiveOrigin: "center center",
                height: "520px",
                width: "100%",
              }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {users.map((user, index) => {
                  const offset = index - centerIndex;
                  const absOffset = Math.abs(offset);
                  const isCenter = offset === 0;
                  const isAdjacent = absOffset === 1;
                  const isVisible = absOffset <= 2;
                  
                  let scale = 0.65;
                  let opacity = 0.4;
                  let zIndex = 0;
                  let rotateY = offset * 25;
                  let translateZ = absOffset * -100;
                  let translateX = 0;

                  if (isCenter) {
                    scale = 1;
                    opacity = 1;
                    zIndex = 20;
                    rotateY = 0;
                    translateZ = 0;
                    translateX = 0;
                  } else if (isAdjacent) {
                    scale = 0.8;
                    opacity = 0.85;
                    zIndex = 10;
                    translateX = offset * 280;
                  } else if (absOffset === 2) {
                    scale = 0.65;
                    opacity = 0.6;
                    zIndex = 5;
                    translateX = offset * 280;
                  } else {
                    opacity = 0;
                    scale = 0.5;
                    translateX = offset * 280;
                  }

                  return (
                    <div
                      key={user.id}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        opacity,
                        zIndex,
                        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                        visibility: isVisible ? "visible" : "hidden",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <UserCard user={user} index={offset} />
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Bio Box Below Selected Card */}
            <div className="mt-6 max-w-3xl mx-auto">
              <div className={cn(
                "relative rounded-xl p-4 border backdrop-blur-xl shadow-xl overflow-hidden",
                isDark 
                  ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10" 
                  : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10"
              )}>
                <div className={cn(
                  "absolute inset-0 rounded-xl backdrop-blur-md",
                  isDark 
                    ? "bg-gradient-to-br from-white/8 via-white/4 to-transparent" 
                    : "bg-gradient-to-br from-black/8 via-black/4 to-transparent"
                )} />
                <div className="relative z-10">
                  <h3 className={cn(
                    "text-sm font-semibold mb-2",
                    isDark ? "text-dark-text" : "text-light-text"
                  )}>
                    About {selectedUser.name}
                  </h3>
                  <p className={cn(
                    "text-xs leading-relaxed",
                    isDark ? "text-dark-text-muted" : "text-light-text-muted"
                  )}>
                    {selectedUser.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
