"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import { Globe, Users, MapPin, TrendingUp } from "lucide-react";

interface FanLocation {
  id: string;
  name: string;
  country: string;
  state?: string;
  listeners: number;
  growth: number;
  lat: number;
  lng: number;
}

const fanLocations: FanLocation[] = [
  { id: "1", name: "São Paulo", country: "Brazil", listeners: 12500, growth: 12.5, lat: -23.5505, lng: -46.6333 },
  { id: "2", name: "Lagos", country: "Nigeria", listeners: 9800, growth: 8.3, lat: 6.5244, lng: 3.3792 },
  { id: "3", name: "Mumbai", country: "India", listeners: 7200, growth: 15.2, lat: 19.0760, lng: 72.8777 },
  { id: "4", name: "Buenos Aires", country: "Argentina", listeners: 5600, growth: 9.7, lat: -34.6037, lng: -58.3816 },
  { id: "5", name: "Cairo", country: "Egypt", listeners: 4200, growth: 11.8, lat: 30.0444, lng: 31.2357 },
  { id: "6", name: "Bangkok", country: "Thailand", listeners: 3800, growth: 7.4, lat: 13.7563, lng: 100.5018 },
  { id: "7", name: "Jakarta", country: "Indonesia", listeners: 3400, growth: 18.2, lat: -6.2088, lng: 106.8456 },
  { id: "8", name: "Mexico City", country: "Mexico", listeners: 3100, growth: 6.9, lat: 19.4326, lng: -99.1332 },
  { id: "9", name: "Seoul", country: "South Korea", listeners: 2900, growth: 10.1, lat: 37.5665, lng: 126.9780 },
  { id: "10", name: "Manila", country: "Philippines", listeners: 2700, growth: 9.2, lat: 14.5995, lng: 120.9842 },
  { id: "11", name: "Johannesburg", country: "South Africa", listeners: 2500, growth: 14.5, lat: -26.2041, lng: 28.0473 },
  { id: "12", name: "Lima", country: "Peru", listeners: 2200, growth: 8.7, lat: -12.0464, lng: -77.0428 },
  { id: "13", name: "Kathmandu", country: "Nepal", listeners: 1800, growth: 12.3, lat: 27.7172, lng: 85.3240 },
];

// Manual position adjustments for cities that don't align perfectly with the map projection
const positionAdjustments: Record<string, { x: number; y: number }> = {
  "1": { x: -5, y: 60 }, // São Paulo - move slightly west and down 1.5 inches
  "4": { x: -8, y: 2 }, // Buenos Aires - move west and slightly south
  "12": { x: -10, y: -3 }, // Lima - move west and north
  "11": { x: 0, y: 120 }, // Johannesburg - move down (south) by 3 inches total
};

