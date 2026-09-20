# Mohan Lin academic homepage

This site intentionally replaces al-folio with PRISM (Next.js static export).
Content lives in `content/`; public assets live in `public/`.
Keep exactly five navigation items: About, Publications, Research, CV, Services.
Preserve academic facts and publication status; never invent publication metadata.
Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` after changes.
GitHub Pages publishes `out/` through `.github/workflows/deploy.yml`.
