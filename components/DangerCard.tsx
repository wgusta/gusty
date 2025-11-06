'use client';

import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
}

interface DangerCardProps {
  project: Project;
  onClick: () => void;
}

export default function DangerCard({ project, onClick }: DangerCardProps) {
  return (
    <article
      className="w-full bg-brand-black p-4 md:p-6 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl active:scale-95 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-white focus-within:ring-offset-2"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      data-interactive
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {project.imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-erratic text-brand-white transform-gpu bg-sun-red px-4 py-3 md:px-6 md:py-4 rounded-lg" style={{
        transform: 'rotate(-1deg) skewX(-2deg)',
        textShadow: '2px 2px 0px rgba(255,255,255,0.1), -1px -1px 0px rgba(0,0,0,0.3)',
        letterSpacing: '0.05em',
      }}>
        {project.title}
      </h3>
      
      <p className="text-sm md:text-base mb-3 md:mb-4 font-erratic text-brand-white/80">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2" role="list" aria-label="Project tags">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded bg-brand-white/20 text-brand-white font-erratic"
            role="listitem"
            style={{
              transform: `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

