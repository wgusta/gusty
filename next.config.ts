import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: Next.js may show a warning about multiple lockfiles because there's
  // a package-lock.json in the parent directory (/Users/gusta/). This is
  // a separate project and the warning is harmless - the build works correctly.
  // The project root is correctly identified as /Users/gusta/Projects/gusty
};

export default nextConfig;
