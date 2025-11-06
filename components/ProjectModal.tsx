'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'design' | 'ai'>('design');

  useEffect(() => {
    if (project) {
      // Set initial tab based on project column
      if (project.column === 'ai' && !project.designContent) {
        setActiveTab('ai');
      } else {
        setActiveTab('design');
      }
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const hasDesignContent = project.designContent !== undefined;
  const hasAiContent = project.aiContent !== undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full md:w-[90%] md:h-[90%] md:max-w-6xl md:max-h-[90vh] md:rounded-lg bg-off-white shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-brand-black text-brand-white rounded-full hover:bg-sun-red active:bg-sun-red transition-colors touch-manipulation"
          aria-label="Close modal"
          data-interactive
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-4 md:p-6 border-b border-brand-black/10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-black font-stylish mb-2">
            {project.title}
          </h2>
          <p className="text-sm md:text-base text-brand-black/80 font-terminal">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded bg-brand-black/10 text-brand-black font-terminal"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        {(hasDesignContent && hasAiContent) && (
          <div className="flex border-b border-brand-black/10">
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 px-4 md:px-6 py-3 md:py-4 text-center font-stylish text-base md:text-lg transition-colors touch-manipulation ${
                activeTab === 'design'
                  ? 'bg-deep-pink text-brand-white'
                  : 'bg-off-white text-brand-black hover:bg-deep-pink/10 active:bg-deep-pink/20'
              }`}
              data-interactive
            >
              Design & Writing
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 px-4 md:px-6 py-3 md:py-4 text-center font-terminal text-base md:text-lg transition-colors touch-manipulation ${
                activeTab === 'ai'
                  ? 'bg-teal text-brand-white'
                  : 'bg-off-white text-brand-black hover:bg-teal/10 active:bg-teal/20'
              }`}
              data-interactive
            >
              AI Engineering
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className={`${activeTab === 'design' ? 'font-stylish' : 'font-terminal'}`}>
            {activeTab === 'design' && project.designContent && (
              <div className="prose prose-lg max-w-none text-brand-black">
                {project.designContent}
              </div>
            )}
            {activeTab === 'ai' && project.aiContent && (
              <div className="prose prose-lg max-w-none text-brand-black">
                {project.aiContent}
              </div>
            )}
            {!hasDesignContent && !hasAiContent && (
              <p className="text-brand-black/60">No content available for this project.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for rendering rich content
export function RichContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Helper component for video embeds
export function VideoEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <div className="aspect-video my-6 rounded-lg overflow-hidden">
      <iframe
        src={src}
        title={title || 'Video'}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Helper component for code snippets
export function CodeSnippet({ code, language }: { code: string; language?: string }) {
  return (
    <pre className="bg-brand-black text-off-white p-4 rounded-lg overflow-x-auto my-6 font-terminal text-sm">
      <code>{code}</code>
    </pre>
  );
}

