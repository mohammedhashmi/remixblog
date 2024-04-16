import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix rox" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Index() {
  return (
    <div >
      <h1>Welcome to Rock the Remix </h1>
    </div>
  );
}

export default Index;
