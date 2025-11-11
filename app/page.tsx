'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import DangerCard from '@/components/DangerCard';
import ProjectModal from '@/components/ProjectModal';
import { RichContent, VideoEmbed, CodeSnippet } from '@/components/ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
  finalizedAt: string; // ISO date string
  designContent?: React.ReactNode | string;
  aiContent?: React.ReactNode | string;
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
    finalizedAt: '2024-01-15',
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
    finalizedAt: '2024-03-22',
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
    finalizedAt: '2024-05-10',
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
    finalizedAt: '2024-07-08',
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
    finalizedAt: '2024-09-14',
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
    finalizedAt: '2024-02-28',
    aiContent: `## AI Integration Framework

Built a modular framework that simplifies the integration of various LLM APIs into web applications.
The system handles authentication, rate limiting, and response formatting.

### Key Features

- **Authentication handling** - Secure API key management
- **Rate limiting** - Prevents API quota exhaustion
- **Response formatting** - Consistent output structure
- **Error handling** - Robust error recovery
- **Caching mechanisms** - Cost optimization
- **Cost tracking** - Monitor API usage

\`\`\`javascript
class LLMIntegration {
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
}
\`\`\`

The framework includes error handling, caching mechanisms, and cost optimization features
to ensure reliable and efficient AI integration.

### Performance Metrics

| Metric | Value |
|--------|-------|
| Response Time | < 2s |
| Cache Hit Rate | 85% |
| Error Rate | < 0.1% |
| Cost Reduction | 40% |

> This framework has been successfully deployed in production environments with over 1M requests processed.`,
  },
  {
    id: 'ai-2',
    title: 'Automated Content Analysis',
    description: 'AI-powered system for analyzing and categorizing large volumes of user-generated content',
    tags: ['AI', 'NLP', 'Automation', 'Analysis'],
    column: 'ai',
    finalizedAt: '2024-06-05',
    aiContent: `## Content Analysis System

Developed an automated system that uses natural language processing to analyze, categorize,
and extract insights from user-generated content at scale.

### Capabilities

- **Sentiment Analysis** - Detects emotional tone and polarity
- **Topic Extraction** - Identifies main themes and subjects
- **Content Categorization** - Automatically classifies content
- **Real-time Processing** - Handles high-volume streams
- **Moderation** - Flags inappropriate content

\`\`\`python
def analyze_content(text):
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
    }
\`\`\`

The system processes thousands of content pieces daily, providing real-time insights
and automated moderation capabilities.

### Processing Stats

- **Daily Volume**: 50,000+ pieces
- **Processing Time**: < 100ms per item
- **Accuracy**: 94% categorization
- **Languages Supported**: 15+`,
  },
  // Bridged Projects (3)
  {
    id: 'bridged-1',
    title: 'AI-Powered Design Tool',
    description: 'Interactive design application that uses AI to suggest layout improvements and color palettes',
    tags: ['Design', 'AI', 'Tool', 'Interface'],
    column: 'bridged',
    finalizedAt: '2024-04-18',
    designContent: `## Design Interface

Designed an intuitive interface that allows designers to collaborate with AI suggestions
while maintaining full creative control. The UI emphasizes clarity and workflow efficiency.

### Design Principles

- **Non-intrusive** - AI suggestions appear as subtle overlays
- **Minimal aesthetic** - Clean design that doesn't distract
- **Workflow efficiency** - Streamlined tools and shortcuts
- **Creative control** - Designer always has final say

The visual design uses a clean, minimal aesthetic that doesn't distract from the design work,
with AI suggestions appearing as subtle, non-intrusive overlays.`,
    aiContent: `## AI Engine

Built a custom AI model trained on design principles and color theory to provide contextual
suggestions for layouts, typography, and color combinations.

### AI Capabilities

- **Layout Suggestions** - Analyzes element relationships
- **Color Theory** - Generates harmonious palettes
- **Typography Recommendations** - Suggests font pairings
- **Style Analysis** - Understands design context
- **Learning System** - Improves from user feedback

\`\`\`javascript
class DesignAI {
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
}
\`\`\`

The AI engine learns from user interactions, improving its suggestions over time while
respecting the designer's creative vision.`,
  },
  {
    id: 'bridged-2',
    title: 'Smart Content Platform',
    description: 'Content management system with AI-powered writing assistance and design automation',
    tags: ['Design', 'AI', 'CMS', 'Automation'],
    column: 'bridged',
    finalizedAt: '2024-08-20',
    designContent: `## Visual Design System

Created a comprehensive design system that automatically generates consistent layouts
based on content type and brand guidelines. The system ensures visual harmony across
all generated content.

### System Features

- **Automatic Layout Generation** - Based on content type
- **Brand Consistency** - Enforces guidelines automatically
- **Adaptive Templates** - Adjusts to content length
- **Media Type Support** - Handles images, videos, text
- **Creative Variation** - Allows flexibility within constraints

Design templates adapt intelligently to different content lengths and media types,
maintaining brand consistency while allowing for creative variation.`,
    aiContent: `## AI Content Engine

Integrated multiple AI models for content generation, optimization, and layout suggestions.
The system analyzes content structure and automatically applies appropriate design templates.

### AI Models Integrated

- **LLM** - Natural language generation
- **Design AI** - Layout suggestions
- **Image AI** - Visual asset generation
- **Optimization** - Content refinement

\`\`\`javascript
async function generateContent(topic, style) {
  const content = await llm.generate({
    topic: topic,
    style: style,
    length: 'medium'
  });
  
  const layout = designAI.suggestLayout(content);
  const visuals = imageAI.generateAssets(content);
  
  return { content, layout, visuals };
}
\`\`\`

The platform combines natural language generation with design automation, creating
a seamless workflow from content creation to publication.`,
  },
  {
    id: 'bridged-3',
    title: 'Interactive Data Visualization',
    description: 'Custom data visualization tool with AI-driven insights and adaptive design',
    tags: ['Design', 'AI', 'Data Visualization', 'Analytics'],
    column: 'bridged',
    finalizedAt: '2024-10-12',
    designContent: `## Visualization Design

Designed an adaptive visualization system that automatically selects the most effective
chart types and color schemes based on data characteristics and user context.

### Design Features

- **Adaptive Chart Selection** - Chooses optimal visualization type
- **Context-Aware Colors** - Color schemes match data and context
- **Interactive Elements** - Reveal insights on demand
- **Accessibility First** - WCAG compliant design
- **Visual Elegance** - Clean, professional appearance

The interface emphasizes clarity and accessibility, with interactive elements that
reveal deeper insights on demand while maintaining visual elegance.`,
    aiContent: `## AI Analytics Engine

Developed an AI system that analyzes data patterns and automatically generates insights,
suggesting the most relevant visualizations and highlighting key trends.

### AI Functions

- **Pattern Detection** - Identifies trends and anomalies
- **Insight Generation** - Creates meaningful summaries
- **Chart Recommendation** - Suggests best visualization
- **Color Optimization** - Optimizes color schemes
- **Learning System** - Improves from user feedback

\`\`\`javascript
class VisualizationAI {
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
}
\`\`\`

The AI engine continuously learns from user interactions, improving its recommendations
and making data exploration more intuitive and insightful.`,
  },
  // Danger Zone Projects (3)
  {
    id: 'danger-1',
    title: 'Toddler Eye-Tracking LLM',
    description: 'Created a local large language model that tracks and analyzes eye movement patterns of toddlers',
    tags: ['AI', 'LLM', 'Eye Tracking', 'Toddlers', 'Privacy'],
    column: 'danger',
    finalizedAt: '2024-11-05',
    designContent: `## Interface Design

Designed a minimal, non-intrusive interface for parents to monitor their child's visual attention patterns.
The UI emphasizes privacy and ethical considerations while presenting complex data in an accessible format.

### Design Considerations

- **Privacy First** - All data stays local
- **Non-intrusive** - Minimal visual footprint
- **Accessible** - Complex data made simple
- **Ethical** - Respects child's privacy
- **Expert Consultation** - Child development specialists involved

The design process involved extensive consultation with child development experts to ensure
the interface respects both the child's privacy and parental concerns.`,
    aiContent: `## Local LLM Architecture

Built a custom local language model that processes eye-tracking data to identify attention patterns,
learning preferences, and potential developmental indicators. The model runs entirely on-device to ensure privacy.

### Technical Implementation

- **On-Device Processing** - No cloud dependency
- **Computer Vision** - Advanced gaze detection
- **Pattern Recognition** - Identifies attention patterns
- **Privacy Mode** - Complete data isolation
- **Real-time Analysis** - Instant insights

\`\`\`javascript
class ToddlerEyeTracker {
  constructor() {
    this.model = this.loadLocalLLM();
    this.eyeData = [];
  }
  
  trackEyeMovement(frame) {
    const gazePoint = this.detectGaze(frame);
    this.eyeData.push({
      timestamp: Date.now(),
      position: gazePoint,
      duration: this.calculateFocusDuration(gazePoint)
    });
    
    return this.model.analyze(this.eyeData);
  }
  
  generateInsights() {
    return this.model.predict({
      attentionPatterns: this.eyeData,
      ageGroup: 'toddler',
      privacyMode: true
    });
  }
}
\`\`\`

The system uses advanced computer vision and local AI processing to maintain complete data privacy
while providing valuable insights into early childhood development patterns.`,
  },
  {
    id: 'danger-2',
    title: 'Back Scratcher with Integrated 3D-Printed Gun',
    description: 'Designed a multi-functional back scratcher featuring an integrated 3D-printed firearm component',
    tags: ['Product Design', '3D Printing', 'Weapons', 'Ergonomics'],
    column: 'danger',
    finalizedAt: '2024-10-28',
    designContent: `## Product Design

Created an ergonomic design that combines everyday utility with controversial functionality.
The back scratcher features an ergonomic grip and extendable reach, while the integrated component
raises significant ethical and legal questions.

### Design Challenges

- **Ergonomic Requirements** - Comfortable grip and reach
- **Dual Functionality** - Primary and secondary functions
- **Material Testing** - Extensive testing required
- **Legal Considerations** - Complex regulatory landscape
- **Ethical Questions** - Raises important debates

The design process involved extensive material testing and ergonomic studies to ensure
the primary function (back scratching) remains effective despite the additional complexity.`,
    aiContent: `## 3D Printing & Manufacturing

Utilized AI-assisted design optimization to create printable components that meet both
functional and structural requirements. The manufacturing process involved careful material selection
and layer-by-layer quality control.

### Manufacturing Process

- **AI Design Optimization** - Automated design refinement
- **Material Selection** - PLA and metal components
- **Quality Control** - Layer-by-layer inspection
- **Structural Analysis** - Integrity calculations
- **Legal Constraints** - Compliance checking

\`\`\`javascript
function generateBackScratcherDesign() {
  const ergonomics = analyzeErgonomicRequirements();
  const structural = calculateStructuralIntegrity();
  const legal = checkLegalConstraints();
  
  return optimizeDesign({
    primaryFunction: 'backScratching',
    secondaryFunction: 'firearm',
    materials: ['PLA', 'metalComponents'],
    constraints: [ergonomics, structural, legal],
    printSettings: {
      layerHeight: 0.2,
      infill: 80,
      supports: true
    }
  });
}
\`\`\`

This project explores the boundaries of product design, 3D printing capabilities, and
the intersection of utility with controversial functionality.`,
  },
  {
    id: 'danger-3',
    title: 'Beer Marathon Challenge',
    description: 'Completed a full marathon while consuming 15 liters of beer throughout the race',
    tags: ['Endurance', 'Alcohol', 'Marathon', 'Extreme Sports'],
    column: 'danger',
    finalizedAt: '2024-09-30',
    designContent: `## Event Design & Planning

Designed a comprehensive event structure that balanced safety concerns with the extreme nature
of the challenge. Created checkpoints, hydration strategies, and medical support systems
throughout the marathon route.

### Safety Measures

- **Checkpoints** - Regular monitoring stations
- **Hydration Strategy** - Balanced fluid intake
- **Medical Support** - On-site medical teams
- **Risk Management** - Comprehensive safety protocols
- **Visual Identity** - Extreme yet responsible branding

The visual identity emphasized the extreme nature of the challenge while maintaining
a sense of responsibility and awareness of the risks involved.`,
    aiContent: `## Performance Tracking & Analysis

Developed a real-time monitoring system that tracked alcohol consumption, hydration levels,
heart rate, and running pace throughout the marathon. The system provided alerts and
recommendations to maintain safety while attempting the challenge.

### Monitoring System

- **Real-time Tracking** - Continuous data collection
- **Alcohol Monitoring** - Consumption tracking
- **Hydration Levels** - Fluid balance monitoring
- **Heart Rate** - Cardiovascular monitoring
- **Safety Alerts** - Automatic warning system

\`\`\`javascript
class BeerMarathonTracker {
  constructor() {
    this.beerConsumed = 0; // liters
    this.distance = 0; // km
    this.hydrationLevel = 100;
    this.heartRate = 0;
  }
  
  updateMetrics(beerAmount, distance, heartRate) {
    this.beerConsumed += beerAmount;
    this.distance += distance;
    this.heartRate = heartRate;
    this.hydrationLevel = this.calculateHydration();
    
    if (this.shouldStop()) {
      return this.generateStopAlert();
    }
    
    return this.generateRecommendation();
  }
  
  shouldStop() {
    return this.beerConsumed > 15 || 
           this.hydrationLevel < 60 || 
           this.heartRate > 180;
  }
}
\`\`\`

This project pushed the boundaries of endurance sports and highlighted the importance
of safety monitoring in extreme challenges, regardless of their controversial nature.`,
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [dangerZoneConfirmed, setDangerZoneConfirmed] = useState<boolean | null>(null);
  const [showDangerZoneMessage, setShowDangerZoneMessage] = useState(false);
  const [isDangerZoneInView, setIsDangerZoneInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'design' | 'ai' | 'bridged' | null>(null);
  const dangerZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
    if (!dangerZoneRef.current || dangerZoneConfirmed !== null) return;

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

  // Filter and sort projects (exclude danger zone)
  const nonDangerProjects = projects.filter(p => p.column !== 'danger');
  const sortedProjects = [...nonDangerProjects].sort((a, b) => 
    new Date(b.finalizedAt).getTime() - new Date(a.finalizedAt).getTime()
  );
  
  // Filter projects based on active filter (mobile only)
  const filteredProjects = activeFilter === null
    ? [] 
    : sortedProjects.filter(p => p.column === activeFilter);
  
  // Sort danger zone projects by finalization date (newest first)
  const dangerProjects = projects.filter(p => p.column === 'danger');
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
      <div className={`min-h-screen pt-0 md:pt-4 lg:pt-5 xl:pt-6 relative ${activeFilter === null ? 'pb-4 md:pb-20' : 'pb-20'}`}>
        {/* Mobile Navigation - Only visible on mobile, hidden when modal is open */}
        {selectedProject === null && (
        <div className={`block md:hidden relative z-[60] w-full bg-off-white/95 backdrop-blur-sm md:my-0 ${activeFilter === null ? 'mb-2' : 'mb-[30px]'} mt-24`}>
          <div className="px-4 py-4">
            <h3 className="text-base font-terminal text-brand-black mb-8 uppercase tracking-wide">Explore projects</h3>
            <div className="flex flex-col gap-6">
              <button
                onClick={() => setActiveFilter(activeFilter === 'design' ? null : 'design')}
                className={`w-full px-6 py-6 rounded-lg font-terminal text-base transition-all duration-300 touch-manipulation ${
                  activeFilter === 'design'
                    ? 'bg-deep-pink text-brand-white shadow-md scale-105'
                    : 'bg-deep-pink/20 text-deep-pink active:scale-95'
                }`}
                aria-label="Filter human-made projects"
                data-interactive
              >
                human-made
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'ai' ? null : 'ai')}
                className={`w-full px-6 py-6 rounded-lg font-terminal text-base transition-all duration-300 touch-manipulation ${
                  activeFilter === 'ai'
                    ? 'bg-teal text-brand-white shadow-md scale-105'
                    : 'bg-teal/20 text-teal active:scale-95'
                }`}
                aria-label="Filter AI-assisted projects"
                data-interactive
              >
                AI-assisted
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === 'bridged' ? null : 'bridged')}
                className={`w-full px-6 py-6 rounded-lg font-terminal text-base transition-all duration-300 touch-manipulation ${
                  activeFilter === 'bridged'
                    ? 'bg-gradient-to-r from-deep-pink to-teal text-brand-white shadow-md scale-105'
                    : 'bg-gradient-to-r from-deep-pink/20 to-teal/20 text-brand-black active:scale-95'
                }`}
                aria-label="Filter teamed-up projects"
                data-interactive
              >
                teamed-up
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
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 md:mb-8 relative z-20 w-full pt-28 md:pt-28 lg:pt-[140px] xl:pt-[168px]">
            <div className="px-6 md:px-8 lg:px-12 relative z-20 block">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 relative z-20 block">
                human-made
              </h2>
            </div>
            <div className="px-6 md:px-8 lg:px-12 md:pl-0 relative z-20 block md:flex md:justify-end">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-white font-terminal mb-4 md:mb-6 lg:mb-8 px-2 md:px-4 md:pr-8 lg:pr-12 xl:pr-16 relative z-20 block">
                AI-assisted
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
                <p className="text-brand-white/80 font-terminal">No projects found.</p>
              </div>
              <div className="p-6 md:p-8 lg:p-12">
                <p className="text-brand-white/80 font-terminal">No projects found.</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Scroll down text - Mobile only, between projects and Danger Zone */}
      {activeFilter === null && (
        <div className="block md:hidden w-full bg-off-white min-h-[200px] flex items-center justify-center">
          <p className="text-xs font-terminal text-brand-black/60 italic text-center">
            ↓ Scroll down, if you're brave enough. ↓
          </p>
        </div>
      )}

      {/* Danger Zone Section - Always visible, blurred when not confirmed */}
      {sortedDangerProjects.length > 0 && !showDangerZoneMessage && (
        <div 
          ref={dangerZoneRef}
          className="w-full bg-sun-red pt-4 pb-12 md:py-16 lg:py-20 relative"
        >
          {/* Content - blurred when not confirmed */}
          <div className={`max-w-7xl mx-auto px-6 md:px-8 lg:px-12 ${dangerZoneConfirmed !== true ? 'blur-md' : ''}`}>
            {/* Danger Zone Title */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white font-erratic mb-4 md:mb-6">
                DANGER ZONE
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
          {dangerZoneConfirmed === null && isDangerZoneInView && (
            <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ filter: 'none' }}>
              <div className="relative w-full max-w-lg mx-4 bg-off-white rounded-lg shadow-2xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black font-erratic mb-4 md:mb-6">
                  DANGER ZONE WARNING
                </h3>
                <p className="text-base md:text-lg text-brand-black font-terminal mb-6 md:mb-8 leading-relaxed">
                  I confirm that I enter the DANGER ZONE, a place where I find no practical value and will maybe even see some weird stuff.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDangerZoneConfirm}
                    className="flex-1 px-6 py-3 bg-sun-red text-brand-white font-erratic text-lg rounded-lg hover:bg-sun-red/90 active:bg-sun-red/80 focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    OK
                  </button>
                  <button
                    onClick={handleDangerZoneDecline}
                    className="flex-1 px-6 py-3 bg-brand-black/10 text-brand-black font-terminal text-lg rounded-lg hover:bg-brand-black/20 active:bg-brand-black/30 focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2 transition-colors touch-manipulation"
                    data-interactive
                  >
                    Um no, what is this?
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Danger Zone Message (if declined) */}
      {showDangerZoneMessage && (
        <div className="w-full bg-sun-red py-12 md:py-16 lg:py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-erratic text-brand-white">
              If you're asking questions, you're not ready yet. Come back later.
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
