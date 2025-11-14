'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
  className?: string;
  fontFamily?: 'terminal' | 'erratic';
}

export default function MarkdownContent({ 
  content, 
  className = '',
  fontFamily = 'terminal'
}: MarkdownContentProps) {
  const fontClass = fontFamily === 'erratic' ? 'font-erratic' : 'font-terminal';
  
  return (
    <div className={`prose prose-lg max-w-none ${className} ${fontClass}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4 text-brand-black">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mb-3 text-brand-black">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mb-2 text-brand-black">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold mb-2 text-brand-black">{children}</h4>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 text-brand-black/80 leading-relaxed">{children}</p>
          ),
          // Code blocks
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeFontClass = fontFamily === 'erratic' ? 'font-erratic' : 'font-terminal';
            return !inline && match ? (
              <pre className="bg-brand-black text-off-white p-4 rounded-lg overflow-x-auto mt-8 mb-6 text-sm">
                <code className={`${className} ${codeFontClass}`} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className={`bg-brand-black/10 text-brand-black px-1.5 py-0.5 rounded text-sm ${codeFontClass}`} {...props}>
                {children}
              </code>
            );
          },
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-brand-black/80">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-brand-black/80">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="ml-4">{children}</li>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-black/20 pl-4 my-4 italic text-brand-black/70">
              {children}
            </blockquote>
          ),
          // Links
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sun-red hover:underline"
            >
              {children}
            </a>
          ),
          // Images
          img: ({ src, alt }) => (
            <div className="relative w-full my-6 rounded-lg overflow-hidden">
              <img 
                src={src} 
                alt={alt || ''} 
                className="w-full h-auto object-cover"
              />
            </div>
          ),
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-brand-black/20">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-brand-black/5">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody>{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-brand-black/10">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="border border-brand-black/20 px-4 py-2 text-left font-bold text-brand-black">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-brand-black/20 px-4 py-2 text-brand-black/80">
              {children}
            </td>
          ),
          // Horizontal rule
          hr: () => (
            <hr className="my-6 border-t border-brand-black/20" />
          ),
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-brand-black">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

