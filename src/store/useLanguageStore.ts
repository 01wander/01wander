import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TranslationKey } from 'i18next';

export type Language = 'zh' | 'en' | 'ja' | 'ko';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'zh',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

const translations: Record<Language, Record<string, any>> = {};

export function t(key: string, lang?: Language): string {
  const currentLang = lang || useLanguageStore.getState().language;
  const keys = key.split('.');
  let value: any = translations[currentLang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
