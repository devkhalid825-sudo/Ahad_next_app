/**
 * Legacy URL redirect map for the Elipse Studio Next.js site.
 * Key = old path (including trailing slash), Value = new destination path.
 * Generic pattern redirects are handled in middleware.
 */
export const legacyRedirects: Record<string, string> = {
  '/services/webdevelopment/': '/services/website-development',
  '/elipse-studio-viz-roi/': '/blog/elipse-studio-viz-roi',
};
