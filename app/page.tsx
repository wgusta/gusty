'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import DangerCard from '@/components/DangerCard';
import ProjectModal from '@/components/ProjectModal';
import projects from '@/lib/projects';
import type { Project } from '@/lib/types';
import { t } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/context';
import translations from '@/lib/i18n/translations';

export default function Home() {
  // Check if danger zone should be shown (default: false in production)
  const showDangerZone = process.env.NEXT_PUBLIC_SHOW_DANGER_ZONE === 'true';

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [dangerZoneConfirmed, setDangerZoneConfirmed] = useState<boolean | null>(null);
  const [showDangerZoneMessage, setShowDangerZoneMessage] = useState(false);
  const [isDangerZoneInView, setIsDangerZoneInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'design' | 'ai' | 'bridged' | null>(null);
  const dangerZoneRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tr = translations[lang];

  useEffect(() => {
    // Only initialize danger zone logic if enabled
    if (!showDangerZone) return;

    // Check localStorage for danger zone confirmation
    const savedConfirmation = localStorage.getItem('dangerZoneConfirmed');
    if (savedConfirmation === 'true') {
      setDangerZoneConfirmed(true);
    } else if (savedConfirmation === 'false') {
      setDangerZoneConfirmed(false);
      setShowDangerZoneMessage(true);
    } else {
      setDangerZoneConfirmed(null); // Show modal
    }
  }, [showDangerZone]);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], [data-interactive]') ||
        target.closest('a, button, [role="button"], [data-interactive]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  // Intersection Observer to detect when danger zone is in view
  useEffect(() => {
    if (!showDangerZone || !dangerZoneRef.current || dangerZoneConfirmed !== null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDangerZoneInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    observer.observe(dangerZoneRef.current);

    return () => {
      observer.disconnect();
    };
  }, [dangerZoneConfirmed]);

  const handleDangerZoneConfirm = () => {
    setDangerZoneConfirmed(true);
    localStorage.setItem('dangerZoneConfirmed', 'true');
  };

  const handleDangerZoneDecline = () => {
    setDangerZoneConfirmed(false);
    setShowDangerZoneMessage(true);
    localStorage.setItem('dangerZoneConfirmed', 'false');
  };

  // Filter and sort projects (always exclude danger zone from regular sections)
  const nonDangerProjects = projects.filter(p => p.column !== 'danger');
  const sortedProjects = [...nonDangerProjects].sort((a, b) =>
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );

  // Filter projects based on active filter (mobile only)
  const filteredProjects = activeFilter === null
    ? []
    : sortedProjects.filter(p => p.column === activeFilter);

  // Sort danger zone projects by finalization date (newest first) - only if enabled
  const dangerProjects = showDangerZone ? projects.filter(p => p.column === 'danger') : [];
  const sortedDangerProjects = [...dangerProjects].sort((a, b) =>
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );

  return (
    <main id="main-content" className="min-h-screen relative" tabIndex={-1}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div
        className={`custom-cursor hidden md:block ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />

      {/* Header */}
      <Header />

      {/* Split Screen Layout */}
      <div className={`min-h-screen pt-0 md:pt-8 lg:pt-10 xl:pt-12 relative ${activeFilter === null ? 'pb-4 md:pb-20' : 'pb-20'}`}>
        {/* Mobile Navigation - Only visible on mobile, hidden when modal is open */}
        {selectedProject === null && (
        <div className={`block md:hidden relative z-[60] w-full bg-off-white/95 backdrop-blur-sm md:my-0 ${activeFilter === null ? 'mb-2' : 'mb-[30px]'} mt-24`}>
          <div className="px-4 py-4">
            <h3 className="text-base font-terminal text-brand-black mb-6 uppercase tracking-wide">{tr.exploreProjects}</h3>
            {/* Tabs */}
            <div className="flex border-b border-brand-black/10">
              <button
                onClick={() => setActiveFilter(activeFilter === 'design' ? null : 'design')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-pink ${
                  activeFilter === 'design'
                    ? 'bg-deep-pink text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-deep-pink/10 active:bg-deep-pink/20'
                }`}
                aria-pressed={activeFilter === 'design'}
                aria-label={`Filter ${tr.humanMade}`}
                data-interactive
              >
                {tr.humanMade}
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'ai' ? null : 'ai')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal ${
                  activeFilter === 'ai'
                    ? 'bg-teal text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-teal/10 active:bg-teal/20'
                }`}
                aria-pressed={activeFilter === 'ai'}
                aria-label={`Filter ${tr.aiAssisted}`}
                data-interactive
              >
                {tr.aiAssisted}
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'bridged' ? null : 'bridged')}
                className={`flex-1 px-4 py-3 text-center font-terminal text-sm transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-pink ${
                  activeFilter === 'bridged'
                    ? 'bg-gradient-to-r from-deep-pink to-teal text-brand-white'
                    : 'bg-off-white text-brand-black hover:bg-gradient-to-r hover:from-deep-pink/10 hover:to-teal/10 active:bg-gradient-to-r active:from-deep-pink/20 active:to-teal/20'
                }`}
                aria-pressed={activeFilter === 'bridged'}
                aria-label={`Filter ${tr.teamedUp}`}
                data-interactive
              >
                {tr.teamedUp}
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Full-height background columns - Hidden on mobile, show off-white instead */}
        <div className="hidden md:grid absolute inset-0 top-32 md:top-32 lg:top-40 xl:top-48 bottom-0 grid-cols-1 md:grid-cols-2 pointer-events-none z-0">
          <div className="bg-deep-pink"></div>
          <div className="bg-teal"></div>
        </div>
        {/* Mobile background - off-white */}
        <div className="md:hidden absolute inset-0 top-80 bottom-0 bg-off-white pointer-events-none z-0"></div>

        {/* Project content - sorted by finalization date */}
        <div className="relative z-10 flex flex-col gap-0">
          {/* Section Titles at the top */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 md:mb-8 relative z-20 w-full pt-32 md:pt-32 lg:pt-40 xl:pt-48">
            <div className="px-6 md:px-8 lg:px-12 relative z-20 block">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 relative z-20 block">
                {tr.humanMade}
              </h2>
            </div>
            <div className="px-6 md:px-8 lg:px-12 md:pl-0 relative z-20 block md:flex md:justify-end">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 md:pr-8 lg:pr-12 xl:pr-16 relative z-20 block">
                {tr.aiAssisted}
              </h2>
            </div>
          </div>

          {/* Projects list */}
          {/* On mobile: only show when a button is clicked. On desktop: always show all */}
          <div className={activeFilter === null ? 'hidden md:block' : 'block'}>
            {(activeFilter === null ? sortedProjects : filteredProjects).length > 0 ? (
              (activeFilter === null ? sortedProjects : filteredProjects).map((project) => {
              if (project.column === 'bridged') {
                // Bridged project - full width
                return (
                  <div key={project.id} className="w-full px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10">
                    {/* Card - same background as other cards on desktop, gradient only on mobile */}
                    <div className="max-w-7xl mx-auto">
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                        activeFilter={activeFilter}
                      />
                    </div>
                  </div>
                );
              } else if (project.column === 'design') {
                // Design project - left column
                return (
                  <div
                    key={project.id}
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 md:mr-auto"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              } else {
                // AI project - right column
                return (
                  <div
                    key={project.id}
                    className="w-full md:w-1/2 p-6 md:p-8 lg:p-12 md:ml-auto"
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                );
              }
            })
          ) : (
            // Show empty state messages if no projects
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">{tr.noProjects}</p>
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">{tr.noProjects}</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Danger Zone Section - Always visible, blurred when not confirmed */}
      {showDangerZone && sortedDangerProjects.length > 0 && !showDangerZoneMessage && (
        <div
          ref={dangerZoneRef}
          className="w-full bg-sun-red pt-4 pb-12 md:py-16 lg:py-20 relative"
        >
          {/* Content - blurred when not confirmed */}
          <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-12 ${dangerZoneConfirmed !== true ? 'blur-md' : ''}`}>
            {/* Danger Zone Title */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white font-erratic mb-4 md:mb-6">
                {tr.dangerZone}
              </h2>
            </div>

            {/* Danger Zone Projects */}
            <div className="flex flex-col gap-6 md:gap-8">
              {sortedDangerProjects.map((project) => (
                <DangerCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* Interaction Box (Confirmation Modal) - Fixed to this section, NOT blurred */}
          {showDangerZone && dangerZoneConfirmed === null && isDangerZoneInView && (
            <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ filter: 'none' }}>
              <div className="relative w-full max-w-lg mx-4 bg-off-white rounded-lg shadow-2xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black font-erratic mb-4 md:mb-6">
                  {tr.dangerZoneWarning}
                </h3>
                <p className="text-base md:text-lg text-brand-black font-terminal mb-6 md:mb-8 leading-relaxed">
                  {tr.dangerZoneConfirmText}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDangerZoneConfirm}
                    className="flex-1 px-6 py-3 bg-sun-red text-brand-white font-erratic text-lg rounded-lg hover:bg-sun-red/90 active:bg-sun-red/80 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    {tr.dangerZoneOk}
                  </button>
                  <button
                    onClick={handleDangerZoneDecline}
                    className="flex-1 px-6 py-3 bg-brand-black/10 text-brand-black font-terminal text-lg rounded-lg hover:bg-brand-black/20 active:bg-brand-black/30 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    {tr.dangerZoneDecline}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Danger Zone Message (if declined) */}
      {showDangerZone && showDangerZoneMessage && (
        <div className="w-full bg-sun-red py-12 md:py-16 lg:py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-erratic text-brand-white">
              {tr.dangerZoneDeclinedMsg}
            </p>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
