"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

// Hand-drawn SVG road path doodle
function RoadDoodle() {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-5 text-primary/30"
    >
      {/* Road outline — slightly wobbly hand-drawn feel */}
      <path
        d="M2 12 Q8 10 16 12 Q24 14 32 12 Q40 10 48 12 Q56 14 64 12 Q72 10 80 12 Q88 14 96 12 Q104 10 112 12 Q120 14 128 12 Q136 10 144 12 Q152 14 160 12 Q168 10 176 12 Q184 14 192 12 Q196 11 198 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-40"
      />
      {/* Road center dashes */}
      <path
        d="M2 12 L14 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="12 10"
        className="opacity-60"
      />
    </svg>
  )
}

// Hand-drawn map pin SVG
function MapPinSVG() {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-16 drop-shadow-sm"
    >
      {/* Pin body - slightly hand-drawn wobble */}
      <path
        d="M32 4 C16 4 6 14 6 28 C6 44 18 56 32 72 C46 56 58 44 58 28 C58 14 48 4 32 4 Z"
        fill="#4F46E5"
        stroke="#3730A3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="32" cy="28" r="10" fill="white" opacity="0.9" />
      {/* Inner dot */}
      <circle cx="32" cy="28" r="5" fill="#4F46E5" />
      {/* Sketch texture lines */}
      <path
        d="M22 18 Q28 15 36 18"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

// Floating pothole doodle
function PotholeFloat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="30" cy="20" rx="24" ry="14" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="30" cy="20" rx="16" ry="9" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M14 20 Q18 16 22 20 Q26 24 30 20" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

// Floating cone doodle
function ConeFloat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="20,4 4,50 36,50" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <line x1="8" y1="38" x2="32" y2="38" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="12" y1="28" x2="28" y2="28" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <rect x="2" y="50" width="36" height="6" rx="2" stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  )
}

// Floating car doodle
function CarFloat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 28 L14 16 Q18 10 26 10 L54 10 Q62 10 66 16 L72 28 L74 32 L74 38 L6 38 L6 32 Z"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="18" y="13" width="14" height="12" rx="2" stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.6" />
      <rect x="36" y="13" width="14" height="12" rx="2" stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="20" cy="38" r="7" stroke="#4F46E5" strokeWidth="2" fill="none" />
      <circle cx="60" cy="38" r="7" stroke="#4F46E5" strokeWidth="2" fill="none" />
      <circle cx="20" cy="38" r="3" stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="60" cy="38" r="3" stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  )
}

// Animated loading dots
function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 mt-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary/50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

interface LoadingScreenProps {
  isVisible: boolean
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isVisible) {
      setProgress(0)
      // Simulate realistic loading progress
      const t1 = setTimeout(() => setProgress(20), 50)
      const t2 = setTimeout(() => setProgress(45), 200)
      const t3 = setTimeout(() => setProgress(65), 400)
      const t4 = setTimeout(() => setProgress(80), 700)
      const t5 = setTimeout(() => setProgress(92), 1000)
      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
        clearTimeout(t4); clearTimeout(t5)
      }
    } else {
      setProgress(100)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center [background:radial-gradient(ellipse_at_20%_30%,rgba(79,70,229,0.04)_0%,transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(79,70,229,0.03)_0%,transparent_50%),#fafaf8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          transition={{ duration: 0.15 }}
        >
          {/* Floating background doodles */}
          <motion.div
            className="absolute top-[15%] left-[10%] opacity-[0.12]"
            animate={{
              y: [0, -10, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <PotholeFloat className="w-20 h-14" />
          </motion.div>

          <motion.div
            className="absolute top-[20%] right-[12%] opacity-[0.1]"
            animate={{
              y: [0, -8, 3, 0],
              rotate: [2, -1, 2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <ConeFloat className="w-12 h-16" />
          </motion.div>

          <motion.div
            className="absolute bottom-[20%] left-[8%] opacity-[0.1]"
            animate={{
              y: [0, 6, 0],
              x: [0, 4, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <CarFloat className="w-24 h-14" />
          </motion.div>

          <motion.div
            className="absolute bottom-[30%] right-[8%] opacity-[0.08]"
            animate={{
              y: [0, -6, 0],
              rotate: [-1, 3, -1],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <PotholeFloat className="w-16 h-10" />
          </motion.div>

          {/* Center content */}
          <div className="flex flex-col items-center gap-5 relative z-10">
            {/* Bouncing map pin */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MapPinSVG />
            </motion.div>

            {/* Road doodle beneath pin */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <RoadDoodle />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-2xl font-bold tracking-tight text-[#1e1b4b] font-['Space_Grotesk',sans-serif]">
                Road<span className="text-[#4F46E5]">Watch</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6B7280] font-['Space_Grotesk',sans-serif]">
                  Loading
                </span>
                <LoadingDots />
              </div>
            </motion.div>
          </div>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary/10 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ originX: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Subtle paper texture lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] [background-image:repeating-linear-gradient(0deg,transparent,transparent_24px,#4F46E5_24px,#4F46E5_25px)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
