"use client"

import { usePageTransition } from "@/components/page-transition-provider"
import { type AnchorHTMLAttributes, forwardRef } from "react"

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

/**
 * Drop-in replacement for <Link> that:
 * 1. Prefetches the destination page on hover/focus (eliminates cold-compile delay)
 * 2. Shows the branded loading screen on click
 */
const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, onClick, onMouseEnter, onFocus, className, ...props }, ref) => {
    const { navigateTo, prefetch } = usePageTransition()

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      prefetch(href)
      if (onMouseEnter) onMouseEnter(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
      prefetch(href)
      if (onFocus) onFocus(e)
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow Ctrl/Cmd+click to open in new tab normally
      if (e.ctrlKey || e.metaKey || e.shiftKey) return
      e.preventDefault()
      if (onClick) onClick(e)
      navigateTo(href)
    }

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  }
)

TransitionLink.displayName = "TransitionLink"

export { TransitionLink }
