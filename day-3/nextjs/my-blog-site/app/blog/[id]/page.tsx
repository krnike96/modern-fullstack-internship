import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json() as Promise<Post>;
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <h1>Post Not Found</h1>;
  }

  return (
    <div>
      <p><Link href="/">← Back to Home</Link></p>
      <hr />
      <h1>{post.title}</h1>
      <p><em>Post ID: {post.id}</em></p>
      <p>{post.body}</p>
    </div>
  );
}