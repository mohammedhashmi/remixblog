import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const loader = async () => {
  const data = { posts: await db.post.findMany({take: 20}) };
  return data;
}

function PostsItems() {
  const { posts } = useLoaderData() as { posts: Post[] };
  return (
    <>
      <h1>Posts</h1>
      {posts && posts.map((post: Post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}

export default PostsItems;
