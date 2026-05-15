"use client"

import { useState, useEffect, useRef } from 'react'

export function useCounter(end: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number
    let timeout: ReturnType<typeof setTimeout>

    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    if (delay > 0) {
      timeout = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [hasStarted, end, duration, delay])

  return { count, ref }
}
