'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [animationStage, setAnimationStage] = useState(0); // 0: valley, 1: valley crossed, 2: allveys shown, 3: allveys crossed + always shown
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStage(1); // Cross out valley after 2 seconds
    }, 2000);

    const timer2 = setTimeout(() => {
      setAnimationStage(2); // Show allveys after 4 seconds
    }, 4000);

    const timer3 = setTimeout(() => {
      setAnimationStage(3); // Cross out allveys and show always after 6 seconds
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center gap-4 md:gap-6 lg:gap-8 bg-off-white/95 backdrop-blur-sm px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 w-full relative min-h-[80vh] md:min-h-[85vh]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sun-red focus:text-brand-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sun-red"
      >
        Skip to main content
      </a>
      
      {/* Content */}
      <div className="flex flex-col flex-1 max-w-4xl mx-auto items-start md:items-center text-left md:text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-sun-red">
          sihl icon valley
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-2.5 md:mt-5 text-brand-black font-terminal font-bold">
          Güney Usta
        </p>
        <p className="text-xs sm:text-sm md:text-base mt-0.5 md:mt-1 text-brand-black font-terminal italic">
          Words x Design x AI Integration
        </p>
        <p className="text-sm sm:text-base md:text-lg mt-3 md:mt-4 lg:mt-5 max-w-2xl text-brand-black font-terminal leading-relaxed">
          Building things that last. Close to the Sihl, occasionally iconic,{' '}
          <span className="relative inline-block">
            {animationStage === 0 && <span>valley</span>}
            {animationStage === 1 && (
              <span className="line-through decoration-2 decoration-brand-black/60 animate-strikethrough">valley</span>
            )}
            {animationStage === 2 && (
              <>
                <span className="line-through decoration-2 decoration-brand-black/60">valley</span>
                <span className="ml-1 animate-fadeIn">allveys</span>
              </>
            )}
            {animationStage === 3 && (
              <>
                <span className="line-through decoration-2 decoration-brand-black/60">valley</span>
                <span className="line-through decoration-2 decoration-brand-black/60 ml-1 animate-strikethrough">allveys</span>
                <span className="text-sun-red ml-1 animate-fadeIn">always</span>
              </>
            )}
          </span>{' '}
          trustworthy.
          <br />
        </p>
        <blockquote className="text-xs sm:text-sm md:text-base mt-3 md:mt-4 lg:mt-5 max-w-2xl text-brand-black/80 font-terminal leading-relaxed italic border-l-4 border-sun-red pl-4 md:pl-6 mb-6 md:mb-8 lg:mb-10 text-left">
          I like knowing what's real. That's why I show where my actual brain and hands did the work and where I let tools or AI help out. It's not about proving anything; it's about being honest about how things get made. Just as the old Sihl valley once turned raw material into craft and industry, I work with today's raw material — data, words, and design — to build with the same spirit of precision and care.
        </blockquote>
      </div>
      
      {/* Desktop Menu - Red Circle - Same as mobile */}
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
        {/* Menu Button - Red Circle (3/4 visible) */}
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
          {/* X Icon - shown when menu is open, positioned at the center of the circle */}
          {isMenuOpen && (
            <svg 
              className="w-8 h-8 text-brand-white z-10 transition-opacity duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ 
                opacity: 1,
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Menu Icons - Rotating orbit around expanded circle */}
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
            {/* Orbit container - rotates around center */}
            <div 
              className="absolute"
              style={{
                width: '300px',
                height: '300px',
                top: '0',
                left: '0',
                transformOrigin: '150px 150px',
                animation: 'rotateOrbit 12s linear infinite',
              }}
            >
              {/* X (Twitter) Icon - at 0 degrees (right side) */}
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
                  animation: 'fadeInScale 0.5s ease-out 0.1s both',
                  pointerEvents: 'auto',
                }}
                aria-label="X (Twitter) - Opens in new tab"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

              {/* GitHub Icon - at 90 degrees */}
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
                  animation: 'fadeInScale 0.5s ease-out 0.2s both',
                  pointerEvents: 'auto',
                }}
                aria-label="GitHub - Opens in new tab"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(270deg)' }}>
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* LinkedIn Icon - at 180 degrees */}
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
                  animation: 'fadeInScale 0.5s ease-out 0.3s both',
                  pointerEvents: 'auto',
                }}
                aria-label="LinkedIn - Opens in new tab"
                data-interactive
              >
                <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>

              {/* Email Icon - at 270 degrees */}
              <Link
                href="mailto:hello@sihliconvalley.ch"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-12 h-12 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((270 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((270 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScale 0.5s ease-out 0.4s both',
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

      {/* Mobile Menu - Red Circle - Sticky on scroll */}
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
        {/* Menu Button - Red Circle (3/4 visible) */}
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
          {/* X Icon - shown when menu is open, positioned at the center of the circle */}
          {isMenuOpen && (
            <svg 
              className="w-5 h-5 text-brand-white z-10 transition-opacity duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ 
                opacity: 1,
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Menu Icons - Rotating orbit around expanded circle */}
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
            {/* Orbit container - rotates around center */}
            <div 
              className="absolute"
              style={{
                width: '188px',
                height: '188px',
                top: '0',
                left: '0',
                transformOrigin: '94px 94px',
                animation: 'rotateOrbit 12s linear infinite',
              }}
            >
              {/* X (Twitter) Icon - at 0 degrees (right side) */}
              <Link
                href="https://x.com/GueneyUsta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-8 h-8 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((0 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((0 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScale 0.5s ease-out 0.1s both',
                  pointerEvents: 'auto',
                }}
                aria-label="X (Twitter) - Opens in new tab"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

              {/* GitHub Icon - at 90 degrees */}
              <Link
                href="https://github.com/wgusta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-8 h-8 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((90 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((90 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScale 0.5s ease-out 0.2s both',
                  pointerEvents: 'auto',
                }}
                aria-label="GitHub - Opens in new tab"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(270deg)' }}>
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* LinkedIn Icon - at 180 degrees */}
              <Link
                href="https://linkedin.com/in/gueneyusta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-8 h-8 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((180 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((180 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScale 0.5s ease-out 0.3s both',
                  pointerEvents: 'auto',
                }}
                aria-label="LinkedIn - Opens in new tab"
                data-interactive
              >
                <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>

              {/* Email Icon - at 270 degrees */}
              <Link
                href="mailto:hello@sihliconvalley.ch"
                onClick={() => setIsMenuOpen(false)}
                className="absolute w-8 h-8 rounded-full bg-brand-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-all duration-500 touch-manipulation"
                style={{
                  top: `${50 + 50 * Math.cos((270 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((270 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeInScale 0.5s ease-out 0.4s both',
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

