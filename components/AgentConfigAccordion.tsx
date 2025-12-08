'use client';

import { useState, useEffect } from 'react';
import MarkdownContent from './MarkdownContent';
import { AgentConfig as AgentConfigType, loadAgentConfig } from '@/lib/agentConfigs';

interface AgentConfigAccordionProps {
  title: string;
  configs: AgentConfigType[];
}

export default function AgentConfigAccordion({ title, configs }: AgentConfigAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [configContents, setConfigContents] = useState<Map<string, string>>(new Map());
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(new Map());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Load content when item opens
  useEffect(() => {
    openItems.forEach(id => {
      const hasContent = configContents.has(id);
      const isLoading = loadingStates.has(id);
      if (!hasContent && !isLoading) {
        const config = configs.find(c => c.id === id);
        if (config) {
          loadConfigContent(config, id);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openItems]);

  const loadConfigContent = async (config: AgentConfigType, id: string) => {
    setLoadingStates(prev => new Map(prev).set(id, true));
    try {
      const content = await loadAgentConfig(config);
      setConfigContents(prev => new Map(prev).set(id, content));
    } catch (error) {
      console.error(`Failed to load config ${id}:`, error);
      setConfigContents(prev => new Map(prev).set(id, `Error loading content: ${error instanceof Error ? error.message : 'Unknown error'}`));
    } finally {
      setLoadingStates(prev => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const copyToClipboard = async (id: string) => {
    let content = configContents.get(id);
    if (!content) {
      // Try to load it first
      const config = configs.find(c => c.id === id);
      if (config) {
        try {
          content = await loadAgentConfig(config);
          setConfigContents(prev => new Map(prev).set(id, content!));
        } catch (error) {
          console.error(`Failed to load config ${id}:`, error);
          return;
        }
      } else {
        return;
      }
    }
    if (content) {
      await performCopy(content, id);
    }
  };

  const performCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="my-6 md:my-8">
      <h3 className="text-2xl md:text-3xl font-bold text-brand-black font-terminal mb-4 md:mb-6">
        {title}
      </h3>
      <div className="space-y-3 md:space-y-4">
        {configs.map((config) => {
          const isOpen = openItems.has(config.id);
          const isCopied = copiedId === config.id;

          return (
            <div
              key={config.id}
              className="border border-brand-black/20 rounded-lg overflow-hidden bg-off-white"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleItem(config.id)}
                className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left hover:bg-brand-black/5 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-2 focus:ring-inset"
                aria-expanded={isOpen}
                aria-controls={`content-${config.id}`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-base md:text-lg font-semibold text-brand-black font-terminal">
                    {config.title}
                  </h4>
                  {config.description && (
                    <p className="text-xs md:text-sm text-brand-black/70 font-terminal mt-1 line-clamp-2">
                      {config.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Copy Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(config.id);
                    }}
                    className="px-3 py-2 bg-teal hover:bg-teal/90 text-brand-white rounded text-xs md:text-sm font-terminal font-semibold transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={`Copy ${config.title} to clipboard`}
                    title="Copy to clipboard"
                    disabled={loadingStates.get(config.id) === true}
                  >
                    {isCopied ? (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="hidden md:inline">Copied!</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="hidden md:inline">Copy</span>
                      </span>
                    )}
                  </button>
                  {/* Expand/Collapse Icon */}
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 text-brand-black transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div
                  id={`content-${config.id}`}
                  className="px-4 md:px-6 py-4 md:py-6 border-t border-brand-black/10 max-h-[600px] overflow-y-auto"
                >
                  {loadingStates.get(config.id) ? (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-brand-black/60 font-terminal">Loading...</p>
                    </div>
                  ) : configContents.has(config.id) ? (
                    <MarkdownContent content={configContents.get(config.id)!} fontFamily="terminal" />
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-brand-black/60 font-terminal">Content not loaded</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

