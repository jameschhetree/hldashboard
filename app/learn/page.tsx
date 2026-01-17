"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";
import { useTheme } from "@/lib/theme";
import { useSidebar } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Play,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Music,
  Search,
  Filter,
} from "lucide-react";

type ResourceType = "all" | "article" | "video" | "guide" | "course";
type Category = "all" | "marketing" | "production" | "business" | "growth";

interface Resource {
  id: number;
  title: string;
  type: ResourceType;
  category: Category;
  description: string;
  duration?: string;
  author: string;
  date: string;
  readTime?: string;
  icon: typeof BookOpen;
  featured?: boolean;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "How to Grow Your Fanbase on Spotify",
    type: "article",
    category: "marketing",
    description: "Learn proven strategies to increase your streams and followers on Spotify through playlist pitching and social media integration.",
    author: "Sarah Johnson",
    date: "2024-01-10",
    readTime: "8 min read",
    icon: FileText,
    featured: true,
  },
  {
    id: 2,
    title: "Music Production Basics: Mixing & Mastering",
    type: "video",
    category: "production",
    description: "A comprehensive video guide covering essential mixing and mastering techniques for independent artists.",
    author: "Mike Chen",
    date: "2024-01-05",
    duration: "45 min",
    icon: Video,
    featured: true,
  },
  {
    id: 3,
    title: "Understanding Music Royalties & Payments",
    type: "guide",
    category: "business",
    description: "Complete guide to understanding how royalties work across different platforms and how to maximize your earnings.",
    author: "David Martinez",
    date: "2023-12-20",
    readTime: "12 min read",
    icon: DollarSign,
    featured: true,
  },
  {
    id: 4,
    title: "Social Media Strategy for Musicians",
    type: "article",
    category: "marketing",
    description: "Build your brand and engage with fans through effective social media strategies tailored for musicians.",
    author: "Emma Wilson",
    date: "2023-12-15",
    readTime: "10 min read",
    icon: FileText,
  },
  {
    id: 5,
    title: "Building Your First EP: Step-by-Step",
    type: "course",
    category: "production",
    description: "A complete course covering everything from songwriting to release strategy for your first EP.",
    author: "Alex Thompson",
    date: "2023-12-10",
    duration: "3 hours",
    icon: Music,
  },
  {
    id: 6,
    title: "Getting Playlisted: A Complete Guide",
    type: "guide",
    category: "marketing",
    description: "Learn how to get your music featured on editorial and user-generated playlists across all major platforms.",
    author: "Lisa Park",
    date: "2023-12-05",
    readTime: "15 min read",
    icon: TrendingUp,
  },
  {
    id: 7,
    title: "Live Performance Tips for Emerging Artists",
    type: "video",
    category: "growth",
    description: "Master the art of live performance with tips on stage presence, audience engagement, and building a memorable show.",
    author: "James Rodriguez",
    date: "2023-11-28",
    duration: "30 min",
    icon: Video,
  },
  {
    id: 8,
    title: "Music Distribution: Platforms Compared",
    type: "article",
    category: "business",
    description: "Compare different music distribution platforms and find the best option for your needs and budget.",
    author: "Rachel Green",
    date: "2023-11-22",
    readTime: "7 min read",
    icon: FileText,
  },
  {
    id: 9,
    title: "Building a Sustainable Music Career",
    type: "course",
    category: "business",
    description: "Long-term strategies for building a sustainable career in music, including financial planning and career development.",
    author: "Michael Brown",
    date: "2023-11-18",
    duration: "2.5 hours",
    icon: Users,
  },
  {
    id: 10,
    title: "Vocal Techniques for Recording",
    type: "video",
    category: "production",
    description: "Professional vocal recording techniques to help you capture the best performance in the studio.",
    author: "Jennifer Lee",
    date: "2023-11-12",
    duration: "25 min",
    icon: Video,
  },
];

