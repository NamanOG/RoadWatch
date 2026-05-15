"use client"

import { useState } from "react"
import { TransitionLink as Link } from "@/components/transition-link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Lock, Download, LogOut, CheckCircle2, AlertTriangle, Clock, Shield, Eye, EyeOff, Search, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  TrafficSignalDoodle, 
  MapPinDoodle, 
  ToolsDoodle
} from "@/components/doodles"
import { mockReports, STATUSES, type Report } from "@/lib/mock-data"

const CORRECT_PASSWORD = "roadwatch2026"

function StatCard({ value, label, icon: Icon, color, bgColor }: { 
  value: number; 
  label: string; 
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-xl p-5 relative overflow-hidden`}>
      <div className="relative z-10">
        <div className={`text-4xl font-bold ${color}`}>{value}</div>
        <div className="text-sm opacity-70 flex items-center gap-1.5 mt-1">
          <Icon className="w-4 h-4" />
          {label}
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-10">
        <Icon className="w-24 h-24" />
      </div>
    </div>
  )
}

export default function AuthorityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<"created_at" | "severity">("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
    setIsLoading(false)
  }

  const handleStatusChange = (reportId: string, newStatus: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? { ...report, status: newStatus as Report["status"] }
          : report
      )
    )
  }

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Title",
      "Description",
      "Issue Type",
      "Severity",
      "Status",
      "Latitude",
      "Longitude",
      "Road Type",
      "Authority",
      "Location",
      "Created At",
    ]
    const rows = filteredReports.map((r) => [
      r.id,
      r.title,
      r.description || "",
      r.issue_type,
      r.severity,
      r.status,
      r.latitude,
      r.longitude,
      r.road_type,
      r.authority,
      r.location_address || "",
      r.created_at,
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const link = document.createElement("a")
    link.href = encodeURI(csvContent)
    link.download = `roadwatch-reports-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const filteredReports = reports
    .filter(report => 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.issue_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.authority.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "created_at") {
        return sortDirection === "desc" 
          ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }
      const severityOrder = { high: 3, medium: 2, low: 1 }
      return sortDirection === "desc"
        ? severityOrder[b.severity] - severityOrder[a.severity]
        : severityOrder[a.severity] - severityOrder[b.severity]
    })

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    in_progress: reports.filter(r => r.status === "in_progress").length,
    resolved: reports.filter(r => r.status === "resolved").length,
  }

  const toggleSort = (field: "created_at" | "severity") => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-primary/5 border-b border-border p-6">
              <motion.div 
                className="mx-auto w-fit"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <TrafficSignalDoodle className="w-16 h-24 text-primary" animate={false} />
              </motion.div>
            </div>
            <CardHeader className="text-center pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Authority Portal</CardTitle>
              </div>
              <CardDescription>
                Enter the admin password to access the control panel
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      placeholder="Enter password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={isLoading || !password}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Lock className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Access Panel
                    </>
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Button asChild variant="ghost" size="sm" className="group">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Hint */}
          <motion.p 
            className="text-center text-xs text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Hint: roadwatch2026
          </motion.p>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="group">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-bold">Authority Panel</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export CSV</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard 
              value={stats.total} 
              label="Total Reports" 
              icon={MapPinDoodle}
              color="text-primary"
              bgColor="bg-primary/10"
            />
            <StatCard 
              value={stats.pending} 
              label="Pending" 
              icon={Clock}
              color="text-yellow-700"
              bgColor="bg-yellow-100"
            />
            <StatCard 
              value={stats.in_progress} 
              label="In Progress" 
              icon={ToolsDoodle}
              color="text-blue-700"
              bgColor="bg-blue-100"
            />
            <StatCard 
              value={stats.resolved} 
              label="Resolved" 
              icon={CheckCircle2}
              color="text-green-700"
              bgColor="bg-green-100"
            />
          </div>

          {/* Table */}
          <Card className="border border-border rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border bg-secondary/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Reports</CardTitle>
                  <CardDescription>
                    Manage and update the status of reported issues
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => toggleSort("severity")}
                      >
                        <div className="flex items-center gap-1">
                          Severity
                          {sortField === "severity" && (
                            sortDirection === "desc" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Authority</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => toggleSort("created_at")}
                      >
                        <div className="flex items-center gap-1">
                          Created
                          {sortField === "created_at" && (
                            sortDirection === "desc" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                          )}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow
                          key={report.id}
                          className={`group hover:bg-secondary/50 transition-colors cursor-pointer ${
                            expandedRow === report.id ? 'bg-secondary/30' : ''
                          }`}
                          onClick={() => setExpandedRow(expandedRow === report.id ? null : report.id)}
                        >
                          <TableCell className="font-medium capitalize">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-8 rounded-full ${
                                report.severity === "high" ? "bg-red-500" :
                                report.severity === "medium" ? "bg-orange-500" : "bg-green-500"
                              }`} />
                              {report.issue_type.replace("_", " ")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <p className="truncate font-medium" title={report.title}>
                                {report.title}
                              </p>
                              {expandedRow === report.id && report.description && (
                                <motion.p 
                                  className="text-xs text-muted-foreground mt-1"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                >
                                  {report.description}
                                </motion.p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`${
                                report.severity === "high"
                                  ? "bg-red-100 text-red-800"
                                  : report.severity === "medium"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {report.severity}
                            </Badge>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Select
                              value={report.status}
                              onValueChange={(value) =>
                                handleStatusChange(report.id, value)
                              }
                            >
                              <SelectTrigger className={`w-[140px] ${
                                report.status === "resolved" ? "border-green-300 bg-green-50" :
                                report.status === "in_progress" ? "border-blue-300 bg-blue-50" :
                                "border-yellow-300 bg-yellow-50"
                              }`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUSES.map((status) => (
                                  <SelectItem key={status.value} value={status.value}>
                                    <span className="flex items-center gap-2">
                                      {status.value === "resolved" && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                                      {status.value === "in_progress" && <AlertTriangle className="w-3.5 h-3.5 text-blue-600" />}
                                      {status.value === "pending" && <Clock className="w-3.5 h-3.5 text-yellow-600" />}
                                      {status.label}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.authority}</Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(report.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <MapPinDoodle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" animate={false} />
                  <p className="text-muted-foreground">No reports found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
