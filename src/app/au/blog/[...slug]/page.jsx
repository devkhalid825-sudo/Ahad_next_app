import { redirect } from 'next/navigation';

export default async function AuBlogArticlePage({ params }) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join('/') : slug;
  redirect(`/blog/${slugStr}`);
}
