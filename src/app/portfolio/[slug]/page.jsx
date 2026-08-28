import Page, { generateMetadata, generateStaticParams } from '@/app/project/[slug]/page';

export const revalidate = 0; // No cache — always fetch fresh data from backend
export { generateMetadata, generateStaticParams };
export default Page;

