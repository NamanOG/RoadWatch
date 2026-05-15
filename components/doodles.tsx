"use client"

import { motion, Variants } from "framer-motion"

// Draw animation for SVG paths
const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.5, ease: "easeInOut" },
      opacity: { delay, duration: 0.3 }
    }
  })
}

export function MapPinDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Circle = animate ? motion.circle : "circle"
  
  return (
    <Wrapper
      viewBox="0 0 80 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${animate ? '' : 'animate-float'} ${className}`}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Path 
        d="M40 10 C20 10 10 25 10 40 C10 65 40 100 40 100 C40 100 70 65 70 40 C70 25 60 10 40 10" 
        variants={animate ? drawVariants : undefined}
        custom={0}
      />
      <Circle cx="40" cy="40" r="12" variants={animate ? drawVariants : undefined} custom={0.5} />
      {/* Little x marks */}
      <Path d="M36 36 L44 44 M44 36 L36 44" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.8} />
    </Wrapper>
  )
}

export function RoadDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  
  return (
    <Wrapper
      viewBox="0 0 400 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Main road curves */}
      <Path d="M0 90 Q50 70 100 85 Q150 100 200 90 Q250 80 300 95 Q350 110 400 90" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M0 140 Q50 120 100 135 Q150 150 200 140 Q250 130 300 145 Q350 160 400 140" variants={animate ? drawVariants : undefined} custom={0.2} />
      {/* Road lane dashes */}
      <Path d="M30 115 L60 112" strokeDasharray="0" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Path d="M120 115 L150 118" strokeDasharray="0" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Path d="M210 113 L240 115" strokeDasharray="0" variants={animate ? drawVariants : undefined} custom={0.6} />
      <Path d="M300 118 L330 115" strokeDasharray="0" variants={animate ? drawVariants : undefined} custom={0.7} />
      {/* Little potholes */}
      <Path d="M80 125 Q90 130 100 125" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.9} />
      <Path d="M260 132 Q270 138 280 132" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={1} />
    </Wrapper>
  )
}

export function PotholeDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Ellipse = animate ? motion.ellipse : "ellipse"
  
  return (
    <Wrapper
      viewBox="0 0 100 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${animate ? '' : 'animate-wobble'} ${className}`}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Ellipse cx="50" cy="35" rx="40" ry="22" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M20 40 Q35 52 50 45 Q65 38 80 35" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.3} />
      {/* Crack lines */}
      <Path d="M25 30 L32 38" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Path d="M50 25 L50 32" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.6} />
      <Path d="M75 30 L68 38" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.7} />
      {/* Debris particles */}
      <Path d="M35 55 L37 58" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.8} />
      <Path d="M55 58 L58 62" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.85} />
      <Path d="M70 56 L72 60" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.9} />
    </Wrapper>
  )
}

export function CloudDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  
  return (
    <Wrapper
      viewBox="0 0 140 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${animate ? '' : 'animate-float'} ${className}`}
      style={!animate ? { animationDelay: '0.5s' } : {}}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Path d="M30 45 Q10 45 15 32 Q8 22 25 20 Q32 8 50 14 Q62 4 80 14 Q95 6 105 22 Q125 20 120 38 Q130 48 110 52 L35 52 Q15 55 30 45" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Cloud detail lines */}
      <Path d="M45 30 Q55 26 65 30" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Path d="M75 35 Q85 32 95 36" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.7} />
    </Wrapper>
  )
}

export function TreeDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  
  return (
    <Wrapper
      viewBox="0 0 60 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Trunk */}
      <Path d="M30 100 L30 55" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M26 100 L26 70" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.1} />
      {/* Foliage */}
      <Path d="M30 60 Q8 60 15 42 Q2 32 18 28 Q8 18 22 14 Q15 5 30 5 Q45 5 38 14 Q52 18 42 28 Q58 32 45 42 Q52 60 30 60" variants={animate ? drawVariants : undefined} custom={0.3} />
      {/* Little branches */}
      <Path d="M24 48 L18 52" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.7} />
      <Path d="M36 45 L42 50" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.8} />
    </Wrapper>
  )
}

