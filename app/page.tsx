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
  // Design Projects (5)
  {
    id: 'design-1',
    title: 'Sustainable Brand Identity',
    description: 'Complete brand redesign for an eco-conscious startup, focusing on minimalism and environmental values',
    tags: ['Branding', 'Identity', 'Typography'],
    column: 'design',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Brand Identity Design</h3>
        <p className="mb-4">
          Created a comprehensive brand identity system that reflects sustainability and modern aesthetics.
          The design process involved extensive research into eco-friendly visual languages and consumer perception.
        </p>
        <div className="relative w-full h-64 my-6 rounded-lg overflow-hidden bg-deep-pink/20">
          <p className="absolute inset-0 flex items-center justify-center text-brand-black/40">
            Brand identity mockup
          </p>
        </div>
        <p>
          The final identity system includes custom typography, color palette, and iconography that work
          harmoniously across all touchpoints.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'design-2',
    title: 'Editorial Layout System',
    description: 'Design system for a quarterly magazine focusing on contemporary art and culture',
    tags: ['Editorial', 'Layout', 'Print'],
    column: 'design',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Editorial Design</h3>
        <p className="mb-4">
          Developed a flexible grid system and typographic hierarchy that adapts to various content types
          while maintaining visual consistency throughout the publication.
        </p>
        <p>
          The layout system emphasizes readability and visual rhythm, creating an engaging reading experience
          that showcases both text and imagery effectively.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'design-3',
    title: 'Product Packaging Series',
    description: 'Sustainable packaging design for a premium skincare line with focus on unboxing experience',
    tags: ['Packaging', 'Product Design', 'Sustainability'],
    column: 'design',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Packaging Design</h3>
        <p className="mb-4">
          Designed a complete packaging system that balances luxury aesthetics with environmental responsibility.
          Each element was carefully considered for both visual impact and sustainable production.
        </p>
        <p>
          The unboxing experience was designed to create moments of delight while minimizing waste and
          maximizing recyclability.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'design-4',
    title: 'Web Typography System',
    description: 'Custom typeface and web typography guidelines for a digital publication platform',
    tags: ['Typography', 'Web Design', 'System Design'],
    column: 'design',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Typography System</h3>
        <p className="mb-4">
          Created a comprehensive typographic system that ensures optimal readability across devices while
          maintaining the publication's distinctive voice.
        </p>
        <p>
          The system includes responsive type scales, line-height calculations, and spacing guidelines
          that adapt seamlessly from mobile to desktop displays.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'design-5',
    title: 'Exhibition Identity',
    description: 'Visual identity and wayfinding system for a contemporary art exhibition',
    tags: ['Identity', 'Exhibition', 'Wayfinding'],
    column: 'design',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Exhibition Design</h3>
        <p className="mb-4">
          Developed a cohesive visual identity that guides visitors through the exhibition space while
          complementing the artworks without competing for attention.
        </p>
        <p>
          The wayfinding system uses subtle visual cues and clear typography to create an intuitive
          navigation experience throughout the gallery.
        </p>
      </RichContent>
    ),
  },
  // AI Integration Projects (2)
  {
    id: 'ai-1',
    title: 'LLM Integration Framework',
    description: 'Custom framework for integrating large language models into existing web applications',
    tags: ['AI', 'LLM', 'Integration', 'Framework'],
    column: 'ai',
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">AI Integration Framework</h3>
        <p className="mb-4">
          Built a modular framework that simplifies the integration of various LLM APIs into web applications.
          The system handles authentication, rate limiting, and response formatting.
        </p>
        <CodeSnippet
          code={`class LLMIntegration {
  constructor(apiKey, model = 'gpt-4') {
    this.apiKey = apiKey;
    this.model = model;
  }
  
  async generateResponse(prompt, context) {
    const response = await this.callAPI({
      model: this.model,
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: prompt }
      ]
    });
    return this.formatResponse(response);
  }
}`}
          language="javascript"
        />
        <p>
          The framework includes error handling, caching mechanisms, and cost optimization features
          to ensure reliable and efficient AI integration.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'ai-2',
    title: 'Automated Content Analysis',
    description: 'AI-powered system for analyzing and categorizing large volumes of user-generated content',
    tags: ['AI', 'NLP', 'Automation', 'Analysis'],
    column: 'ai',
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Content Analysis System</h3>
        <p className="mb-4">
          Developed an automated system that uses natural language processing to analyze, categorize,
          and extract insights from user-generated content at scale.
        </p>
        <CodeSnippet
          code={`def analyze_content(text):
    # Sentiment analysis
    sentiment = sentiment_analyzer(text)
    
    # Topic extraction
    topics = topic_model.extract_topics(text)
    
    # Content categorization
    category = classifier.predict(text)
    
    return {
        'sentiment': sentiment,
        'topics': topics,
        'category': category
    }`}
          language="python"
        />
        <p>
          The system processes thousands of content pieces daily, providing real-time insights
          and automated moderation capabilities.
        </p>
      </RichContent>
    ),
  },
  // Bridged Projects (3)
  {
    id: 'bridged-1',
    title: 'AI-Powered Design Tool',
    description: 'Interactive design application that uses AI to suggest layout improvements and color palettes',
    tags: ['Design', 'AI', 'Tool', 'Interface'],
    column: 'bridged',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Design Interface</h3>
        <p className="mb-4">
          Designed an intuitive interface that allows designers to collaborate with AI suggestions
          while maintaining full creative control. The UI emphasizes clarity and workflow efficiency.
        </p>
        <p>
          The visual design uses a clean, minimal aesthetic that doesn't distract from the design work,
          with AI suggestions appearing as subtle, non-intrusive overlays.
        </p>
      </RichContent>
    ),
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">AI Engine</h3>
        <p className="mb-4">
          Built a custom AI model trained on design principles and color theory to provide contextual
          suggestions for layouts, typography, and color combinations.
        </p>
        <CodeSnippet
          code={`class DesignAI {
  suggestLayout(elements) {
    return this.model.predict({
      elements: elements,
      constraints: this.getConstraints(),
      style: this.analyzeStyle(elements)
    });
  }
  
  suggestColors(baseColor) {
    return this.colorTheory.generatePalette(baseColor);
  }
}`}
          language="javascript"
        />
        <p>
          The AI engine learns from user interactions, improving its suggestions over time while
          respecting the designer's creative vision.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'bridged-2',
    title: 'Smart Content Platform',
    description: 'Content management system with AI-powered writing assistance and design automation',
    tags: ['Design', 'AI', 'CMS', 'Automation'],
    column: 'bridged',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Visual Design System</h3>
        <p className="mb-4">
          Created a comprehensive design system that automatically generates consistent layouts
          based on content type and brand guidelines. The system ensures visual harmony across
          all generated content.
        </p>
        <p>
          Design templates adapt intelligently to different content lengths and media types,
          maintaining brand consistency while allowing for creative variation.
        </p>
      </RichContent>
    ),
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">AI Content Engine</h3>
        <p className="mb-4">
          Integrated multiple AI models for content generation, optimization, and layout suggestions.
          The system analyzes content structure and automatically applies appropriate design templates.
        </p>
        <CodeSnippet
          code={`async function generateContent(topic, style) {
  const content = await llm.generate({
    topic: topic,
    style: style,
    length: 'medium'
  });
  
  const layout = designAI.suggestLayout(content);
  const visuals = imageAI.generateAssets(content);
  
  return { content, layout, visuals };
}`}
          language="javascript"
        />
        <p>
          The platform combines natural language generation with design automation, creating
          a seamless workflow from content creation to publication.
        </p>
      </RichContent>
    ),
  },
  {
    id: 'bridged-3',
    title: 'Interactive Data Visualization',
    description: 'Custom data visualization tool with AI-driven insights and adaptive design',
    tags: ['Design', 'AI', 'Data Visualization', 'Analytics'],
    column: 'bridged',
    designContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">Visualization Design</h3>
        <p className="mb-4">
          Designed an adaptive visualization system that automatically selects the most effective
          chart types and color schemes based on data characteristics and user context.
        </p>
        <p>
          The interface emphasizes clarity and accessibility, with interactive elements that
          reveal deeper insights on demand while maintaining visual elegance.
        </p>
      </RichContent>
    ),
    aiContent: (
      <RichContent>
        <h3 className="text-2xl font-bold mb-4">AI Analytics Engine</h3>
        <p className="mb-4">
          Developed an AI system that analyzes data patterns and automatically generates insights,
          suggesting the most relevant visualizations and highlighting key trends.
        </p>
        <CodeSnippet
          code={`class VisualizationAI {
  analyzeData(dataset) {
    const patterns = this.detectPatterns(dataset);
    const insights = this.generateInsights(patterns);
    const chartType = this.recommendChartType(dataset);
    
    return {
      insights: insights,
      recommendedVisualization: chartType,
      colorScheme: this.optimizeColors(dataset)
    };
  }
}`}
          language="javascript"
        />
        <p>
          The AI engine continuously learns from user interactions, improving its recommendations
          and making data exploration more intuitive and insightful.
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
      <Header />

      {/* Split Screen Layout */}
      <div className="min-h-screen pt-48 md:pt-56 lg:pt-64 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column - Design */}
          <div className="bg-deep-pink p-6 md:p-8 lg:p-12 flex flex-col gap-6 md:gap-8 min-h-[60vh]">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-stylish mb-2 md:mb-4">
              Design
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
          <div className="bg-teal p-6 md:p-8 lg:p-12 flex flex-col gap-6 md:gap-8 min-h-[60vh]">
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

          {/* Bridged Projects - Full width spanning both columns */}
          {bridgedProjects.length > 0 && (
            <div className="col-span-1 md:col-span-2 px-6 md:px-8 lg:px-12 py-6 md:py-8">
              <div className="relative">
                {/* Background gradient from pink to teal */}
                <div className="absolute inset-0 bg-gradient-to-r from-deep-pink via-deep-pink/50 to-teal"></div>
                <div className="relative z-10 max-w-7xl mx-auto">
                  <ProjectCard
                    project={bridgedProjects[0]}
                    onClick={() => setSelectedProject(bridgedProjects[0])}
                    onTagClick={handleTagClick}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
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
