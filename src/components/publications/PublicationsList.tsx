'use client';

import { Publication, PublicationType } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import FormattedBibTeXText from './FormattedBibTeXText';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

const sections: { title: string; id: string; types: PublicationType[]; prefix: string }[] = [
    { title: 'In submission', id: 'in-submission', types: ['manuscript', 'preprint'], prefix: 'J' },
    { title: 'Journal Paper', id: 'journal-paper', types: ['journal'], prefix: 'J' },
    { title: 'Conference Paper', id: 'conference-paper', types: ['conference', 'workshop'], prefix: 'C' },
    { title: 'Patent', id: 'patent', types: ['patent'], prefix: 'P' },
    { title: 'Other Publications', id: 'other-publications', types: ['book-chapter', 'book', 'thesis', 'technical-report'], prefix: 'O' },
];

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    return (
        <div className="publications-page">
            <h1 className={`${embedded ? 'text-2xl' : 'text-4xl'} font-serif font-bold text-primary mb-10`}>
                {config.title}
            </h1>

            <div className="space-y-12">
                {sections.map(section => {
                    // The bibliography supplies the date order within each category.
                    const entries = publications.filter(pub => section.types.includes(pub.type));
                    if (entries.length === 0) return null;

                    return (
                        <section key={section.id} aria-labelledby={section.id}>
                            <h2 id={section.id} className="text-2xl font-serif text-primary border-b border-accent/50 pb-3 mb-5 scroll-mt-28">
                                {section.title}
                            </h2>
                            <ol className="list-none space-y-6" role="list">
                                {entries.map((pub, index) => {
                                    const paperUrl = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;
                                    const venue = pub.journal || pub.conference;
                                    const number = `${section.prefix}${index + 1}`;

                                    return (
                                        <li key={pub.id} id={pub.id} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 scroll-mt-28">
                                            <span className="font-semibold text-primary leading-8 tabular-nums">[{number}]</span>
                                            <div className="min-w-0">
                                                <p className="text-base leading-8 text-neutral-700">
                                                    {pub.authors.map((author, idx) => (
                                                        <span key={`${pub.id}-${idx}`}>
                                                            {idx > 0 && (idx === pub.authors.length - 1 && author.name !== 'et al.'
                                                                ? (pub.authors.length === 2 ? ' and ' : ', and ')
                                                                : ', ')}
                                                            {author.isHighlighted
                                                                ? <strong className="font-bold text-primary">{author.name}</strong>
                                                                : <span>{author.name}</span>}
                                                            {author.isCorresponding && <sup>*</sup>}
                                                        </span>
                                                    ))}
                                                    {', “'}
                                                    {paperUrl ? (
                                                        <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline-offset-4 hover:underline transition-colors">
                                                            <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                                        </a>
                                                    ) : <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />}
                                                    {',” '}
                                                    {venue && <><em>{venue}</em>{', '}</>}
                                                    {pub.volume && <>vol. {pub.volume}, </>}
                                                    {pub.issue && <>no. {pub.issue}, </>}
                                                    {pub.pages && <>{pub.pages.includes('-') ? 'pp.' : 'Art. no.'} {pub.pages.replaceAll('--', '–')}, </>}
                                                    {pub.year}.
                                                    {pub.description && <> <span className="text-neutral-600">({pub.description.replace(/[.]$/, '')})</span></>}
                                                </p>

                                                <div className="publication-links mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-neutral-500">
                                                    {paperUrl && <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{pub.doi ? 'DOI' : 'Source'}<span className="sr-only"> for {pub.title}</span></a>}
                                                    {pub.code && <a href={pub.code} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Code<span className="sr-only"> for {pub.title}</span></a>}
                                                    {pub.abstract && (
                                                        <details className="basis-full">
                                                            <summary className="w-fit cursor-pointer hover:text-accent">Abstract<span className="sr-only"> for {pub.title}</span></summary>
                                                            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{pub.abstract}</p>
                                                        </details>
                                                    )}
                                                    {pub.bibtex && (
                                                        <details className="basis-full">
                                                            <summary className="w-fit cursor-pointer hover:text-accent">BibTeX<span className="sr-only"> for {pub.title}</span></summary>
                                                            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-md border border-neutral-200 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-600">{pub.bibtex}</pre>
                                                        </details>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
