import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value, className = "" }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={`inline-flex items-center gap-1.5 border border-border bg-card/60 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer ${className}`}
    >
      {copied ? <Check className="size-3 text-primary" /> : <Copy className="size-3" />}
      {copied ? "copied" : "copy"}
    </button>
  );
}
