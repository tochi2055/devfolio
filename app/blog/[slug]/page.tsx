import { formatDate } from '@/lib/utils';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Simulated example
  const post = {
    title: "My Blog Post",
    content: "This is a post.",
    date: "2024-06-01", // or leave empty to default to today
  };

  return (
    <article className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{formatDate(post.date || new Date())}</p>
      <div className="prose">{post.content}</div>
    </article>
  );
}
