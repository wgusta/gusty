'use client';

import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged';
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onTagClick?: (tag: string) => void;
}

export default function ProjectCard({ project, onClick, onTagClick }: ProjectCardProps) {
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <article
      className="w-full bg-off-white p-4 md:p-6 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl active:scale-95 focus-within:outline-none focus-within:ring-2 focus-within:ring-sun-red focus-within:ring-offset-2"
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
      
      <h3 className={`text-lg md:text-xl font-bold mb-2 ${
        project.column === 'design' ? 'font-stylish' : project.column === 'ai' ? 'font-terminal' : 'font-stylish'
      } text-brand-black`}>
        {project.title}
      </h3>
      
      <p className={`text-xs md:text-sm mb-3 md:mb-4 ${
        project.column === 'design' ? 'font-stylish' : project.column === 'ai' ? 'font-terminal' : 'font-stylish'
      } text-brand-black/80`}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2" role="list" aria-label="Project tags">
        {project.tags.map((tag, index) => (
          <button
            key={index}
            onClick={(e) => handleTagClick(e, tag)}
            className="px-2 py-1 text-xs rounded bg-brand-black/10 text-brand-black font-terminal hover:bg-brand-black/20 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-1 transition-colors touch-manipulation"
            aria-label={`Filter by tag: ${tag}`}
            role="listitem"
            tabIndex={0}
          >
            {tag}
          </button>
        ))}
      </div>
    </article>
  );
}

