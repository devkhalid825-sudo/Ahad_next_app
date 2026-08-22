<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands
- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Dev**: `npm run dev`

## SEO Guidelines
- Use `buildMetadata` from `@/lib/seo` for server-side metadata
- Use `generateMetadata` in page files for dynamic metadata
- Use `generateStaticParams` for static site generation of dynamic routes
- JSON-LD structured data goes in `schema`, `breadcrumb`, and `faq` params of `buildMetadata`
- Root `metadata` in `layout.jsx` provides site-wide defaults
- Admin pages should use `noIndex: true` in `buildMetadata`
- Remove client-side `useSeo` hook calls when server-side metadata is available
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:repo-push-guardrails -->
## Repo identity — read this before any git push

This repo is `devkhalid825-sudo/Ahad_next_app` on GitHub, `main` branch. It is the **Next.js** codebase for elipsestudio.com (live production site). Confirm both before pushing:

- `next.config.ts` exists at repo root.
- `package.json` lists `"next"` as a dependency.

**Never push here if the working folder has `vite.config.js` or a root `index.html`** — that means you are in a different, unrelated Vite project (e.g. `Main-elipse/frontend` or `Desktop/frontend`), not this one. Pushing (especially `--force`) from the wrong folder overwrites this repo's real commit history.

### Incident history (2026-08-22)
A separate Vite project was accidentally `git push --force`'d to this repo by an agent tool (OpenCode), wiping the real Next.js commit history on `origin/main` (3 unrelated commits, no shared ancestor with the real history). It was recovered by locating the correct local working copy (which still had the full, correct commit history) and force-pushing it back. Lesson: **before any `git push --force` to this remote, run `git remote -v` and `git log --oneline -5` and visually confirm the commits are Next.js/SEO-related work, not something else.**

### Before force-pushing to this remote
1. Run `git remote -v` — confirm it points to `devkhalid825-sudo/Ahad_next_app.git`.
2. Run `git status` and `git log --oneline -5` — confirm working tree is clean and recent commits match ongoing Next.js/SEO work.
3. Ask the user for explicit confirmation before running `git push --force` — never do it unattended.
<!-- END:repo-push-guardrails -->
