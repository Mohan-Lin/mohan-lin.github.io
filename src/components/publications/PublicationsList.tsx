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
        <div className="publications-page" lang="en">
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
                            <h2 id={section.id} className="text-2xl font-serif text-primary border-b border-neutral-200 pb-3 mb-5 scroll-mt-28">
                                {section.title}
                            </h2>
                            <ol className="list-none space-y-4" role="list">
                                {entries.map((pub, index) => {
                                    const paperUrl = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;
                                    const venue = pub.journal || pub.conference;
                                    const number = `${section.prefix}${index + 1}`;

                                    return (
                                        <li key={pub.id} id={pub.id} className="publication-card grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 scroll-mt-28 bg-neutral-50 dark:bg-neutral-800 p-4 sm:p-5 rounded-lg border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] shadow-sm transition-[transform,scale,box-shadow] duration-200 ease-out hover:shadow-lg focus-within:shadow-lg motion-safe:hover:scale-[1.02] motion-reduce:transition-none">
                                            <span className="font-semibold text-primary leading-8 tabular-nums">[{number}]</span>
                                            <div className="min-w-0">
                                                <p className="publication-citation text-base leading-8 text-neutral-700">
                                                    {pub.authors.map((author, idx) => (
                                                        <span key={`${pub.id}-${idx}`} className="hyphens-none">
                                                            {idx > 0 && (idx === pub.authors.length - 1 && author.name !== 'et al.'
                                                                ? (pub.authors.length === 2 ? ' and ' : ', and ')
                                                                : ', ')}
                                                            {author.isHighlighted
                                                                ? <strong className="font-bold text-accent">{author.name}</strong>
                                                                : <span>{author.name}</span>}
                                                            {author.isCorresponding && <sup>*</sup>}
                                                        </span>
                                                    ))}
                                                    {', "'}
                                                    {paperUrl ? (
                                                        <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent underline-offset-4 hover:underline transition-colors">
                                                            <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                                        </a>
                                                    ) : <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />}
                                                    {'", '}
                                                    {venue && <>{pub.type === 'patent' ? venue : <em>{venue}</em>}{pub.language === 'Chinese' && ' (in Chinese)'}{', '}</>}
                                                    {pub.volume && <>vol. {pub.volume}, </>}
                                                    {pub.issue && <>no. {pub.issue}, </>}
                                                    {pub.pages && <>{pub.pages.includes('-') ? 'pp.' : 'Art. no.'} {pub.pages.replaceAll('--', '–')}, </>}
                                                    {pub.year}.
                                                    {pub.description && <> <span>({pub.description.replace(/[.]$/, '')})</span></>}
                                                </p>
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
