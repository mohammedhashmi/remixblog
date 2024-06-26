import { useLoaderData, redirect } from "@remix-run/react";
import { db }  from '~/utils/db.server';

export interface Post {
  title: string;
  body: string;
  id: string;
}

export const loader = async ({ params }: any) => {
  const post = await db.post.findUnique({
    where: {
      id: params.id as string
    }
  })
  if (!post) throw new Error('post not found');
  const data = { post }
  return data;
}

export const action = async ({ request, params }: any) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const post = await db.post.findUnique({
      where: {
        id: params.id
      }
    })
    if (!post)  throw new Error('post not found');

    await db.post.delete({ where: {id: post.id} })
    console.log(post)
    return redirect('/posts');
  }
  return false
}
function ShowPost() {
  const { post } = useLoaderData() as { post: Post }
  return (
    <>
      <p>title: {post.title}</p>
      <p>body: {post.body}</p>

     <div className="page-footer">
       <form method='post'>
         <input type='hidden' name='_method' value='delete'/>
         <button className='btn btn-delete'>Delete</button>
       </form>
    </div>
    </>
  );
}

export default ShowPost;
