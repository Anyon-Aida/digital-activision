import { image } from "framer-motion/client";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  image: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return [{ source: '/works/:slug', destination: '/projects/:slug/index.html' }];
  }
};
module.exports = nextConfig;

/** 
 * 
   rm -rf .next .turbo out
   npm run build
   npm run build && npx next export
   https://www.linkedin.com/company/digital-activision
   https://www.instagram.com/digital_activision/
*/
