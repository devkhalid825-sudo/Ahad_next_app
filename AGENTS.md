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
