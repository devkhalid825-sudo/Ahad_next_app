export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import ResetPassword from '@/components/ResetPassword';

export default function Page({ params }) {
  return <ResetPassword />;
}
