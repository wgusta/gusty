'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/lib/i18n/context';
import translations from '@/lib/i18n/translations';

export default function Header() {
  const [animPhase, setAnimPhase] = useState(0);
  // 0: static
  // 1: curl-g animation playing
  // 2: animation done, "güney usta" text red+bold
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang } = useLanguage();
  const tr = translations[lang];

  useEffect(() => {
    const t1 = setTimeout(() => setAnimPhase(1), 5000);  // start wind blow
    const t2 = setTimeout(() => setAnimPhase(2), 9500);  // 4.5s animation done
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-start justify-start bg-off-white/95 backdrop-blur-sm pt-32 md:pt-32 lg:pt-40 xl:pt-48 pb-4 md:pb-6 lg:pb-8 w-full relative min-h-[35vh] md:min-h-[40vh]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sun-red focus:text-brand-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sun-red"
      >
        Skip to main content
      </a>

      {/* Full-screen wind lines — fixed, z below menu */}
      {animPhase === 1 && (
        <div className="fixed inset-0 pointer-events-none z-[55] overflow-hidden">
          {[
            { top: '10%', delay: '0s',    width: '90%'  },
            { top: '22%', delay: '0.18s', width: '100%' },
            { top: '35%', delay: '0.06s', width: '85%'  },
            { top: '48%', delay: '0.28s', width: '95%'  },
            { top: '61%', delay: '0.12s', width: '88%'  },
            { top: '74%', delay: '0.22s', width: '92%'  },
            { top: '87%', delay: '0.08s', width: '80%'  },
          ].map((l, i) => (
            <div
              key={i}
              className="wind-line-full"
              style={{ top: l.top, animationDelay: l.delay, width: l.width }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col items-start text-left px-6 md:px-8 lg:px-12 w-full">
        {/* Dictionary headword line */}
        <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-sun-red font-stylish">
            gust·y
          </h1>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-black/60 font-terminal">
            /ˈɡʌsti/
          </span>
          <span className="text-sm sm:text-base md:text-lg text-brand-black/50 font-terminal italic">
            {tr.adjective}
          </span>
          {tr.headerOrigin && (
            <span className="text-sm sm:text-base md:text-lg text-brand-black/40 font-terminal">
              {tr.headerOrigin}
            </span>
          )}
        </div>

        {/* Definitions */}
        <div className="mt-4 md:mt-6 lg:mt-8 max-w-2xl relative">
          {/* Definition 1 */}
          <p className="text-sm sm:text-base md:text-lg text-brand-black font-terminal leading-relaxed">
            <span className="text-brand-black/50 mr-2">1.</span>
            {tr.headerDef1}
          </p>

          {/* Definition 2 — wind blow out right, return from left */}
          <p
            className="text-sm sm:text-base md:text-lg text-brand-black font-terminal leading-relaxed mt-2"
            style={{
              animation: animPhase === 1 ? 'windBlow 4.5s ease-in-out forwards' : 'none',
            }}
          >
            <span className="text-brand-black/50 mr-2">2.</span>
            {tr.headerDef2pre}{tr.headerDef2pre ? ' ' : ''}
            <span
              style={{
                color: animPhase === 2 ? '#E62F2D' : 'inherit',
                fontWeight: animPhase === 2 ? '700' : 'inherit',
                transition: 'color 0.8s ease',
              }}
            >
              güney usta
            </span>
            {' '}{tr.headerDef2post}
          </p>
        </div>
      </div>

      {/* Language Toggle - positioned top-left area, below skip link */}
      <div className="absolute top-4 left-6 md:left-8 lg:left-12 z-[60]">
        <LanguageToggle />
      </div>

      {/* Desktop Menu - Red Circle */}
      <div
        className="hidden md:block fixed top-0 right-0 z-[70] transition-all duration-500 ease-out"
        style={{
          overflow: 'visible',
          width: isMenuOpen ? '300px' : '96px',
          height: isMenuOpen ? '300px' : '96px',
          position: 'fixed',
          willChange: 'transform',
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`relative rounded-full bg-sun-red flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 focus:ring-offset-off-white touch-manipulation transition-all duration-500 ${!isMenuOpen ? 'animate-heart-pulse' : ''}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          data-interactive
          type="button"
          style={{
            position: 'absolute',
            top: '-24px',
            right: '-24px',
            width: isMenuOpen ? '180px' : '96px',
            height: isMenuOpen ? '180px' : '96px',
            transform: isMenuOpen ? 'scale(1)' : undefined,
          }}
        >
          {isMenuOpen && (
            <svg
              className="w-8 h-8 text-brand-white z-10 transition-opacity duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ opacity: 1 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {isMenuOpen && (
          <div
            className="fixed z-[69]"
            style={{
              width: '300px',
              height: '300px',
              top: '-102px',
              right: '-102px',
              pointerEvents: 'none',
            }}
          >
            <div
              className="absolute"
              style={{
                width: '300px',
                height: '300px',
                top: '0',
                left: '0',
                transformOrigin: '150px 150px',
                animation: 'rotateOrbit 30s linear infinite',
              }}
            >
              {/* X (Twitter) */}
              <Link
                href="https://x.com/GueneyUsta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-12 h-12 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((0 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((0 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger1 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="X (Twitter) - Opens in new tab"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

              {/* GitHub */}
              <Link
                href="https://github.com/wgusta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-12 h-12 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((90 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((90 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger2 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="GitHub - Opens in new tab"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(270deg)' }}>
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://linkedin.com/in/gueneyusta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-12 h-12 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((180 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((180 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger3 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="LinkedIn - Opens in new tab"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>

              {/* Email */}
              <Link
                href="mailto:gueney@gusty.ch"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-12 h-12 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((270 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((270 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger4 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="Send message - Opens email"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(90deg)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu - Red Circle */}
      <div
        className="md:hidden fixed top-0 right-0 z-[70] transition-all duration-500 ease-out"
        style={{
          overflow: 'visible',
          width: isMenuOpen ? '188px' : '60px',
          height: isMenuOpen ? '188px' : '60px',
          position: 'fixed',
          willChange: 'transform',
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`relative rounded-full bg-sun-red flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 focus:ring-offset-off-white touch-manipulation transition-all duration-500 ${!isMenuOpen ? 'animate-heart-pulse' : ''}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          data-interactive
          type="button"
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: isMenuOpen ? '113px' : '60px',
            height: isMenuOpen ? '113px' : '60px',
            transform: isMenuOpen ? 'scale(1)' : undefined,
          }}
        >
          {isMenuOpen && (
            <svg
              className="w-5 h-5 text-brand-white z-10 transition-opacity duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ opacity: 1 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {isMenuOpen && (
          <div
            className="fixed z-[69]"
            style={{
              width: '188px',
              height: '188px',
              top: '-64px',
              right: '-64px',
              pointerEvents: 'none',
            }}
          >
            <div
              className="absolute"
              style={{
                width: '188px',
                height: '188px',
                top: '0',
                left: '0',
                transformOrigin: '94px 94px',
                animation: 'rotateOrbit 30s linear infinite',
              }}
            >
              {/* X (Twitter) */}
              <Link
                href="https://x.com/GueneyUsta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-10 h-10 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((0 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((0 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger1 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="X (Twitter) - Opens in new tab"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

              {/* GitHub */}
              <Link
                href="https://github.com/wgusta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-10 h-10 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((90 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((90 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger2 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="GitHub - Opens in new tab"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(270deg)' }}>
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://linkedin.com/in/gueneyusta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-10 h-10 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((180 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((180 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger3 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="LinkedIn - Opens in new tab"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>

              {/* Email */}
              <Link
                href="mailto:gueney@gusty.ch"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-10 h-10 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((270 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((270 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScaleStagger4 30s linear infinite',
                  pointerEvents: 'auto',
                }}
                aria-label="Send message - Opens email"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(90deg)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
