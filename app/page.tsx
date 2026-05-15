"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TransitionLink as Link } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { 
  MapPinDoodle, 
  RoadDoodle, 
  CloudDoodle, 
  TreeDoodle, 
  UnderlineDoodle, 
  ArrowDoodle,
  PotholeDoodle,
  CarDoodle,
  WarningSignDoodle,
  ToolsDoodle,
  CheckmarkDoodle,
  TrafficSignalDoodle,
  FloatingDoodlesBg,
  CameraDoodle,
  WaveDivider,
  ConeDoodle,
  CrackDoodle,
  BridgeDoodle,
  CompassDoodle,
  NotepadDoodle,
  SunDoodle,
  ScribbleCircle,
  BicycleDoodle
} from "@/components/doodles"
import { useCounter } from "@/hooks/use-counter"
import { ChevronRight, ArrowRight, Sparkles, Shield, Clock, Users } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const processSteps = [
  { 
    title: "Citizen Reports", 
    description: "Snap a photo, drop a pin, describe the issue",
    icon: CameraDoodle,
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  { 
    title: "AI Classifies", 
    description: "Smart detection of severity & issue type",
    icon: WarningSignDoodle,
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  { 
    title: "Smart Routing", 
    description: "Automatically sent to the right authority",
    icon: MapPinDoodle,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200"
  },
  { 
    title: "Authority Acts", 
    description: "Issue assigned, tracked & resolved",
    icon: ToolsDoodle,
    color: "bg-orange-50 text-orange-600 border-orange-200"
  },
  { 
    title: "Public Tracker", 
    description: "Real-time status visible to everyone",
    icon: CheckmarkDoodle,
    color: "bg-green-50 text-green-600 border-green-200"
  },
]

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Smart classification automatically routes issues to the right authority"
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "GPS-verified locations ensure accurate reporting"
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Track your report status from submission to resolution"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands making Indian roads safer every day"
  }
]

function StatCounter({ value, suffix, label, delay = 0 }: { value: number; suffix: string; label: string; delay?: number }) {
  const { count, ref } = useCounter(value, 2000, delay)
  
  return (
    <motion.div 
      ref={ref}
      className="text-center p-6 rounded-2xl bg-card border border-border hover-lift"
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="text-4xl md:text-5xl font-bold gradient-text"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: delay / 1000 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <div className="text-muted-foreground mt-2 text-sm">{label}</div>
    </motion.div>
  )
}

