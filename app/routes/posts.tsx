import { Outlet } from "@remix-run/react";
function Posts() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}

export default Posts;
