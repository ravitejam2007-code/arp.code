import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-mono">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">error · 404</p>
        <h1 className="mt-4 text-5xl font-bold text-foreground">route not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          $ cd {`<requested-path>`} → no such directory.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block border border-primary px-4 py-2 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          ~/return-home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-mono">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-destructive">fatal</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">unhandled exception</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page crashed. Try reloading or head back to the index.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-primary px-4 py-2 text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            retry()
          </button>
          <a
            href="/"
            className="border border-border px-4 py-2 text-sm text-foreground hover:bg-muted"
          >
            cd ~
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ARPCODE — Terminal AI Coding Assistant" },
      {
        name: "description",
        content:
          "Open-source terminal AI coding assistant. Plan, build, refactor — without leaving the command line. Multi-provider, local-first, MIT licensed.",
      },
      { name: "author", content: "ARPCODE" },
      { property: "og:site_name", content: "ARPCODE" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0e1116" },
      { property: "og:title", content: "ARPCODE — Terminal AI Coding Assistant" },
      { name: "twitter:title", content: "ARPCODE — Terminal AI Coding Assistant" },
      {
        property: "og:description",
        content:
          "Open-source terminal AI coding assistant. Plan, build, refactor — without leaving the command line. Multi-provider, local-first, MIT licensed.",
      },
      {
        name: "twitter:description",
        content:
          "Open-source terminal AI coding assistant. Plan, build, refactor — without leaving the command line. Multi-provider, local-first, MIT licensed.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