function FloatingIcon({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPinDoodle className="w-8 h-8 text-primary" animate={false} />
              </motion.div>
              <span className="text-xl font-bold group-hover:gradient-text transition-all">RoadWatch</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className="text-muted-foreground hover:text-foreground transition-colors relative group hidden sm:block"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link 
                href="/authority" 
                className="text-muted-foreground hover:text-foreground transition-colors relative group hidden sm:block"
              >
                Authority
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Button asChild className="animate-glow">
                <Link href="/report" className="flex items-center gap-2">
                  Report Issue
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 paper-texture overflow-hidden">
        <FloatingDoodlesBg />

        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance">
              Road<span className="gradient-text">Watch</span>
            </h1>
            <UnderlineDoodle className="w-full h-6 text-primary mt-2" />
            
            {/* Floating doodles around title */}
            <FloatingIcon 
              className="absolute -top-8 -left-12 w-16 h-16 text-primary/30 hidden md:block"
              delay={0.5}
            >
              <PotholeDoodle animate={false} />
            </FloatingIcon>
            <FloatingIcon 
              className="absolute -top-4 -right-16 w-20 h-20 text-primary/20 hidden md:block"
              delay={0.7}
            >
              <CarDoodle animate={false} />
            </FloatingIcon>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
          >
            Structured civic complaint routing for India&apos;s <span className="text-foreground font-medium">63.73 lakh km</span> road network
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-7 hover:scale-105 transition-all shadow-lg shadow-primary/25 group"
            >
              <Link href="/report" className="flex items-center gap-2">
                Report an Issue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-7 hover:scale-105 transition-all group"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <MapPinDoodle className="w-5 h-5 text-primary" animate={false} />
                View Live Map
              </Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <div className="mt-16">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 mx-auto flex justify-center animate-bounce">
              <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee doodle strip */}
      <div className="overflow-hidden border-y border-border/50 bg-secondary/20 py-4">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].map((_, gi) => (
            <div key={gi} className="flex items-center gap-12 shrink-0">
              {[
                { doodle: <PotholeDoodle className="w-10 h-7" animate={false} />, label: "Potholes" },
                { doodle: <CarDoodle className="w-14 h-8" animate={false} />, label: "Traffic" },
                { doodle: <ConeDoodle className="w-6 h-8" animate={false} />, label: "Hazards" },
                { doodle: <BridgeDoodle className="w-16 h-8" animate={false} />, label: "Infrastructure" },
                { doodle: <CompassDoodle className="w-8 h-8" animate={false} />, label: "Navigation" },
                { doodle: <BicycleDoodle className="w-14 h-9" animate={false} />, label: "Cycle Tracks" },
                { doodle: <TreeDoodle className="w-7 h-10" animate={false} />, label: "Greenery" },
                { doodle: <MapPinDoodle className="w-6 h-9" animate={false} />, label: "Locations" },
                { doodle: <CrackDoodle className="w-6 h-8" animate={false} />, label: "Road Cracks" },
                { doodle: <NotepadDoodle className="w-7 h-9" animate={false} />, label: "Reports" },
              ].map(({ doodle, label }, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground/50">
                  <div className="text-foreground/30">{doodle}</div>
                  <span className="text-xs font-medium tracking-wider uppercase">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <WaveDivider className="text-primary" />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 dotted-bg">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Why RoadWatch?</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A smarter way to report and track road issues across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card border border-border rounded-2xl p-6 hover-lift group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider className="text-primary" />

      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 lined-bg opacity-50" />
        {/* Side decorations */}
        <div className="absolute left-4 top-1/4 w-16 opacity-[0.07] text-foreground animate-sway hidden lg:block">
          <TrafficSignalDoodle animate={false} />
        </div>
        <div className="absolute right-6 top-1/3 w-14 opacity-[0.07] text-foreground animate-float hidden lg:block [animation-delay:1.5s]">
          <SunDoodle animate={false} />
        </div>
        <div className="absolute left-8 bottom-1/4 w-20 opacity-[0.06] text-foreground animate-drift hidden lg:block [animation-delay:0.8s]">
          <CloudDoodle animate={false} />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <RoadDoodle className="w-48 h-16 text-primary/50" />
            </motion.div>
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
              <ScribbleCircle className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] text-primary/20 pointer-events-none" />
            </div>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              From report to resolution in 5 simple steps
            </p>
          </motion.div>

          {/* Desktop Process Flow */}
          <div className="hidden lg:flex items-start justify-center gap-2">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <motion.div 
                  className={`bg-card border-2 ${step.color} rounded-2xl p-6 shadow-sm w-48 text-center group hover-lift cursor-default`}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="mx-auto mb-4 w-14 h-14"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-full h-full" animate={false} />
                  </motion.div>
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-3 text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{step.description}</p>
                </motion.div>
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <ArrowDoodle className="w-14 h-10 text-primary mx-1" animate={false} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Process Flow */}
          <div className="lg:hidden space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className={`bg-card border-2 ${step.color} rounded-2xl p-5 flex items-center gap-4`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 shrink-0">
                  <step.icon className="w-full h-full" animate={false} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <StatCounter value={63} suffix=".73L km" label="Roads in India" delay={0} />
            <StatCounter value={4} suffix=" Types" label="Authority Bodies" delay={200} />
            <StatCounter value={5} suffix=" Min" label="Average Submit Time" delay={400} />
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Report in <span className="gradient-text">Seconds</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Our streamlined reporting form makes it easy to document road issues with GPS-verified locations and photo evidence.
              </p>
              <ul className="space-y-4">
                {[
                  "Automatic GPS location detection",
                  "Photo upload with drag & drop",
                  "Smart authority routing",
                  "Real-time status tracking"
                ].map((item, i) => (
                  <li key={item}>
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckmarkDoodle className="w-6 h-6 text-green-500 shrink-0" animate={false} />
                      <span>{item}</span>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8">
                <Link href="/report">
                  Try It Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Phone mockup with animated form */}
              <div className="relative mx-auto w-72 h-[500px] bg-card border-4 border-foreground/10 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-2xl" />
                <div className="p-4 pt-10 space-y-4">
                  <div className="h-12 bg-secondary rounded-xl animate-pulse" />
                  <div className="h-24 bg-secondary rounded-xl animate-pulse [animation-delay:0.2s]" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 bg-secondary rounded-xl animate-pulse [animation-delay:0.3s]" />
                    <div className="h-12 bg-secondary rounded-xl animate-pulse [animation-delay:0.4s]" />
                  </div>
                  <div className="h-32 bg-secondary/50 border-2 border-dashed border-border rounded-xl flex items-center justify-center">
                    <CameraDoodle className="w-12 h-12 text-muted-foreground" animate={false} />
                  </div>
                  <div className="h-12 bg-primary rounded-xl" />
                </div>
              </div>
              
              {/* Floating elements - animated */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20"
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPinDoodle className="w-full h-full text-primary/40" animate={false} />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-6 w-16 h-16"
                animate={{ y: [0, 6, 0], rotate: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <PotholeDoodle className="w-full h-full text-orange-400/40" animate={false} />
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-10 w-12 h-12"
                animate={{ x: [0, 5, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <CompassDoodle className="w-full h-full text-primary/30" animate={false} />
              </motion.div>
              <motion.div
                className="absolute -top-2 -left-8 w-14 h-14"
                animate={{ y: [0, -5, 3, 0], rotate: [-2, 3, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <SunDoodle className="w-full h-full text-yellow-400/30" animate={false} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider className="text-primary" />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Left side doodles */}
        <div className="absolute top-8 left-[4%] w-16 opacity-[0.12] text-primary-foreground animate-float">
          <ConeDoodle animate={false} />
        </div>
        <div className="absolute bottom-8 left-[8%] w-20 opacity-[0.08] text-primary-foreground animate-wobble [animation-delay:0.5s]">
          <BicycleDoodle animate={false} />
        </div>
        <div className="absolute top-[45%] left-[2%] w-14 opacity-[0.1] text-primary-foreground animate-sway [animation-delay:1s]">
          <NotepadDoodle animate={false} />
        </div>
        {/* Right side doodles */}
        <div className="absolute bottom-12 right-[4%] w-14 opacity-[0.1] text-primary-foreground animate-wobble">
          <CrackDoodle animate={false} />
        </div>
        <div className="absolute top-[30%] right-[12%] w-20 opacity-[0.08] text-primary-foreground animate-float [animation-delay:1.2s]">
          <PotholeDoodle animate={false} />
        </div>
        <div className="absolute top-6 right-[6%] w-16 opacity-[0.1] text-primary-foreground animate-drift [animation-delay:0.8s]">
          <CompassDoodle animate={false} />
        </div>
        {/* Background scribble rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          <ScribbleCircle className="w-[600px] h-[600px] text-primary-foreground" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <TrafficSignalDoodle className="w-16 h-24 text-primary-foreground/80" animate={false} />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Make Roads Safer, <br />One Report at a Time
          </motion.h2>
          <motion.p
            className="text-lg opacity-90 mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Your report can save lives. Join thousands of citizens making Indian roads better, together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              asChild 
              size="lg" 
              variant="secondary" 
              className="text-lg px-10 py-7 shadow-xl hover:scale-105 transition-transform"
            >
              <Link href="/report" className="flex items-center gap-2">
                Start Reporting
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <MapPinDoodle className="w-8 h-8 text-primary" animate={false} />
              <div>
                <span className="font-bold text-lg">RoadWatch</span>
                <p className="text-xs text-muted-foreground">Making roads safer, together</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Road Safety Hackathon 2026 · IIT Madras
            </p>
            <div className="flex items-center gap-8">
              {[
                { href: "/report", label: "Report" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/authority", label: "Authority" },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