export function CarDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Circle = animate ? motion.circle : "circle"
  
  return (
    <Wrapper
      viewBox="0 0 140 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Car body */}
      <Path d="M15 45 L20 45 Q25 28 45 25 L95 25 Q110 28 115 45 L125 45" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M10 45 Q8 55 18 55 L32 55" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Path d="M88 55 L118 55 Q128 55 128 45" variants={animate ? drawVariants : undefined} custom={0.3} />
      {/* Wheels */}
      <Circle cx="38" cy="55" r="10" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Circle cx="38" cy="55" r="4" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Circle cx="102" cy="55" r="10" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Circle cx="102" cy="55" r="4" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.5} />
      {/* Windows */}
      <Path d="M50 25 L50 42" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.6} />
      <Path d="M78 25 L78 42" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.65} />
      {/* Headlight */}
      <Path d="M118 38 L122 38" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.7} />
      {/* Speed lines */}
      <Path d="M5 35 L-5 35" strokeWidth="1.5" strokeDasharray="3 2" variants={animate ? drawVariants : undefined} custom={0.8} />
      <Path d="M5 45 L-8 45" strokeWidth="1.5" strokeDasharray="3 2" variants={animate ? drawVariants : undefined} custom={0.85} />
      <Path d="M5 55 L-5 55" strokeWidth="1.5" strokeDasharray="3 2" variants={animate ? drawVariants : undefined} custom={0.9} />
    </Wrapper>
  )
}

export function TrafficSignalDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Rect = animate ? motion.rect : "rect"
  const Circle = animate ? motion.circle : "circle"
  const Line = animate ? motion.line : "line"
  
  return (
    <Wrapper
      viewBox="0 0 50 110"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Signal box */}
      <Rect x="8" y="8" width="34" height="65" rx="5" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Lights */}
      <Circle cx="25" cy="22" r="9" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Circle cx="25" cy="42" r="9" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Circle cx="25" cy="62" r="9" variants={animate ? drawVariants : undefined} custom={0.4} />
      {/* Light shine lines */}
      <Path d="M16 22 L12 22" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Path d="M38 22 L42 22" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.55} />
      {/* Pole */}
      <Line x1="25" y1="73" x2="25" y2="105" variants={animate ? drawVariants : undefined} custom={0.6} />
      <Path d="M18 105 L32 105" variants={animate ? drawVariants : undefined} custom={0.7} />
    </Wrapper>
  )
}

export function UnderlineDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  
  return (
    <Wrapper
      viewBox="0 0 200 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Path 
        d="M5 12 Q30 6 60 14 Q90 22 120 10 Q150 -2 180 14 Q190 18 195 12" 
        variants={animate ? drawVariants : undefined} 
        custom={0}
      />
    </Wrapper>
  )
}

export function ArrowDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  
  return (
    <Wrapper
      viewBox="0 0 70 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Path d="M5 17 Q20 12 35 17 Q50 22 60 17" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M52 10 L62 17 L52 24" variants={animate ? drawVariants : undefined} custom={0.3} />
    </Wrapper>
  )
}

export function CameraDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Rect = animate ? motion.rect : "rect"
  const Circle = animate ? motion.circle : "circle"
  
  return (
    <Wrapper
      viewBox="0 0 90 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${animate ? '' : 'animate-float'} ${className}`}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Rect x="5" y="18" width="80" height="48" rx="6" variants={animate ? drawVariants : undefined} custom={0} />
      <Circle cx="45" cy="42" r="18" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Circle cx="45" cy="42" r="10" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Circle cx="45" cy="42" r="4" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.4} />
      {/* Flash */}
      <Rect x="28" y="5" width="34" height="15" rx="3" variants={animate ? drawVariants : undefined} custom={0.5} />
      {/* Flash button */}
      <Circle cx="75" cy="26" r="5" variants={animate ? drawVariants : undefined} custom={0.6} />
      {/* Shine */}
      <Path d="M38 36 Q42 32 48 36" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.7} />
    </Wrapper>
  )
}

export function WarningSignDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Line = animate ? motion.line : "line"
  const Circle = animate ? motion.circle : "circle"
  
  return (
    <Wrapper
      viewBox="0 0 80 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Triangle */}
      <Path d="M40 10 L75 70 L5 70 Z" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Exclamation */}
      <Line x1="40" y1="30" x2="40" y2="50" strokeWidth="4" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Circle cx="40" cy="60" r="3" fill="currentColor" variants={animate ? drawVariants : undefined} custom={0.5} />
      {/* Pole */}
      <Line x1="40" y1="70" x2="40" y2="90" variants={animate ? drawVariants : undefined} custom={0.6} />
    </Wrapper>
  )
}

