import { formatDate } from '@/lib/utils';

export default function BlogDashboardPage() {
  const today = new Date(); // or use post.date if you have it

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600">Today's date: {formatDate(today)}</p>
    </div>
  );
}
