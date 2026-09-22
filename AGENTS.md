# Mohan Lin academic homepage

This site intentionally replaces al-folio with PRISM (Next.js static export).
Content lives in `content/`; public assets live in `public/`.
Keep navigation in this order: About, Publications, Research, Projects, CV, Services.
Preserve academic facts and publication status; never invent publication metadata.
Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build` after changes.
GitHub Pages publishes `out/` through `.github/workflows/deploy.yml`.
After the required local checks, commit and push authorized updates with Git.
Stop after confirming a successful push; let GitHub Actions deploy in the background.
Do not poll or wait for deployment unless the user explicitly asks to verify it.