export function ToolsDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  
  return (
    <Wrapper
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Wrench */}
      <Path d="M15 65 L35 45 Q40 40 45 45 L65 25 Q70 20 65 15 Q55 10 50 20 L30 40 Q25 45 30 50 L10 70 Q5 75 15 65" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Screwdriver */}
      <Path d="M55 75 L65 65 L70 35 L60 25 L50 30 L45 70 L55 75" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Path d="M60 25 L65 10" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.5} />
    </Wrapper>
  )
}

export function CheckmarkDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Circle = animate ? motion.circle : "circle"
  
  return (
    <Wrapper
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Circle cx="40" cy="40" r="35" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M22 42 L34 54 L58 28" strokeWidth="4" variants={animate ? drawVariants : undefined} custom={0.3} />
    </Wrapper>
  )
}

export function LocationPingDoodle({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <motion.circle 
        cx="30" 
        cy="30" 
        r="8" 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.circle 
        cx="30" 
        cy="30" 
        r="20"
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle 
        cx="30" 
        cy="30" 
        r="20"
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      />
    </motion.svg>
  )
}

export function SparklesDoodle({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      {[
        { x: 20, y: 20, delay: 0 },
        { x: 80, y: 25, delay: 0.2 },
        { x: 50, y: 50, delay: 0.4 },
        { x: 15, y: 75, delay: 0.6 },
        { x: 85, y: 80, delay: 0.8 },
      ].map((spark, i) => (
        <motion.g key={i} transform={`translate(${spark.x}, ${spark.y})`}>
          <motion.path
            d="M0 -8 L0 8 M-8 0 L8 0 M-5 -5 L5 5 M5 -5 L-5 5"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 0], rotate: 180 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: spark.delay,
              ease: "easeInOut"
            }}
          />
        </motion.g>
      ))}
    </motion.svg>
  )
}

export function BicycleDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Circle = animate ? motion.circle : "circle"

  return (
    <Wrapper
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Circle cx="25" cy="55" r="18" variants={animate ? drawVariants : undefined} custom={0} />
      <Circle cx="95" cy="55" r="18" variants={animate ? drawVariants : undefined} custom={0.1} />
      <Circle cx="25" cy="55" r="3" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.15} />
      <Circle cx="95" cy="55" r="3" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.15} />
      <Path d="M25 55 L45 30 L65 55 L95 55" strokeWidth="2.5" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Path d="M45 30 L55 30 L65 55" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Path d="M55 30 L60 22" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Path d="M52 22 L68 22" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Path d="M38 30 L48 30" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.6} />
    </Wrapper>
  )
}

export function ConeDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"

  return (
    <Wrapper
      viewBox="0 0 60 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${animate ? '' : 'animate-wobble'} ${className}`}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Path d="M30 8 L12 65 L48 65 Z" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M7 65 L53 65 L55 72 L5 72 Z" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Path d="M22 35 L38 35" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Path d="M18 48 L42 48" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.5} />
    </Wrapper>
  )
}

export function CrackDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"

  return (
    <Wrapper
      viewBox="0 0 60 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Path d="M30 5 L25 20 L35 30 L22 42 L32 55 L28 70 L30 80" variants={animate ? drawVariants : undefined} custom={0} />
      <Path d="M25 20 L18 28" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Path d="M35 30 L42 35" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Path d="M22 42 L15 48" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Path d="M32 55 L40 58" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.6} />
    </Wrapper>
  )
}

