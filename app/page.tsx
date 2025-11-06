'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { RichContent, VideoEmbed, CodeSnippet } from '@/components/ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged';
  designContent?: React.ReactNode;
  aiContent?: React.ReactNode;
}

// Project data
const projects: Project[] = [
  {
    id: '1',
    title: 'Sample Design Project',
    description: 'A beautiful design project showcasing creative work',
    tags: ['Design', 'Branding', 'UI/UX'],
    column: 'design',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Design Process</h3>
        <p className="mb-4">
          This project demonstrates a comprehensive design approach, combining
          visual aesthetics with functional user experience.
        </p>
        <div className="relative w-full h-64 my-6 rounded-lg overflow-hidden bg-deep-pink/20">
          <p className="absolute inset-0 flex items-center justify-center text-brand-black/40">
            Image placeholder
          </p>
        </div>
        <p>
          The design emphasizes clarity, usability, and visual appeal, creating
          a cohesive experience that resonates with users.
        </p>
      </RichContent>
    ),
  },
  {
    id: '2',
    title: 'AI Integration Project',
    description: 'Advanced AI engineering and integration work',
    tags: ['AI', 'Machine Learning', 'Integration'],
    column: 'ai',
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">AI Engineering</h3>
        <p className="mb-4">
          This project showcases advanced AI integration techniques and
          machine learning implementations.
        </p>
        <CodeSnippet
          code={`function processData(input) {
  const result = aiModel.predict(input);
  return result;
}`}
          language="javascript"
        />
        <p>
          The implementation leverages cutting-edge AI technologies to deliver
          intelligent solutions.
        </p>
      </RichContent>
    ),
  },
  {
    id: '3',
    title: 'Bridged Project',
    description: 'A project that combines design and AI',
    tags: ['Design', 'AI', 'Hybrid'],
    column: 'bridged',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Design Aspect</h3>
        <p>
          The design component of this bridged project focuses on creating
          intuitive interfaces for AI-powered applications.
        </p>
      </RichContent>
    ),
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">AI Aspect</h3>
        <p>
          The AI component powers intelligent features that enhance the user
          experience through machine learning.
        </p>
      </RichContent>
    ),
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

  // Filter projects by selected tag
  const filterProjects = (projectList: Project[]) => {
    if (!selectedTag) return projectList;
    return projectList.filter(p => p.tags.includes(selectedTag));
  };

  const designProjects = filterProjects(projects.filter((p) => p.column === 'design'));
  const aiProjects = filterProjects(projects.filter((p) => p.column === 'ai'));
  const bridgedProjects = filterProjects(projects.filter((p) => p.column === 'bridged'));

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

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
      <Header 
        allTags={allTags}
        selectedTag={selectedTag}
        onTagClick={handleTagClick}
        onClearFilter={() => setSelectedTag(null)}
      />

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-32 md:pt-40 pb-20 relative">
        {/* Left Column - Design */}
        <div className="bg-deep-pink p-6 md:p-8 lg:p-12 flex flex-col gap-6 md:gap-8 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-stylish mb-2 md:mb-4">
            Original Design & Concept
          </h2>
          <div className="flex flex-col gap-6">
            {designProjects.length > 0 ? (
              designProjects.slice(0, 1).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  onTagClick={handleTagClick}
                />
              ))
            ) : (
              <p className="text-brand-white/80 font-stylish">No projects found with the selected filter.</p>
            )}
          </div>
        </div>

        {/* Right Column - AI */}
        <div className="bg-teal p-6 md:p-8 lg:p-12 flex flex-col gap-6 md:gap-8 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-2 md:mb-4">
            AI Integration
          </h2>
          <div className="flex flex-col gap-6">
            {aiProjects.length > 0 ? (
              aiProjects.slice(0, 1).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  onTagClick={handleTagClick}
                />
              ))
            ) : (
              <p className="text-brand-white/80 font-terminal">No projects found with the selected filter.</p>
            )}
          </div>
        </div>
        
        {/* Bridged Projects - Full Width Covering Both Columns */}
        {bridgedProjects.length > 0 && (
          <div className="col-span-1 md:col-span-2 absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6 md:px-8 lg:px-12">
            <div className="flex flex-col gap-6">
              {bridgedProjects.slice(0, 1).map((project) => (
                <div key={project.id} className="w-full">
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    onTagClick={handleTagClick}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
