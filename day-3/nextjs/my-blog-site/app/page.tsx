import Link from "next/link";

interface Post {
  id: number;
  title: string;
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<Post[]>;
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>My Minimal Blog</h1>
      <p>Click on any title below to read the full article:</p>
      <hr />
      
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}