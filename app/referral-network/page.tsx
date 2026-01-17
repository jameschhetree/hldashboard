"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import {
  Music,
  Scissors,
  Sparkles,
  Mic,
  Shirt,
  Camera,
  MapPin,
  Phone,
  Mail,
  Percent,
  Search,
  Filter,
  Building2,
  Users,
  Palette,
} from "lucide-react";

type BusinessCategory = "all" | "venues" | "services" | "merch" | "beauty" | "coaching";

interface Business {
  id: number;
  name: string;
  category: BusinessCategory;
  service: string;
  discount: string;
  description: string;
  location: string;
  phone?: string;
  email?: string;
  icon: typeof Music;
  featured?: boolean;
}

const businesses: Business[] = [
  {
    id: 1,
    name: "The Underground",
    category: "venues",
    service: "Live Music Venue",
    discount: "20% OFF",
    description: "Premium venue booking with state-of-the-art sound system. Perfect for album releases and intimate shows.",
    location: "Los Angeles, CA",
    phone: "(323) 555-0123",
    email: "bookings@undergroundla.com",
    icon: Music,
    featured: true,
  },
  {
    id: 2,
    name: "Elite Merch Co.",
    category: "merch",
    service: "Merchandise Production",
    discount: "15% OFF",
    description: "High-quality t-shirts, hoodies, vinyl stickers, and custom merch. Fast turnaround, bulk discounts available.",
    location: "New York, NY",
    phone: "(212) 555-0456",
    email: "orders@elitemerch.com",
    icon: Shirt,
    featured: true,
  },
  {
    id: 3,
    name: "Studio Cuts",
    category: "beauty",
    service: "Barber & Styling",
    discount: "25% OFF",
    description: "Professional grooming for artists. Specializing in stage-ready looks and photo shoot styling.",
    location: "Atlanta, GA",
    phone: "(404) 555-0789",
    email: "book@studiocuts.com",
    icon: Scissors,
  },
  {
    id: 4,
    name: "Glamour Studio",
    category: "beauty",
    service: "Makeup & Styling",
    discount: "30% OFF",
    description: "Professional makeup artists for music videos, photoshoots, and live performances. HD-ready looks.",
    location: "Miami, FL",
    phone: "(305) 555-0321",
    email: "hello@glamourstudio.com",
    icon: Sparkles,
  },
  {
    id: 5,
    name: "Vocal Mastery Academy",
    category: "coaching",
    service: "Vocal Coaching",
    discount: "20% OFF",
    description: "One-on-one vocal training with industry professionals. Improve range, technique, and performance skills.",
    location: "Nashville, TN",
    phone: "(615) 555-0567",
    email: "info@vocalmastery.com",
    icon: Mic,
    featured: true,
  },
  {
    id: 6,
    name: "The Warehouse",
    category: "venues",
    service: "Event Space",
    discount: "18% OFF",
    description: "Industrial-chic event space perfect for album release parties and private shows. Capacity: 500.",
    location: "Brooklyn, NY",
    phone: "(718) 555-0987",
    email: "events@warehousebk.com",
    icon: Building2,
  },
  {
    id: 7,
    name: "Print Pro",
    category: "merch",
    service: "Printing Services",
    discount: "22% OFF",
    description: "Custom posters, flyers, album artwork printing. High-quality prints for promotional materials.",
    location: "Portland, OR",
    phone: "(503) 555-0145",
    email: "print@printpro.com",
    icon: Palette,
  },
  {
    id: 8,
    name: "Lens & Light",
    category: "services",
    service: "Photography & Videography",
    discount: "25% OFF",
    description: "Professional music video production, album cover photography, and promotional content creation.",
    location: "Austin, TX",
    phone: "(512) 555-0765",
    email: "shoot@lenslight.com",
    icon: Camera,
  },
  {
    id: 9,
    name: "Beat Lab Studios",
    category: "services",
    service: "Recording Studio",
    discount: "15% OFF",
    description: "State-of-the-art recording facility with premium equipment. Hourly and package rates available.",
    location: "Chicago, IL",
    phone: "(312) 555-0234",
    email: "book@beatlab.com",
    icon: Music,
  },
  {
    id: 10,
    name: "Stage Presence Co.",
    category: "coaching",
    service: "Performance Coaching",
    discount: "20% OFF",
    description: "Stage presence and performance training. Learn to command the stage and connect with audiences.",
    location: "Seattle, WA",
    phone: "(206) 555-0543",
    email: "train@stagepresence.com",
    icon: Users,
  },
  {
    id: 11,
    name: "The Loft",
    category: "venues",
    service: "Intimate Venue",
    discount: "20% OFF",
    description: "Cozy 200-capacity venue perfect for acoustic sets and album listening parties. Great acoustics.",
    location: "San Francisco, CA",
    phone: "(415) 555-0876",
    email: "book@theloftsf.com",
    icon: Building2,
  },
  {
    id: 12,
    name: "Custom Threads",
    category: "merch",
    service: "Apparel Design",
    discount: "18% OFF",
    description: "Custom-designed apparel from concept to production. Limited edition runs and bulk orders.",
    location: "Denver, CO",
    phone: "(303) 555-0654",
    email: "design@customthreads.com",
    icon: Shirt,
  },
];

