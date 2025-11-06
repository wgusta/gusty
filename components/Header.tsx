'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [showCorrection, setShowCorrection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCorrection(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-start gap-4 md:gap-6 lg:gap-8 bg-off-white/95 backdrop-blur-sm px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 w-full">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sun-red focus:text-brand-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sun-red"
      >
        Skip to main content
      </a>
      
      {/* Content */}
      <div className="flex flex-col flex-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-sun-red">
          sihl icon valley
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-1 md:mt-2 text-brand-black font-stylish">
          Güney Usta
        </p>
        <p className="text-xs sm:text-sm md:text-base mt-0.5 md:mt-1 text-brand-black font-terminal">
          Words x Design x AI Integration
        </p>
        <p className="text-sm sm:text-base md:text-lg mt-3 md:mt-4 lg:mt-5 max-w-2xl text-brand-black font-terminal leading-relaxed">
          Building things that last. Close to the Sihl, occasionally iconic,{' '}
          <span className="relative inline-block">
            {!showCorrection ? (
              <span>allveys</span>
            ) : (
              <>
                <span className="line-through decoration-2 decoration-brand-black/60 animate-strikethrough">allveys</span>
                <span className="text-sun-red ml-1 animate-fadeIn">always</span>
              </>
            )}
          </span>{' '}
          trustworthy.
        </p>
        <blockquote className="text-xs sm:text-sm md:text-base mt-3 md:mt-4 lg:mt-5 max-w-2xl text-brand-black/80 font-terminal leading-relaxed italic border-l-4 border-sun-red pl-4 md:pl-6">
          I like knowing what's real. That's why I show where my actual brain and hands did the work and where I let tools or AI help out. It's not about proving anything; it's about being honest about how things get made.
        </blockquote>
      </div>
      
      {/* Right Side - Social Links */}
      <div className="absolute top-4 md:top-6 lg:top-8 right-6 md:right-8 lg:right-10 flex items-center gap-3 md:gap-4">
        <Link
          href="https://x.com/GueneyUsta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-black hover:text-sun-red focus:text-sun-red focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 rounded transition-colors touch-manipulation"
          aria-label="X (Twitter) - Opens in new tab"
          data-interactive
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </Link>
        <Link
          href="https://github.com/wgusta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-black hover:text-teal focus:text-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 rounded transition-colors touch-manipulation"
          aria-label="GitHub - Opens in new tab"
          data-interactive
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </Link>
        <Link
          href="mailto:hello@sihliconvalley.ch"
          className="text-brand-black hover:text-sun-red focus:text-sun-red focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 rounded transition-colors touch-manipulation"
          aria-label="Send message - Opens email"
          data-interactive
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

