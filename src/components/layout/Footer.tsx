'use client';

import { useEffect, useState } from 'react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';

interface FooterProps {
  initialYear: number;
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
}

export default function Footer({ initialYear, lastUpdated, lastUpdatedByLocale, defaultLocale = 'en' }: FooterProps) {
  const [year, setYear] = useState(initialYear);
  useEffect(() => {
    const updateYear = () => setYear(new Date().getFullYear());
    updateYear();
    const timer = window.setInterval(updateYear, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const locale = useLocaleStore((state) => state.locale);
  const messages = useMessages();

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <footer className="border-t border-neutral-200/50 bg-neutral-50/50 dark:bg-neutral-900/50 dark:border-neutral-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-neutral-500">
            {messages.footer.lastUpdated}: {resolvedLastUpdated}
          </p>
          <p className="text-xs text-neutral-500 flex items-center">
            Copyright {year} Mohan Lin.
          </p>
        </div>
      </div>
    </footer>
  );
}
