/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-accordion'],
  },
}

export default nextConfig