export default function LearnPage() {
  const [selectedType, setSelectedType] = useState<ResourceType>("all");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();
  const isDark = theme === "dark";

  const types: { value: ResourceType; label: string; icon: typeof BookOpen }[] = [
    { value: "all", label: "All", icon: Filter },
    { value: "article", label: "Articles", icon: FileText },
    { value: "video", label: "Videos", icon: Video },
    { value: "guide", label: "Guides", icon: BookOpen },
    { value: "course", label: "Courses", icon: Play },
  ];

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "marketing", label: "Marketing" },
    { value: "production", label: "Production" },
    { value: "business", label: "Business" },
    { value: "growth", label: "Growth" },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter((r) => r.featured);

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
              Learning & Resources
            </h1>
            <p className="text-sm text-dark-text-muted">
              Educational content to help grow your music career
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 mb-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text-muted" />
              <input
                type="text"
                placeholder="Search articles, videos, guides..."
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {types.map((type) => {
                  const Icon = type.icon;
                  const isActive = selectedType === type.value;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-xl transition-all whitespace-nowrap",
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
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {categories.map((category) => {
                  const isActive = selectedCategory === category.value;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={cn(
                        "px-4 py-2 rounded-xl border backdrop-blur-xl transition-all whitespace-nowrap text-sm font-medium",
                        isActive
                          ? isDark
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-black/10 border-black/20 text-black"
                          : isDark
                          ? "bg-white/5 border-white/10 text-dark-text-muted hover:bg-white/10 hover:text-white"
                          : "bg-black/5 border-black/10 text-light-text-muted hover:bg-black/10 hover:text-black"
                      )}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Learning Paths Section */}
          {selectedType === "all" && selectedCategory === "all" && searchQuery === "" && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-dark-text mb-3">Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  className={cn(
                    "relative rounded-xl p-5 border backdrop-blur-xl transition-all hover:shadow-xl overflow-hidden group cursor-pointer",
                    isDark
                      ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                      : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                  )}
                >
                  <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "p-3 rounded-lg backdrop-blur-md border",
                          isDark
                            ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
                            : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
                        )}
                      >
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-dark-text">Getting Started</h3>
                        <p className="text-xs text-dark-text-muted">5 resources</p>
                      </div>
                    </div>
                    <p className="text-sm text-dark-text-muted-2 leading-relaxed mb-3">
                      Essential guides for new artists covering basics of distribution, promotion, and building your brand.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-dark-text-muted">
                      <span>Beginner</span>
                      <span>•</span>
                      <span>2 hours</span>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "relative rounded-xl p-5 border backdrop-blur-xl transition-all hover:shadow-xl overflow-hidden group cursor-pointer",
                    isDark
                      ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
                      : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
                  )}
                >
                  <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "p-3 rounded-lg backdrop-blur-md border",
                          isDark
                            ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
                            : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
                        )}
                      >
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-dark-text">Business Mastery</h3>
                        <p className="text-xs text-dark-text-muted">4 resources</p>
                      </div>
                    </div>
                    <p className="text-sm text-dark-text-muted-2 leading-relaxed mb-3">
                      Advanced strategies for monetization, contracts, royalties, and building a sustainable music career.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-dark-text-muted">
                      <span>Advanced</span>
                      <span>•</span>
                      <span>4 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Featured Resources */}
          {selectedType === "all" && selectedCategory === "all" && searchQuery === "" && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-dark-text mb-3">Featured This Week</h2>
              <div className="space-y-3">
                {featuredResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <FeaturedResourceCard key={resource.id} resource={resource} Icon={Icon} isDark={isDark} />
                  );
                })}
              </div>
            </div>
          )}

          {/* All Resources */}
          <div>
            <h2 className="text-lg font-semibold text-dark-text mb-3">
              {selectedType === "all" && selectedCategory === "all" && searchQuery === ""
                ? "All Resources"
                : "Results"}
            </h2>
            <div className="space-y-3">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <HorizontalResourceCard key={resource.id} resource={resource} Icon={Icon} isDark={isDark} />
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-dark-text-muted">No resources found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeaturedResourceCard({
  resource,
  Icon,
  isDark,
}: {
  resource: Resource;
  Icon: typeof BookOpen;
  isDark: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-5 border backdrop-blur-xl transition-all duration-300 hover:shadow-xl overflow-hidden group cursor-pointer",
        isDark
          ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
          : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
      )}
    >
      <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={cn(
            "p-3 rounded-lg backdrop-blur-md border flex-shrink-0",
            isDark
              ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
              : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-dark-text pr-2">{resource.title}</h3>
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0",
                isDark ? "bg-white/20 text-white" : "bg-black/20 text-black"
              )}
            >
              Featured
            </span>
          </div>
          <p className="text-sm text-dark-text-muted-2 leading-relaxed mb-3">
            {resource.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-dark-text-muted">
              <span>{resource.author}</span>
              <span>•</span>
              <span>{new Date(resource.date).toLocaleDateString()}</span>
              {resource.readTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.readTime}</span>
                  </div>
                </>
              )}
              {resource.duration && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    <span>{resource.duration}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-dark-text-muted group-hover:text-dark-text transition-colors">
              <span>Open</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalResourceCard({
  resource,
  Icon,
  isDark,
}: {
  resource: Resource;
  Icon: typeof BookOpen;
  isDark: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-4 border backdrop-blur-xl transition-all duration-300 hover:shadow-xl overflow-hidden group cursor-pointer",
        isDark
          ? "bg-gradient-to-br from-white/5 via-white/3 to-white/2 border-white/10 shadow-lg"
          : "bg-gradient-to-br from-black/5 via-black/3 to-black/2 border-black/10 shadow-lg"
      )}
    >
      <div className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/8 via-white/4 to-transparent" />
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={cn(
            "p-2.5 rounded-lg backdrop-blur-md border flex-shrink-0",
            isDark
              ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white"
              : "bg-gradient-to-br from-black/10 to-black/5 border-black/10 text-black"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-dark-text mb-1.5">{resource.title}</h3>
          <p className="text-xs text-dark-text-muted-2 leading-relaxed mb-2.5 line-clamp-2">
            {resource.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-dark-text-muted">
              <span>{resource.author}</span>
              <span>•</span>
              <span>{new Date(resource.date).toLocaleDateString()}</span>
              {resource.readTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.readTime}</span>
                  </div>
                </>
              )}
              {resource.duration && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    <span>{resource.duration}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-dark-text-muted group-hover:text-dark-text transition-colors">
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
