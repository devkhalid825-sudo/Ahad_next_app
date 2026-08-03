export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import AdminBlogsPage from '@/components/admin/AdminBlogsPage';

export default function Page() {
  return <AdminBlogsPage />;
}
