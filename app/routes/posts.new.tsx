import { redirect } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const { title, body } = Object.fromEntries(form);
  console.log("new title", title);
  console.log("new post body", body);
  return redirect("/posts");
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
