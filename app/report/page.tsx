"use client"

import { useState, useCallback } from "react"
import { TransitionLink as Link } from "@/components/transition-link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Upload, CheckCircle2, Camera, ArrowLeft, Loader2, Sparkles, ArrowRight, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { 
  MapPinDoodle, 
  CameraDoodle, 
  PotholeDoodle, 
  RoadDoodle, 
  CheckmarkDoodle,
  SparklesDoodle,
  LocationPingDoodle
} from "@/components/doodles"
import { ISSUE_TYPES, ROAD_TYPES, SEVERITIES, getAuthority } from "@/lib/mock-data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const slideIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
}

type FormStep = 'details' | 'location' | 'review'

export default function ReportPage() {
  const [step, setStep] = useState<FormStep>('details')
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issue_type: "",
    road_type: "",
    severity: "medium",
    latitude: "",
    longitude: "",
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const progress = step === 'details' ? 33 : step === 'location' ? 66 : 100

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const detectLocation = () => {
    setIsLocating(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          }))
          setIsLocating(false)
        },
        () => {
          setFormData(prev => ({
            ...prev,
            latitude: "28.6139",
            longitude: "77.2090",
          }))
          setIsLocating(false)
        }
      )
    } else {
      setFormData(prev => ({
        ...prev,
        latitude: "28.6139",
        longitude: "77.2090",
      }))
      setIsLocating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const authority = getAuthority(formData.road_type)
    console.log("Report submitted:", { ...formData, authority, photo: photo?.name })
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canProceedToLocation = formData.title && formData.issue_type && formData.road_type
  const canProceedToReview = formData.latitude && formData.longitude

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4 relative">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative z-10 max-w-lg"
        >
          {/* Success animation */}
          <motion.div className="relative inline-block mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <CheckmarkDoodle className="w-32 h-32 text-green-500 mx-auto" />
              <SparklesDoodle className="absolute inset-0 w-32 h-32 text-primary" />
            </motion.div>
            
            {/* Confetti particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5],
                  top: '50%',
                  left: '50%',
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 30 * Math.PI / 180) * 80,
                  y: Math.sin(i * 30 * Math.PI / 180) * 80,
                }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold mb-2">Report Submitted!</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <PartyPopper className="w-5 h-5 text-primary" />
              <span>Thank you for making roads safer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-6 bg-secondary/50 rounded-2xl border border-border"
          >
            <p className="text-sm text-muted-foreground mb-3">Your report has been routed to</p>
            <p className="text-xl font-bold text-primary">{getAuthority(formData.road_type)}</p>
            <p className="text-sm text-muted-foreground mt-3">
              Track progress on the public dashboard
            </p>
          </motion.div>

          <motion.div 
            className="flex gap-4 justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => {
              setIsSubmitted(false)
              setStep('details')
              setFormData({
                title: "",
                description: "",
                issue_type: "",
                road_type: "",
                severity: "medium",
                latitude: "",
                longitude: "",
              })
              setPhoto(null)
              setPhotoPreview(null)
            }}>
              Submit Another
            </Button>
          </motion.div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <MapPinDoodle className="w-6 h-6 text-primary" animate={false} />
              <span className="font-semibold">New Report</span>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step === 'details' ? 1 : step === 'location' ? 2 : 3} of 3</span>
            <span className="text-sm text-muted-foreground">{progress}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {['Details', 'Location', 'Review'].map((label, i) => (
              <span 
                key={label}
                className={`text-xs ${
                  (i === 0 && step === 'details') || 
                  (i === 1 && step === 'location') || 
                  (i === 2 && step === 'review')
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Background doodles - static */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-0 w-24 opacity-[0.06] text-foreground">
            <MapPinDoodle animate={false} />
          </div>
          <div className="absolute bottom-20 left-0 w-20 opacity-[0.05] text-foreground">
            <PotholeDoodle animate={false} />
          </div>
          <div className="absolute top-1/2 right-0 w-32 opacity-[0.04] text-foreground">
            <RoadDoodle animate={false} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10">
          <AnimatePresence mode="wait">
            {/* Step 1: Details */}
            {step === 'details' && (
              <motion.div
                key="details"
                variants={slideIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Card className="border border-border rounded-2xl shadow-sm hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Issue Details</CardTitle>
                        <CardDescription>What problem did you find?</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Title */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Large pothole on main road"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                        className="h-12 text-base focus:ring-2 focus:ring-primary transition-all"
                      />
                    </motion.div>

                    {/* Description */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Label htmlFor="description">Description (optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Add more details about the issue..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={3}
                        className="resize-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </motion.div>

                    {/* Issue Type & Road Type */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="issue_type">Issue Type *</Label>
                        <Select
                          value={formData.issue_type}
                          onValueChange={(value) => handleInputChange("issue_type", value)}
                          required
                        >
                          <SelectTrigger className="h-12 focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ISSUE_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="road_type">Road Type *</Label>
                        <Select
                          value={formData.road_type}
                          onValueChange={(value) => handleInputChange("road_type", value)}
                          required
                        >
                          <SelectTrigger className="h-12 focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Select road type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROAD_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>

                    {/* Severity */}
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Label>Severity Level *</Label>
                      <RadioGroup
                        value={formData.severity}
                        onValueChange={(value) => handleInputChange("severity", value)}
                        className="grid grid-cols-3 gap-3"
                      >
                        {SEVERITIES.map((sev) => (
                          <Label
                            key={sev.value}
                            htmlFor={sev.value}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 ${
                              formData.severity === sev.value 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border'
                            }`}
                          >
                            <RadioGroupItem value={sev.value} id={sev.value} className="sr-only" />
                            <span className={`w-4 h-4 rounded-full ${sev.color}`} />
                            <span className="font-medium text-sm">{sev.label}</span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </motion.div>

                    {/* Photo Upload */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label>Photo Evidence (optional)</Label>
                      <div
                        onDrop={handlePhotoDrop}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                          isDragging 
                            ? 'border-primary bg-primary/5 scale-[1.02]' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          title="Upload photo evidence"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {photoPreview ? (
                          <motion.div 
                            className="space-y-3"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="max-h-40 mx-auto rounded-lg shadow-md"
                            />
                            <p className="text-sm text-primary font-medium">{photo?.name}</p>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setPhoto(null)
                                setPhotoPreview(null)
                              }}
                            >
                              Remove
                            </Button>
                          </motion.div>
                        ) : (
                          <>
                            <CameraDoodle className="w-16 h-12 mx-auto text-muted-foreground mb-3" animate={false} />
                            <p className="text-muted-foreground">
                              <Camera className="w-4 h-4 inline mr-1" />
                              Drag & drop or click to upload
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PNG, JPG up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>

                    {/* Authority Preview */}
                    <AnimatePresence>
                      {formData.road_type && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-secondary rounded-xl p-4 border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <MapPinDoodle className="w-5 h-5 text-primary" animate={false} />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Will be routed to</p>
                              <p className="font-semibold text-primary">{getAuthority(formData.road_type)}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Next Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        type="button"
                        size="lg"
                        className="w-full h-14 text-lg group"
                        disabled={!canProceedToLocation}
                        onClick={() => setStep('location')}
                      >
                        Continue to Location
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 'location' && (
              <motion.div
                key="location"
                variants={slideIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Card className="border border-border rounded-2xl shadow-sm hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Where is the issue?</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* GPS Detection */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <div className="relative inline-block mb-6">
                        {isLocating ? (
                          <LocationPingDoodle className="w-24 h-24 text-primary" />
                        ) : formData.latitude ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckmarkDoodle className="w-24 h-24 text-green-500" />
                          </motion.div>
                        ) : (
                          <MapPinDoodle className="w-24 h-24 text-primary/50" />
                        )}
                      </div>

                      {formData.latitude && formData.longitude ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <p className="text-green-600 font-medium mb-2">Location detected!</p>
                          <p className="text-sm text-muted-foreground font-mono bg-secondary px-4 py-2 rounded-lg inline-block">
                            {formData.latitude}, {formData.longitude}
                          </p>
                        </motion.div>
                      ) : (
                        <p className="text-muted-foreground">
                          {isLocating ? "Detecting your location..." : "Click the button to detect your GPS location"}
                        </p>
                      )}
                    </motion.div>

                    <Button
                      type="button"
                      variant={formData.latitude ? "outline" : "default"}
                      size="lg"
                      onClick={detectLocation}
                      disabled={isLocating}
                      className="w-full h-14 text-lg"
                    >
                      {isLocating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Detecting...
                        </>
                      ) : formData.latitude ? (
                        <>
                          <MapPin className="w-5 h-5 mr-2" />
                          Re-detect Location
                        </>
                      ) : (
                        <>
                          <MapPin className="w-5 h-5 mr-2" />
                          Detect My Location
                        </>
                      )}
                    </Button>

                    {/* Manual entry */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or enter manually</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          placeholder="e.g., 28.6139"
                          value={formData.latitude}
                          onChange={(e) => handleInputChange("latitude", e.target.value)}
                          className="h-12 font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          placeholder="e.g., 77.2090"
                          value={formData.longitude}
                          onChange={(e) => handleInputChange("longitude", e.target.value)}
                          className="h-12 font-mono"
                        />
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1 h-14"
                        onClick={() => setStep('details')}
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        className="flex-1 h-14 group"
                        disabled={!canProceedToReview}
                        onClick={() => setStep('review')}
                      >
                        Review
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 'review' && (
              <motion.div
                key="review"
                variants={slideIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Card className="border border-border rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Review & Submit</CardTitle>
                        <CardDescription>Confirm your report details</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Title</span>
                          <span className="font-medium text-right max-w-[60%]">{formData.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Issue Type</span>
                          <span className="font-medium capitalize">{formData.issue_type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Road Type</span>
                          <span className="font-medium">{ROAD_TYPES.find(r => r.value === formData.road_type)?.label}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Severity</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            formData.severity === 'high' ? 'bg-red-100 text-red-700' :
                            formData.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-mono text-sm">{formData.latitude}, {formData.longitude}</span>
                        </div>
                        {formData.description && (
                          <div className="pt-3 border-t border-border">
                            <span className="text-muted-foreground text-sm block mb-1">Description</span>
                            <p className="text-sm">{formData.description}</p>
                          </div>
                        )}
                      </div>

                      {photoPreview && (
                        <div className="bg-secondary/50 rounded-xl p-4">
                          <span className="text-muted-foreground text-sm block mb-2">Photo</span>
                          <img src={photoPreview} alt="Evidence" className="rounded-lg max-h-32 mx-auto" />
                        </div>
                      )}

                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <MapPinDoodle className="w-8 h-8 text-primary" animate={false} />
                          <div>
                            <p className="text-sm text-muted-foreground">Routing to</p>
                            <p className="font-bold text-primary">{getAuthority(formData.road_type)}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1 h-14"
                        onClick={() => setStep('location')}
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 h-14 text-lg group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 mr-2" />
                            Submit Report
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </main>
  )
}