export function BridgeDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"

  return (
    <Wrapper
      viewBox="0 0 160 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Road base */}
      <Path d="M5 65 L155 65" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Left arch */}
      <Path d="M30 65 Q30 30 70 25 Q110 20 130 65" variants={animate ? drawVariants : undefined} custom={0.2} />
      {/* Vertical supports */}
      <Path d="M50 65 L50 40" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Path d="M80 65 L80 27" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.45} />
      <Path d="M110 65 L110 38" strokeWidth="2" variants={animate ? drawVariants : undefined} custom={0.5} />
      {/* Cable detail */}
      <Path d="M30 65 Q55 42 70 25 Q90 35 110 38 Q125 40 130 65" strokeWidth="1.5" strokeDasharray="4 3" variants={animate ? drawVariants : undefined} custom={0.6} />
      {/* Water ripples below */}
      <Path d="M5 72 Q20 68 35 72 Q50 76 65 72" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.8} />
      <Path d="M95 74 Q110 70 125 74 Q140 78 155 74" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.9} />
    </Wrapper>
  )
}

export function CompassDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Circle = animate ? motion.circle : "circle"
  const Line = animate ? motion.line : "line"

  return (
    <Wrapper
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Circle cx="40" cy="40" r="34" variants={animate ? drawVariants : undefined} custom={0} />
      <Circle cx="40" cy="40" r="3" fill="currentColor" variants={animate ? drawVariants : undefined} custom={0.3} />
      {/* N S E W labels */}
      <Path d="M40 8 L40 14" strokeWidth="2.5" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Path d="M40 66 L40 72" strokeWidth="2.5" variants={animate ? drawVariants : undefined} custom={0.25} />
      <Path d="M8 40 L14 40" strokeWidth="2.5" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Path d="M66 40 L72 40" strokeWidth="2.5" variants={animate ? drawVariants : undefined} custom={0.35} />
      {/* Needle north */}
      <Path d="M40 40 L34 22 L40 16 L46 22 Z" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.5} />
      {/* Needle south */}
      <Path d="M40 40 L46 58 L40 64 L34 58 Z" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.6} />
      {/* Tick marks */}
      <Line x1="22" y1="22" x2="26" y2="26" strokeWidth="1" variants={animate ? drawVariants : undefined} custom={0.7} />
      <Line x1="58" y1="22" x2="54" y2="26" strokeWidth="1" variants={animate ? drawVariants : undefined} custom={0.75} />
      <Line x1="22" y1="58" x2="26" y2="54" strokeWidth="1" variants={animate ? drawVariants : undefined} custom={0.8} />
      <Line x1="58" y1="58" x2="54" y2="54" strokeWidth="1" variants={animate ? drawVariants : undefined} custom={0.85} />
    </Wrapper>
  )
}

export function NotepadDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Rect = animate ? motion.rect : "rect"
  const Line = animate ? motion.line : "line"

  return (
    <Wrapper
      viewBox="0 0 70 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Rect x="8" y="12" width="54" height="72" rx="3" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Spiral binding */}
      <Line x1="8" y1="5" x2="62" y2="5" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.1} />
      {/* Binding holes */}
      <Path d="M18 5 Q18 12 18 5" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.15} />
      <Path d="M35 5 Q35 12 35 5" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Path d="M52 5 Q52 12 52 5" strokeWidth="3" variants={animate ? drawVariants : undefined} custom={0.25} />
      {/* Writing lines */}
      <Line x1="18" y1="28" x2="52" y2="28" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Line x1="18" y1="40" x2="52" y2="40" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Line x1="18" y1="52" x2="52" y2="52" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Line x1="18" y1="64" x2="40" y2="64" variants={animate ? drawVariants : undefined} custom={0.6} />
      {/* Pencil */}
      <Path d="M48 68 L60 56 L65 61 L53 73 Z" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.7} />
      <Path d="M60 56 L63 53 L65 55 L62 58" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.8} />
      <Path d="M48 68 L50 73" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.85} />
    </Wrapper>
  )
}

