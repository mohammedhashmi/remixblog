import { redirect } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { db } from "~/utils/db.server";

const postSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  try {
    const validatedData = postSchema.parse(data);
    const user = await db.user.findFirst({
      where: {
        username: "hashmi",
      },
    });
    if (!user) throw new Error("user not found");
    const insert = await db.post.create({
      data: {
        ...validatedData,
        userId: user?.id as string,
      },
    });
    return redirect(`/posts/${insert.id}`);
  } catch (error) {
    throw error;
  }
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
