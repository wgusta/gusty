'use client';

import { useLanguage } from '@/lib/i18n/context';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
      className="px-3 py-1.5 text-xs font-terminal font-semibold rounded-full bg-brand-black/10 text-brand-black hover:bg-brand-black/20 active:bg-brand-black/30 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-sun-red focus:ring-offset-1"
      aria-label={lang === 'en' ? 'Switch to German' : 'Auf Englisch wechseln'}
      data-interactive
    >
      {lang === 'en' ? 'DE' : 'EN'}
    </button>
  );
}
