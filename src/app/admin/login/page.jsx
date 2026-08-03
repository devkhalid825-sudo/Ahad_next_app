export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import AdminLogin from '@/components/AdminLogin';

export default function Page() {
  return <AdminLogin />;
}
