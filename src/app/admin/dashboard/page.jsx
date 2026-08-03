export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import DashboardOverview from '@/components/admin/DashboardOverview';

export default function Page() {
  return <DashboardOverview />;
}
