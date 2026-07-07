import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 font-mono text-xs">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-primary">▍</span> arp<span className="text-primary">code</span>
            </div>
            <p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">
              Open-source terminal AI coding assistant. React + Ink. MIT licensed. Built for
              developers who never leave the shell.
            </p>
          </div>
          <div>
            <div className="text-foreground mb-3">docs</div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>
                <Link to="/docs/install" className="hover:text-primary">
                  install
                </Link>
              </li>
              <li>
                <Link to="/docs/providers" className="hover:text-primary">
                  providers
                </Link>
              </li>
              <li>
                <Link to="/docs/commands" className="hover:text-primary">
                  commands
                </Link>
              </li>
              <li>
                <Link to="/docs/tools" className="hover:text-primary">
                  tools
                </Link>
              </li>
              <li>
                <Link to="/docs/config" className="hover:text-primary">
                  config
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-foreground mb-3">project</div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>
                <a href="https://github.com" className="hover:text-primary">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/arp-code" className="hover:text-primary">
                  npm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  License (MIT)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-muted-foreground sm:flex-row sm:justify-between">
          <div>© 2026 ARPCODE — MIT.</div>
          <div>$ uptime: shipping since v1.0.0</div>
        </div>
      </div>
    </footer>
  );
}
