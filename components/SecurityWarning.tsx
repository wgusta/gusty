'use client';

export default function SecurityWarning() {
  return (
    <div className="bg-sun-red rounded-lg p-4 md:p-6 my-6 md:my-8 border-2 border-sun-red/20">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="flex-shrink-0 mt-1">
          <svg 
            className="w-6 h-6 md:w-8 md:h-8 text-brand-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-brand-white font-terminal mb-2 md:mb-3">
            ⚠️ Security Warning: Always Review Agent Prompts Before Use
          </h3>
          <div className="text-sm md:text-base text-brand-white/95 font-terminal leading-relaxed">
            <p>
              <strong>Critical:</strong> Before using any of these agent prompts or configurations with your tools, you MUST review them carefully for potential security risks. Test in an isolated environment first and verify that prompts align with your security policies.
            </p>
            <p className="mt-2 md:mt-3">
              <strong>Best practices:</strong> Give agents only minimal execution rights, set them up yourself to avoid prompt injections, and when accessing web resources, always verify the sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

