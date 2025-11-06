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
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isBridged = project.column === 'bridged';

  return (
    <div
      className={`
        ${isBridged 
          ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] max-w-md hidden md:block' 
          : 'w-full'
        }
        bg-off-white p-4 md:p-6 rounded-lg shadow-lg cursor-pointer
        transition-transform hover:scale-105 hover:shadow-xl active:scale-95
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
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
        project.column === 'design' ? 'font-stylish' : 'font-terminal'
      } text-brand-black`}>
        {project.title}
      </h3>
      
      <p className={`text-xs md:text-sm mb-3 md:mb-4 ${
        project.column === 'design' ? 'font-stylish' : 'font-terminal'
      } text-brand-black/80`}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded bg-brand-black/10 text-brand-black font-terminal"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

