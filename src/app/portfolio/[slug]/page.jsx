import Page, { generateMetadata, generateStaticParams } from '@/app/project/[slug]/page';

export const revalidate = 300;
export { generateMetadata, generateStaticParams };
export default Page;

