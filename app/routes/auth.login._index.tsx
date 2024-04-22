import { redirect, json } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { login, register } from "~/utils/sessions.server";

export const action = async ({ request }: any) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");
  const fields = { loginType, username, password };
  switch (loginType) {
    case "Login":
      const user = await login({ username, password });
      // create user session
      break;
    case "Register":
      await register({ username, password });
      // check username is unique
      // create user
      // create user session
      break;
    default:
      throw new Error(`Login type is not supported`, { fields });
  }
  console.log(fields);
  redirect("/posts");
};
function LoginIndex() {
  return (
    <div>
      <h1>Login</h1>
      <div className="page-content">
        <form method="post">
          <fieldset>
            <legend>Login or Register</legend>
            <label>
              <input type="radio" name="loginType" value="Login" />
              Login
            </label>
            <label>
              <input type="radio" name="loginType" value="Register" />
              Register
            </label>
          </fieldset>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <div className="error"></div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <div className="error"></div>
          </div>
          <button className="btn btn-block" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginIndex;
