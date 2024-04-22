import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { globalStyles } from "~/styles/global.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: globalStyles,
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="navbar">
          <Link to="/" className="logo">
            Remix
          </Link>
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li>

            <li>
              <Link to="/posts/new">New Post</Link>
            </li>
          </ul>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <>
      <h1 className="error">{error.message}</h1>
    </>
  );
}
