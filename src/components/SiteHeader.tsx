import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-primary">▍</span>
          <span>
            arp<span className="text-primary">code</span>
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground">v1.0.0</span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs">
          <Link
            to="/"
            className="px-3 py-1.5 text-muted-foreground hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "px-3 py-1.5 text-primary" }}
          >
            ~/
          </Link>
          <Link
            to="/docs"
            className="px-3 py-1.5 text-muted-foreground hover:text-foreground"
            activeProps={{ className: "px-3 py-1.5 text-primary" }}
          >
            docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-muted-foreground hover:text-foreground"
          >
            github
          </a>
          <a
            href="https://www.npmjs.com/package/arp-code"
            target="_blank"
            rel="noreferrer"
            className="ml-1 border border-primary px-3 py-1.5 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            npm i -g arp-code
          </a>
        </nav>
      </div>
    </header>
  );
}
