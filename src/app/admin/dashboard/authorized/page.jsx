export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import AuthorizedPage from '@/components/admin/AuthorizedPage';

export default function Page() {
  return <AuthorizedPage />;
}
