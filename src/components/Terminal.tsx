import type { ReactNode } from "react";

export function TerminalWindow({
  title = "arpcode",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-md border border-border bg-card shadow-2xl ring-glow ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-background/80 px-3 py-2">
        <span className="size-2.5 rounded-full bg-destructive/80" />
        <span className="size-2.5 rounded-full bg-amber/80" />
        <span className="size-2.5 rounded-full bg-primary/80" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" />
        <div className="relative p-4 font-mono text-[13px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Prompt({ children, user = "you" }: { children: ReactNode; user?: string }) {
  return (
    <div>
      <span className="text-primary">{user}@arp</span>
      <span className="text-muted-foreground"> ~ </span>
      <span className="text-accent">❯ </span>
      <span className="text-foreground">{children}</span>
    </div>
  );
}
