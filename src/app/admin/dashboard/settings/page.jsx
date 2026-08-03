export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import SettingsPage from '@/components/admin/SettingsPage';

export default function Page() {
  return <SettingsPage />;
}
