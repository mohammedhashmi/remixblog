import { redirect } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { db }  from '~/utils/db.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  const insert = await db.post.create(
    {
      data: {
        title: data.title as string,
        body: data.body as string}
    }
  );
  console.log('inserted data', insert)
  return redirect(`/posts/${insert.id}`);
};

function NewPost() {
  return (
    <>
      <h1>New post</h1>
      <div className="page-content">
        <form method="post" className="form">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
export default NewPost;
