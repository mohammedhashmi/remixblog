import { useParams } from "@remix-run/react";
function ShowPost() {
  const params = useParams();
  return (
    <>
      <p>this is a show post {params.id}</p>
    </>
  );
}

export default ShowPost;
