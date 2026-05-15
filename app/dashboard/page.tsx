"use client"

import { useState, useMemo } from "react"
import { TransitionLink as Link } from "@/components/transition-link"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Filter,
  X,
  Search,
  RefreshCw,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPinDoodle, PotholeDoodle, RoadDoodle } from "@/components/doodles"
import { mockReports, ISSUE_TYPES, ROAD_TYPES, STATUSES, type Report } from "@/lib/mock-data"
import { useCounter } from "@/hooks/use-counter"

const DashboardMap = dynamic(() => import("@/components/dashboard-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-secondary/30 rounded-xl gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <MapPinDoodle className="w-16 h-16 text-primary/50" animate={false} />
      </motion.div>
      <p className="text-muted-foreground text-sm">Loading map...</p>
    </div>
  ),
})

function AnimatedStatCard({
  value,
  label,
  icon: Icon,
  color,
  bgColor,
}: {
  value: number
  label: string
  icon: React.ElementType
  color: string
  bgColor: string
}) {
  const { count, ref } = useCounter(value, 1000)
  return (
    <motion.div
      ref={ref}
      className={`${bgColor} rounded-xl p-3 sm:p-4 relative overflow-hidden cursor-default`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative z-10">
        <div className={`text-2xl sm:text-3xl font-bold ${color}`}>{count}</div>
        <div className="text-xs sm:text-sm opacity-70 flex items-center gap-1 mt-1">
          <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="truncate">{label}</span>
        </div>
      </div>
      <motion.div
        className="absolute -right-3 -bottom-3 opacity-10"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Icon className="w-14 h-14 sm:w-20 sm:h-20" />
      </motion.div>
    </motion.div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ReportCard({
  report,
  isSelected,
  onClick,
  expanded = false,
}: {
  report: Report
  isSelected: boolean
  onClick: () => void
  expanded?: boolean
}) {
  return (
    <Card
      className={`cursor-pointer transition-all group ${
        isSelected
          ? "border-primary border-2 shadow-md bg-primary/5"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {report.title}
            </h4>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {report.issue_type.replace("_", " ")} · {report.road_type}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge
              variant="secondary"
              className={`shrink-0 text-xs ${
                report.severity === "high"
                  ? "bg-red-100 text-red-800"
                  : report.severity === "medium"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {report.severity}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {report.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
        {expanded && (
          <motion.div
            className="mt-3 pt-3 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xs text-muted-foreground">{report.location_address}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-primary font-medium">{report.authority}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(report.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}



export default function DashboardPage() {
  const [filters, setFilters] = useState({
    status: "all",
    issue_type: "all",
    road_type: "all",
    search: "",
  })
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredReports = useMemo(() => {
    return mockReports.filter((report) => {
      if (filters.status !== "all" && report.status !== filters.status) return false
      if (filters.issue_type !== "all" && report.issue_type !== filters.issue_type) return false
      if (filters.road_type !== "all" && report.road_type !== filters.road_type) return false
      if (
        filters.search &&
        !report.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      return true
    })
  }, [filters])

  const stats = useMemo(
    () => ({
      total: filteredReports.length,
      pending: filteredReports.filter((r) => r.status === "pending").length,
      in_progress: filteredReports.filter((r) => r.status === "in_progress").length,
      resolved: filteredReports.filter((r) => r.status === "resolved").length,
    }),
    [filteredReports]
  )

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setSelectedReport(null)
  }

  const clearFilters = () => {
    setFilters({ status: "all", issue_type: "all", road_type: "all", search: "" })
    setSelectedReport(null)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.issue_type !== "all" ||
    filters.road_type !== "all" ||
    !!filters.search

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* ── Header ── */}
      <motion.header
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="group">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                  Back
                </Link>
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <MapPinDoodle className="w-6 h-6 text-primary" animate={false} />
                <h1 className="text-xl font-bold">Live Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
              <Button asChild className="hidden sm:flex">
                <Link href="/report">Report Issue</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Stats Bar ── */}
      <div className="border-b border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <AnimatedStatCard
              value={stats.total}
              label="Total"
              icon={MapPin}
              color="text-primary"
              bgColor="bg-primary/10"
            />
            <AnimatedStatCard
              value={stats.pending}
              label="Pending"
              icon={Clock}
              color="text-yellow-700"
              bgColor="bg-yellow-100"
            />
            <AnimatedStatCard
              value={stats.in_progress}
              label="In Progress"
              icon={AlertTriangle}
              color="text-blue-700"
              bgColor="bg-blue-100"
            />
            <AnimatedStatCard
              value={stats.resolved}
              label="Resolved"
              icon={CheckCircle2}
              color="text-green-700"
              bgColor="bg-green-100"
            />
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Bar ── */}
      <div className="md:hidden border-b border-border bg-background">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                {[filters.status, filters.issue_type, filters.road_type, filters.search]
                  .filter((v) => v && v !== "all").length} active
              </Badge>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showMobileFilters ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {STATUSES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filters.issue_type} onValueChange={(v) => handleFilterChange("issue_type", v)}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {ISSUE_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filters.road_type} onValueChange={(v) => handleFilterChange("road_type", v)}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Road" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roads</SelectItem>
                      {ROAD_TYPES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main Layout ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex flex-col w-80 border-r border-border bg-background">
          <div className="p-4 border-b border-border shrink-0">
            <div className="relative mb-4">
              <RoadDoodle className="w-full h-8 opacity-[0.08] text-foreground" animate={false} />
            </div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-9"
                />
              </div>
              <FilterSelect
                label="Status"
                value={filters.status}
                onChange={(v) => handleFilterChange("status", v)}
                options={[{ value: "all", label: "All Statuses" }, ...STATUSES]}
              />
              <FilterSelect
                label="Issue Type"
                value={filters.issue_type}
                onChange={(v) => handleFilterChange("issue_type", v)}
                options={[{ value: "all", label: "All Types" }, ...ISSUE_TYPES]}
              />
              <FilterSelect
                label="Road Type"
                value={filters.road_type}
                onChange={(v) => handleFilterChange("road_type", v)}
                options={[{ value: "all", label: "All Roads" }, ...ROAD_TYPES]}
              />
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Report list */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {filteredReports.length} Reports
              </h3>
              {selectedReport && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <ReportCard
                      report={report}
                      isSelected={selectedReport?.id === report.id}
                      onClick={() => setSelectedReport(report)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredReports.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <PotholeDoodle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" animate={false} />
                  <p className="text-muted-foreground text-sm">No reports found</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </aside>

        {/* Map + List area */}
        <div className="flex-1 flex flex-col md:block relative">
          {/* Map container */}
          <div className="h-[50vh] md:h-[65vh] md:p-4 shrink-0">
            <motion.div
              className="h-full md:rounded-xl overflow-hidden md:border border-border md:shadow-sm"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardMap
                reports={filteredReports}
                selectedReport={selectedReport}
                onSelectReport={setSelectedReport}
              />
            </motion.div>
          </div>

          {/* Mobile report list */}
          <div className="flex-1 overflow-y-auto md:hidden bg-background border-t border-border">
            <div className="px-4 py-3 bg-secondary/30 border-b border-border sticky top-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{filteredReports.length} Reports</span>
              </div>
              {selectedReport && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <div className="p-4 space-y-2">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  isSelected={selectedReport?.id === report.id}
                  onClick={() => setSelectedReport(report)}
                  expanded={selectedReport?.id === report.id}
                />
              ))}
              {filteredReports.length === 0 && (
                <div className="text-center py-8">
                  <PotholeDoodle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" animate={false} />
                  <p className="text-muted-foreground text-sm">No reports found</p>
                  <Button variant="link" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Selected report detail — desktop only */}
          <AnimatePresence>
            {selectedReport && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="hidden md:block absolute bottom-4 left-4 right-4 bg-card rounded-xl border border-border shadow-lg z-30"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <Badge
                          variant="secondary"
                          className={`${
                            selectedReport.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : selectedReport.severity === "medium"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {selectedReport.severity}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {selectedReport.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <h3 className="font-bold">{selectedReport.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5 truncate">
                        {selectedReport.location_address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Authority</p>
                        <p className="text-sm font-medium text-primary">{selectedReport.authority}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
