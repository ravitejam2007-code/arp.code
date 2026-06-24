import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — ARPCODE" },
      { name: "description", content: "ARPCODE documentation: install, providers, slash commands, built-in tools, and configuration reference." },
      { property: "og:title", content: "ARPCODE Documentation" },
      { property: "og:description", content: "Install, providers, commands, tools, and config." },
      { property: "og:url", content: "/docs" },
    ],
  }),
  component: DocsLayout,
});

const sections = [
  {
    label: "Getting Started",
    items: [
      { to: "/docs", label: "Introduction", exact: true },
      { to: "/docs/install", label: "Install" },
    ],
  },
  {
    label: "Reference",
    items: [
      { to: "/docs/providers", label: "Providers" },
      { to: "/docs/commands", label: "Slash Commands" },
      { to: "/docs/tools", label: "Tools" },
      { to: "/docs/config", label: "Configuration" },
    ],
  },
  {
    label: "Help",
    items: [
      { to: "/docs/faq", label: "FAQ" },
    ],
  },
];

function DocsLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 py-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <nav className="font-mono text-sm space-y-6">
            {sections.map((s) => (
              <div key={s.label}>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{s.label}</div>
                <ul className="space-y-1">
                  {s.items.map((it) => (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        activeOptions={it.exact ? { exact: true } : undefined}
                        className="block border-l-2 border-transparent px-3 py-1 text-muted-foreground hover:text-foreground hover:border-border"
                        activeProps={{ className: "block border-l-2 border-primary px-3 py-1 text-primary bg-card" }}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