export function SunDoodle({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const Wrapper = animate ? motion.svg : "svg"
  const Path = animate ? motion.path : "path"
  const Circle = animate ? motion.circle : "circle"
  const Line = animate ? motion.line : "line"

  return (
    <Wrapper
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={`${animate ? '' : 'animate-float'} ${className}`}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      <Circle cx="40" cy="40" r="14" variants={animate ? drawVariants : undefined} custom={0} />
      {/* Rays */}
      <Line x1="40" y1="8" x2="40" y2="18" variants={animate ? drawVariants : undefined} custom={0.2} />
      <Line x1="40" y1="62" x2="40" y2="72" variants={animate ? drawVariants : undefined} custom={0.25} />
      <Line x1="8" y1="40" x2="18" y2="40" variants={animate ? drawVariants : undefined} custom={0.3} />
      <Line x1="62" y1="40" x2="72" y2="40" variants={animate ? drawVariants : undefined} custom={0.35} />
      <Line x1="17" y1="17" x2="24" y2="24" variants={animate ? drawVariants : undefined} custom={0.4} />
      <Line x1="63" y1="17" x2="56" y2="24" variants={animate ? drawVariants : undefined} custom={0.45} />
      <Line x1="17" y1="63" x2="24" y2="56" variants={animate ? drawVariants : undefined} custom={0.5} />
      <Line x1="63" y1="63" x2="56" y2="56" variants={animate ? drawVariants : undefined} custom={0.55} />
      {/* Face details */}
      <Path d="M34 38 Q36 36 38 38" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.65} />
      <Path d="M42 38 Q44 36 46 38" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.7} />
      <Path d="M34 44 Q40 48 46 44" strokeWidth="1.5" variants={animate ? drawVariants : undefined} custom={0.75} />
    </Wrapper>
  )
}

export function ScribbleCircle({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <motion.path
        d="M60 10 C90 8 115 30 112 60 C109 90 88 112 60 110 C32 108 8 88 10 60 C12 32 30 12 60 10 C68 9 80 14 88 22"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}

export function FloatingDoodlesBg({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Top-left cluster */}
      <div className="absolute top-[4%] left-[4%] w-24 opacity-[0.07] text-foreground animate-float">
        <MapPinDoodle animate={false} />
      </div>
      <div className="absolute top-[8%] left-[14%] w-12 opacity-[0.05] text-foreground animate-wobble [animation-delay:0.6s]">
        <SunDoodle animate={false} />
      </div>

      {/* Top-right cluster */}
      <div className="absolute top-[10%] right-[6%] w-32 opacity-[0.05] text-foreground animate-float [animation-delay:1s]">
        <CloudDoodle animate={false} />
      </div>
      <div className="absolute top-[22%] right-[16%] w-14 opacity-[0.04] text-foreground animate-drift [animation-delay:0.3s]">
        <ConeDoodle animate={false} />
      </div>

      {/* Mid-left */}
      <div className="absolute top-[32%] left-[2%] w-20 opacity-[0.05] text-foreground animate-float [animation-delay:1.5s]">
        <CarDoodle animate={false} />
      </div>
      <div className="absolute top-[42%] left-[18%] w-10 opacity-[0.04] text-foreground animate-sway [animation-delay:0.8s]">
        <CrackDoodle animate={false} />
      </div>

      {/* Center scattered */}
      <div className="absolute top-[20%] left-[42%] w-10 opacity-[0.03] text-foreground animate-wobble [animation-delay:2s]">
        <ConeDoodle animate={false} />
      </div>
      <div className="absolute top-[50%] left-[50%] w-14 opacity-[0.03] text-foreground animate-float [animation-delay:1.2s]">
        <CompassDoodle animate={false} />
      </div>

      {/* Mid-right */}
      <div className="absolute top-[38%] right-[4%] w-16 opacity-[0.06] text-foreground animate-wobble">
        <PotholeDoodle animate={false} />
      </div>
      <div className="absolute top-[55%] right-[18%] w-12 opacity-[0.04] text-foreground animate-drift [animation-delay:1.8s]">
        <NotepadDoodle animate={false} />
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-[22%] left-[8%] w-14 opacity-[0.05] text-foreground animate-float [animation-delay:0.8s]">
        <TreeDoodle animate={false} />
      </div>
      <div className="absolute bottom-[10%] left-[20%] w-20 opacity-[0.04] text-foreground animate-sway [animation-delay:1.4s]">
        <BicycleDoodle animate={false} />
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-[8%] right-[10%] w-28 opacity-[0.04] text-foreground">
        <RoadDoodle animate={false} />
      </div>
      <div className="absolute bottom-[28%] right-[30%] w-10 opacity-[0.03] text-foreground animate-float [animation-delay:0.5s]">
        <BicycleDoodle animate={false} />
      </div>
    </div>
  )
}


export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 1200 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 20 Q100 5 200 20 Q300 35 400 20 Q500 5 600 20 Q700 35 800 20 Q900 5 1000 20 Q1100 35 1200 20"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}
