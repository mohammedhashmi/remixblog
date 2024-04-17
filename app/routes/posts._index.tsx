import { useLoaderData } from "@remix-run/react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export async function loader() {
  const data = {
    posts: [
      { id: 1, title: "post 1", body: "post 1 body" },
      { id: 2, title: "post 2", body: "post 2 body" },
      { id: 3, title: "post 3", body: "post 3 body" },
    ],
  };
  return data;
}

function PostsItems() {
  const { posts } = useLoaderData() as { posts: Post[] };
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}

export default PostsItems;
