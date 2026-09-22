# Mohan Lin — Academic Homepage

A personal academic website adapted from [PRISM](https://github.com/xyjoey/PRISM), using Next.js and a static GitHub Pages export.

## Local preview

Use Node.js 22 or later and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Edit content

- `content/config.toml`: identity, contact links, six navigation items.
- `content/bio.md` and `content/about.toml`: introduction and homepage sections.
- `content/publications.bib`: all publications, manuscripts, patent applications, selected papers.
- `content/projects.toml`: five research projects.
- `content/research.toml` and `content/research.md`: Research page, currently empty.
- `content/cv.md`: education, projects, awards, skills, service and interests.
- `content/services.md`: journal reviewing.
- `public/mohan-lin.JPG`: portrait.

The site is intentionally English-only. No template sample people or publications are displayed.
Use the CV page's **Print / Save PDF** button for a printable copy.

## Validate and build

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

`out/` contains the deployable website, including `.nojekyll`. The target is the root domain `https://mohan-lin.github.io/` (no `/PRISM` base path).

## GitHub Pages

Replace the old al-folio source on a branch of `Mohan-Lin/mohan-lin.github.io`, then review and merge it. Set **Settings → Pages → Source → GitHub Actions**. The supplied workflow builds on pull requests and publishes only on pushes to `main` or manual runs on `main`.

## Content note

The old record `wang2026ccer_microgrid` reused the DOI URL of `zhang2026capacity_planning`. The unverified link is omitted; the citation is retained. Add a verified DOI when available. All manuscript statuses are preserved from the source, not reverified with journals. Future education end dates are marked expected.

## License

PRISM is MIT licensed; see `LICENSE`. Existing academic content and portrait were migrated from Mohan Lin's original homepage.
