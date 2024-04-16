import { Outlet } from '@remix-run/react';
function Posts() {
  return (
    <>
      <h1>posts layout</h1>
      <Outlet/>
    </>
  )
}

export default Posts
