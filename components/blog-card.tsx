import { formatDate } from '@/lib/utils';

export function BlogCard({ post }: { post: { title: string; date?: string } }) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-500 text-sm">
        {formatDate(post.date || new Date())}
      </p>
    </div>
  );
}
