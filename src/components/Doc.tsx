import type { ReactNode } from "react";
import { Children, isValidElement } from "react";
import { CopyButton } from "./CopyButton";

export function DocPage({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <article className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-mono text-4xl font-bold tracking-tight">{title}</h1>
      {lead && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{lead}</p>}
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed">{children}</div>
    </article>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return <h2 id={id} className="mt-12 font-mono text-2xl font-bold border-b border-border pb-2">{children}</h2>;
}
export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 font-mono text-lg font-semibold text-foreground">{children}</h3>;
}
export function P({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>;
}
export function Code({ children }: { children: ReactNode }) {
  return <code className="bg-card border border-border px-1.5 py-0.5 text-[13px] text-accent">{children}</code>;
}
function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children);
  return "";
}

export function CodeBlock({ children, lang }: { children: ReactNode; lang?: string }) {
  const text = extractText(children);
  return (
    <div className="border border-border bg-card overflow-hidden group relative">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{lang ?? "text"}</span>
        <CopyButton value={text} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] text-foreground leading-relaxed"><code>{Children.toArray(children)}</code></pre>
    </div>
  );
}
export function Callout({ kind = "note", children }: { kind?: "note" | "warn"; children: ReactNode }) {
  const cls = kind === "warn"
    ? "border-amber bg-amber/10"
    : "border-primary bg-primary/5";
  return <div className={`border-l-2 ${cls} px-4 py-3 text-sm`}>{children}</div>;
}
export function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-sm">
        <thead className="bg-card">
          <tr>{headers.map((h) => <th key={h} className="text-left font-mono text-[12px] uppercase tracking-wider text-muted-foreground px-3 py-2 border-b border-border">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {r.map((c, j) => <td key={j} className="px-3 py-2 align-top">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
