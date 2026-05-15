"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { useRouter, usePathname } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

interface PageTransitionContextType {
  navigateTo: (href: string) => void
  prefetch: (href: string) => void
  isLoading: boolean
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateTo: () => {},
  prefetch: () => {},
  isLoading: false,
})

export function usePageTransition() {
  return useContext(PageTransitionContext)
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  // Eagerly prefetch all app routes on mount so they are pre-compiled
  useEffect(() => {
    const routes = ["/", "/dashboard", "/authority", "/report"]
    routes.forEach((route) => {
      if (route !== pathname) router.prefetch(route)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Hide loader once the new page is rendered (pathname changes)
  useEffect(() => {
    setIsLoading(false)
  }, [pathname])


  // Safety net — always clear loading after max 4 seconds
  useEffect(() => {
    if (!isLoading) return
    const timeout = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timeout)
  }, [isLoading])

  const navigateTo = useCallback(
    (href: string) => {
      if (href === pathname || href.startsWith("#")) {
        router.push(href)
        return
      }
      setIsLoading(true)
      // Navigate immediately — no startTransition so there's no deferral delay
      router.push(href)
    },
    [router, pathname]
  )

  const prefetch = useCallback(
    (href: string) => {
      if (!href.startsWith("#")) {
        router.prefetch(href)
      }
    },
    [router]
  )

  return (
    <PageTransitionContext.Provider value={{ navigateTo, prefetch, isLoading }}>
      <LoadingScreen isVisible={isLoading} />
      {children}
    </PageTransitionContext.Provider>
  )
}

