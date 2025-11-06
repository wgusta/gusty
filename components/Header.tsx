'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2 md:gap-4 px-4">
      {/* Logo SVG */}
      <div className="w-16 h-16 md:w-24 md:h-24">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <title>Sihl Icon Valley Logo</title>
          <rect width="100" height="100" fill="#F5F3E8" />
          <defs>
            <clipPath id="circleView">
              <circle cx="50" cy="50" r="45" />
            </clipPath>
          </defs>
          <g clipPath="url(#circleView)">
            <rect x="0" y="0" width="100" height="100" fill="#D9366B" />
            <circle cx="50" cy="48" r="14" fill="#E62F2D" />
            <path d="M -10 100 L 30 40 L 45 55 L 60 42 L 110 100 Z" fill="#2A7C82" />
            <path d="M 30 40 L 25 45 L 35 46 Z" fill="#FFFFFF" />
            <path d="M 60 42 L 55 48 L 65 48 Z" fill="#FFFFFF" />
            <path d="M 50 62 C 45 75, 55 85, 50 95" fill="none" stroke="#F5F3E8" strokeWidth="7" />
          </g>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1A1A1A" strokeWidth="3" />
        </svg>
      </div>

      {/* Stylized Name */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          <span className="text-brand-white">sihl</span>
          <span className="text-sun-red">icon</span>
          <span className="text-teal">valley</span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base mt-1 md:mt-2 text-brand-black font-terminal px-2">
          Designer & Writer I AI Engineer / AI Integrator
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 mt-2">
        <Link
          href="https://x.com/GueneyUsta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-black hover:text-sun-red transition-colors"
          aria-label="X (Twitter)"
          data-interactive
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </Link>
        <Link
          href="https://github.com/wgusta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-black hover:text-teal transition-colors"
          aria-label="GitHub"
          data-interactive
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

