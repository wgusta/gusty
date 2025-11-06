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
      
      <h3 className="text-lg md:text-xl font-bold mb-2 font-terminal text-brand-white">
        {project.title}
      </h3>
      
      <p className="text-xs md:text-sm mb-3 md:mb-4 font-terminal text-brand-white/80">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2" role="list" aria-label="Project tags">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded bg-brand-white/20 text-brand-white font-terminal"
            role="listitem"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

