import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      include: {
        user: true,
      },
      take: 20,
    }),
  };
  return data;
};

function PostsItems() {
  const { posts } = useLoaderData() as { posts: Post[] };
  return (
    <>
      <h1>Posts</h1>
      {posts &&
        posts.map((post: Post) => (
          <div key={post.id}>
            <Link to={post.id}>
              <h3>post title: {post.title}</h3>
              <h4>username: {post.user.username}</h4>
              <p>post body: {post.body}</p>
            </Link>
          </div>
        ))}
    </>
  );
}

export default PostsItems;
