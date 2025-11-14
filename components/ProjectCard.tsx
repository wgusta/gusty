'use client';

import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
  status?: 'live' | 'development' | 'archived';
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  activeFilter?: 'design' | 'ai' | 'bridged' | null;
}

export default function ProjectCard({ project, onClick, activeFilter }: ProjectCardProps) {
  // Determine background color for mobile based on project column type
  const getMobileBgColor = () => {
    // On desktop, always use off-white
    // On mobile, use colors based on project column
    if (project.column === 'design') return 'bg-deep-pink md:bg-off-white';
    if (project.column === 'ai') return 'bg-teal md:bg-off-white';
    if (project.column === 'bridged') {
      // On mobile: transparent so gradient shows through, on desktop: off-white (no gradient)
      return 'bg-transparent md:bg-off-white';
    }
    return 'bg-off-white';
  };

  // Determine text color for mobile based on project column type
  const getMobileTextColor = () => {
    // On desktop, always use black
    // On mobile, use white for colored backgrounds
    if (project.column === 'design' || project.column === 'ai' || project.column === 'bridged') {
      return 'md:text-brand-black text-brand-white';
    }
    return 'text-brand-black';
  };

  return (
    <article
      className={`w-full ${getMobileBgColor()} p-4 md:p-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus-within:outline-none focus-within:ring-2 focus-within:ring-sun-red focus-within:ring-offset-2 font-terminal relative`}
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
      {/* Gradient background - only on mobile for bridged projects */}
      {project.column === 'bridged' && (
        <div className="md:hidden absolute inset-0 bg-gradient-to-r from-deep-pink to-teal rounded-lg z-0"></div>
      )}
      
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
      
      <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-2 font-terminal ${getMobileTextColor()} relative z-10`}>
        {project.title}
      </h3>
      
      <p className={`text-xs md:text-sm mb-3 md:mb-4 font-terminal relative z-10 ${
        (project.column === 'design' || project.column === 'ai' || project.column === 'bridged')
          ? 'md:text-brand-black/80 text-brand-white/80'
          : 'text-brand-black/80'
      }`}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 relative z-10" role="list" aria-label="Project tags">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded font-terminal ${
              (project.column === 'design' || project.column === 'ai' || project.column === 'bridged')
                ? 'md:bg-brand-black/10 md:text-brand-black bg-brand-white/20 text-brand-white'
                : 'bg-brand-black/10 text-brand-black'
            }`}
            role="listitem"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