export default function GlobePage() {
  const [selectedLocation, setSelectedLocation] = useState<FanLocation | null>(null);
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  // Top locations for sidebar
  const topLocations = [...fanLocations].sort((a, b) => b.listeners - a.listeners).slice(0, 5);

  // Convert lat/lng to x/y coordinates on a flat map (Mercator projection)
  const latLngToXY = (lat: number, lng: number, width: number, height: number, locationId?: string) => {
    let x = ((lng + 180) / 360) * width;
    let y = ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * height;
    
    // Global left shift for all dots (adjust this value - increase for more left shift)
    x -= 30;
    
    // Apply manual adjustments if needed
    if (locationId && positionAdjustments[locationId]) {
      const adjustment = positionAdjustments[locationId];
      x += adjustment.x;
      y += adjustment.y;
    }
    
    return { x, y };
  };

  const mapWidth = 1000;
  const mapHeight = 500;

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
            <h1 className="text-2xl sm:text-3xl font-semibold text-dark-text mb-2">Globe</h1>
            <p className="text-sm text-dark-text-muted">
              Explore your global fanbase across the world
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* World Map Visualization */}
            <div className="lg:col-span-2">
              <div
                className={cn(
                  "relative rounded-xl p-6 border backdrop-blur-xl overflow-hidden",
                  isDark
                    ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                    : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                )}
                style={{ height: "600px" }}
              >
                <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                
                {/* World Map */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                  {/* World Map Image */}
                  <img
                    src="/world-map.jpg"
                    alt="World Map"
                    className="w-full h-full object-contain rounded-xl"
                    style={{
                      filter: isDark ? "brightness(0.8) contrast(1.2)" : "brightness(1.1) contrast(1.1)",
                    }}
                  />
                  
                  {/* Overlay SVG for markers - positioned absolutely over the image */}
                  <svg
                    viewBox="0 0 1000 500"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ pointerEvents: "auto" }}
                  >
                    {/* Location Markers */}
                    {fanLocations.map((location) => {
                      const { x, y } = latLngToXY(location.lat, location.lng, mapWidth, mapHeight, location.id);
                      const intensity = Math.min(location.listeners / 10000, 1);
                      const size = 8 + intensity * 12;
                      
                      return (
                        <g
                          key={location.id}
                          onMouseEnter={() => setSelectedLocation(location)}
                          onMouseLeave={() => setSelectedLocation(null)}
                          className="cursor-pointer"
                        >
                          {/* Pulse Animation */}
                          <circle
                            cx={x}
                            cy={y}
                            r={size + 8}
                            fill={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                            opacity="0.6"
                          >
                            <animate
                              attributeName="r"
                              values={`${size + 8};${size + 20};${size + 8}`}
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.6;0;0.6"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          {/* Marker Dot */}
                          <circle
                            cx={x}
                            cy={y}
                            r={size / 2}
                            fill={isDark ? "#ffffff" : "#000000"}
                            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                            strokeWidth="2"
                            style={{
                              filter: `drop-shadow(0 0 ${8 + intensity * 15}px ${isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"})`,
                            }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected Location Tooltip */}
                {selectedLocation && (
                  <div
                    className={cn(
                      "absolute z-30 p-4 rounded-lg border backdrop-blur-xl pointer-events-none transition-all shadow-2xl",
                      isDark
                        ? "bg-black/90 border-white/30 text-white"
                        : "bg-white/95 border-black/30 text-black"
                    )}
                    style={{
                      top: "20px",
                      left: "20px",
                      minWidth: "220px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className={cn("w-4 h-4", isDark ? "text-white" : "text-black")} />
                      <h3 className={cn("text-sm font-semibold", isDark ? "text-white" : "text-black")}>
                        {selectedLocation.name}
                        {selectedLocation.state && `, ${selectedLocation.state}`}
                      </h3>
                    </div>
                    <p className={cn("text-xs mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                      {selectedLocation.country}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className={cn("flex items-center gap-1", isDark ? "text-white" : "text-black")}>
                        <Users className="w-3 h-3" />
                        {selectedLocation.listeners.toLocaleString()}
                      </span>
                      <span className={cn("flex items-center gap-1", isDark ? "text-green-400" : "text-green-600")}>
                        <TrendingUp className="w-3 h-3" />
                        +{selectedLocation.growth}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-4">
              {/* Total Stats */}
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
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-dark-text" />
                    <h2 className="text-sm font-semibold text-dark-text">Global Reach</h2>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-dark-text-muted mb-1">Total Locations</p>
                      <p className="text-2xl font-bold text-dark-text">{fanLocations.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-text-muted mb-1">Total Listeners</p>
                      <p className="text-xl font-bold text-dark-text">
                        {fanLocations.reduce((sum, loc) => sum + loc.listeners, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Locations */}
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
                  <h2 className="text-sm font-semibold text-dark-text mb-3">Top Locations</h2>
                  <div className="space-y-2">
                    {topLocations.map((location, index) => (
                      <div
                        key={location.id}
                        className={cn(
                          "p-2 rounded-lg border backdrop-blur-md cursor-pointer transition-all",
                          selectedLocation?.id === location.id
                            ? isDark
                              ? "bg-white/10 border-white/20"
                              : "bg-black/10 border-black/20"
                            : isDark
                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                            : "bg-black/5 border-black/10 hover:bg-black/10"
                        )}
                        onMouseEnter={() => setSelectedLocation(location)}
                        onMouseLeave={() => setSelectedLocation(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-dark-text-muted w-4">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-dark-text">
                                {location.name}
                                {location.state && `, ${location.state}`}
                              </p>
                              <p className="text-[10px] text-dark-text-muted">{location.country}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-dark-text">
                              {location.listeners.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-white">+{location.growth}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