export default function ReferralNetworkPage() {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  const categories: { value: BusinessCategory; label: string; icon: typeof Music }[] = [
    { value: "all", label: "All", icon: Filter },
    { value: "venues", label: "Venues", icon: Building2 },
    { value: "services", label: "Services", icon: Camera },
    { value: "merch", label: "Merch", icon: Shirt },
    { value: "beauty", label: "Beauty", icon: Sparkles },
    { value: "coaching", label: "Coaching", icon: Mic },
  ];

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory;
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Referral Network
            </h1>
            <p className="text-sm text-dark-text-muted">
              Exclusive discounts from trusted partners for ArtistHub members
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text-muted" />
              <input
                type="text"
                placeholder="Search businesses, services, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-xl border backdrop-blur-xl",
                  "bg-gradient-to-br from-white/5 via-white/3 to-white/2",
                  "border-white/10 text-dark-text placeholder-dark-text-muted-2",
                  "focus:outline-none focus:ring-2 focus:ring-white/20",
                  "text-sm"
                )}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.value;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl border backdrop-blur-xl transition-all whitespace-nowrap",
                      isActive
                        ? isDark
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-black/10 border-black/20 text-black"
                        : isDark
                        ? "bg-white/5 border-white/10 text-dark-text-muted hover:bg-white/10 hover:text-white"
                        : "bg-black/5 border-black/10 text-light-text-muted hover:bg-black/10 hover:text-black"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Businesses */}
          {selectedCategory === "all" && searchQuery === "" && (
            <div>
              <h2 className="text-lg font-semibold text-dark-text mb-3">Featured Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {businesses
                  .filter((b) => b.featured)
                  .map((business) => {
                    const Icon = business.icon;
                    return (
                      <BusinessCard key={business.id} business={business} Icon={Icon} isDark={isDark} />
                    );
                  })}
              </div>
            </div>
          )}

          {/* All Businesses */}
          <div>
            <h2 className="text-lg font-semibold text-dark-text mb-3">
              {selectedCategory === "all" && searchQuery === "" ? "All Partners" : "Results"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => {
                  const Icon = business.icon;
                  return (
                    <BusinessCard key={business.id} business={business} Icon={Icon} isDark={isDark} />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-dark-text-muted">No businesses found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BusinessCard({
  business,
  Icon,
  isDark,
}: {
  business: Business;
  Icon: typeof Music;
  isDark: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-3 border backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden group",
        isDark
          ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
          : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
      )}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
      <div className="absolute inset-0 rounded-xl opacity-60 bg-gradient-to-br from-white/15 via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header with Icon and Discount Badge */}
        <div className="flex items-start justify-between mb-2">
          <div
            className={cn(
              "p-2 rounded-lg backdrop-blur-md border flex-shrink-0",
              isDark
                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
                : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div
            className={cn(
              "px-2 py-1 rounded-md border backdrop-blur-md font-bold text-[10px]",
              isDark
                ? "bg-gradient-to-br from-white/20 to-white/10 border-white/20 text-white"
                : "bg-gradient-to-br from-black/20 to-black/10 border-black/20 text-black"
            )}
          >
            <Percent className="w-2.5 h-2.5 inline mr-0.5" />
            {business.discount}
          </div>
        </div>

        {/* Business Info */}
        <h3 className="text-sm font-semibold text-dark-text mb-0.5">{business.name}</h3>
        <p className="text-xs text-dark-text-muted mb-2">{business.service}</p>
        <p className="text-[10px] text-dark-text-muted-2 leading-relaxed mb-2.5">{business.description}</p>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-2 text-[10px] text-dark-text-muted">
          <MapPin className="w-3 h-3" />
          <span>{business.location}</span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center gap-1.5 text-[10px] text-dark-text-muted hover:text-dark-text transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{business.phone}</span>
            </a>
          )}
          {business.email && (
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-1.5 text-[10px] text-dark-text-muted hover:text-dark-text transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span className="truncate">{business.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
