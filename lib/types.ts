export type Language = 'en' | 'de';

export type BilingualText = string | { en: string; de: string };

export interface Project {
  id: string;
  title: BilingualText;
  description: BilingualText;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
  finalizedAt: string;
  designContent?: BilingualText;
  aiContent?: BilingualText;
  status?: 'live' | 'development' | 'archived';
  liveUrl?: string;
  downloadUrl?: string;
  techStack?: { [category: string]: string[] };
}

export function t(text: BilingualText, lang: Language): string {
  if (typeof text === 'string') return text;
  return text[lang];
}
