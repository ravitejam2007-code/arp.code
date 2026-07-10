import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TerminalWindow, Prompt } from "@/components/Terminal";
import { CopyButton } from "@/components/CopyButton";
import { motion } from "motion/react";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARPCODE — Terminal AI Coding Assistant" },
      {
        name: "description",
        content:
          "Open-source terminal AI coding assistant with rich TUI, multi-provider support (OpenRouter, Ollama, Groq, Gemini), plan/build modes, and built-in tools. MIT licensed.",
      },
      { property: "og:title", content: "ARPCODE — Terminal AI Coding Assistant" },
      {
        property: "og:description",
        content:
          "Plan, build, and refactor code without leaving the terminal. Multi-provider, local-first, MIT.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ARPCODE",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "macOS, Linux, Windows",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: "Open-source terminal AI coding assistant built with React + Ink.",
          license: "https://opensource.org/licenses/MIT",
        }),
      },
    ],
  }),
  component: LandingPage,
});

const providers = [
  {
    name: "OpenRouter",
    tag: "Primary · Free models",
    desc: "Aggregated access to 100+ models with free-tier filtering.",
  },
  {
    name: "Ollama",
    tag: "Local · Private",
    desc: "100% on-device inference. Your code never leaves the machine.",
  },
  { name: "Groq", tag: "Cloud · Ultra-fast", desc: "Lightning-fast inference on the free tier." },
  {
    name: "Gemini",
    tag: "Cloud · 1500/day free",
    desc: "Google's frontier models with a generous free quota.",
  },
];

const features = [
  {
    k: "01",
    t: "Rich TUI",
    d: "Component-based rendering via React 18 + Ink 5. Overlays, command palette, keyboard-driven navigation.",
  },
  {
    k: "02",
    t: "Plan / Build / Chat",
    d: "Three distinct workflows — free-form chat, structured planning, and step-by-step execution.",
  },
  {
    k: "03",
    t: "6 Built-in Tools",
    d: "read_file, write_file, edit_file, search_files, list_dir, run_command — with path-safety enforcement.",
  },
  {
    k: "04",
    t: "Project Aware",
    d: "/init analyzes your codebase and generates AGENTS.md for context-aware AI responses.",
  },
  {
    k: "05",
    t: "Multi-Provider",
    d: "OpenRouter, Ollama, Groq, Gemini — switch instantly with a fallback chain.",
  },
  {
    k: "06",
    t: "Persistent Sessions",
    d: "Conversations stored locally via lowdb. Multiple sessions, export to Markdown.",
  },
];

const tools = ["read_file", "write_file", "edit_file", "search_files", "list_dir", "run_command"];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              v1.0.1 · MIT · open source
            </div>
            <h1 className="mt-6 font-mono text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              The AI pair programmer
              <br />
              that lives in your <span className="text-primary text-glow">terminal</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              ARPCODE is an open-source TUI coding assistant. Plan, build, and refactor across
              multiple providers — OpenRouter, Ollama, Groq, Gemini — without alt-tabbing to a
              browser or IDE.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#install"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-mono text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                $ install <span className="opacity-60">→</span>
              </a>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-sm hover:border-primary hover:text-primary transition-colors"
              >
                read the docs
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
              <span>
                <span className="text-primary">✓</span> Node ≥ 20
              </span>
              <span>
                <span className="text-primary">✓</span> macOS · Linux · Windows
              </span>
              <span>
                <span className="text-primary">✓</span> Zero telemetry
              </span>
              <span>
                <span className="text-primary">✓</span> Free forever
              </span>
            </div>
          </div>

          <TerminalWindow title="~/projects/payments — arpcode">
            <Prompt>arpcode</Prompt>
            <div className="mt-2 text-muted-foreground">
              <div>
                <span className="text-primary">▍</span> ARPCODE{" "}
                <span className="text-muted-foreground">v1.0.1</span>
              </div>
              <div className="text-[11px]">
                Provider: openrouter · Model: claude-sonnet · Mode: PLAN
              </div>
            </div>
            <div className="mt-4">
              <Prompt>refactor src/api/auth.ts to use the new token rotation flow</Prompt>
            </div>
            <div className="mt-3 pl-4 border-l-2 border-accent/60 text-foreground/90">
              <div className="text-accent">▸ PLAN — 4 steps</div>
              <div className="mt-1.5 space-y-1 text-[12.5px]">
                <div>
                  1. <span className="text-primary">read_file</span> src/api/auth.ts
                </div>
                <div>
                  2. <span className="text-primary">search_files</span> refreshToken usages
                </div>
                <div>
                  3. <span className="text-primary">edit_file</span> rotate on 401
                </div>
                <div>
                  4. <span className="text-primary">run_command</span> npm test -- auth
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Prompt user="ai">
                <span className="caret">approve plan? (y/n)</span>
              </Prompt>
            </div>
          </TerminalWindow>
        </motion.div>
      </section>

      {/* INSTALL */}
      <section id="install" className="border-b border-border">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-16"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">/install</p>
              <h2 className="mt-2 font-mono text-3xl font-bold">One command. You're in.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Install globally via npm, run from any project directory.
              </p>
            </div>
            <div className="md:col-span-2 grid gap-3">
              {[
                { label: "npm", cmd: "npm install -g arp-code" },
                { label: "pnpm", cmd: "pnpm add -g arp-code" },
                { label: "bun", cmd: "bun add -g arp-code" },
                { label: "run", cmd: "arpcode" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 border border-border bg-card px-4 py-3 font-mono text-sm"
                >
                  <span className="w-12 text-xs uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </span>
                  <span className="text-accent">$</span>
                  <span className="flex-1 text-foreground truncate">{row.cmd}</span>
                  <CopyButton value={row.cmd} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="border-b border-border">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-20"
        >
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                /features
              </p>
              <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-bold">
                Built for the keyboard.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              No mouse. No Electron. No subscription. A small, fast, transparent CLI you can read
              end-to-end.
            </p>
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
            {features.map((f) => (
              <div key={f.k} className="bg-background p-6 hover:bg-card transition-colors group">
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-primary">[{f.k}]</span>
                  <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                </div>
                <h3 className="mt-3 font-mono text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MODES */}
      <section className="border-b border-border bg-card/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">/modes</p>
            <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-bold">
              Three modes. <span className="text-accent">Tab</span> to switch.
            </h2>
            <p className="mt-4 text-muted-foreground">
              ARPCODE separates exploration from execution. Brainstorm in{" "}
              <strong className="text-foreground">chat</strong>, draft structured steps in{" "}
              <strong className="text-foreground">plan</strong>, then watch the agent execute
              tool-by-tool in <strong className="text-foreground">build</strong>.
            </p>
            <div className="mt-8 space-y-4">
              {[
                {
                  k: "CHAT",
                  c: "text-magenta",
                  d: "Free-form conversation. Ask questions, paste errors, sketch ideas.",
                },
                {
                  k: "PLAN",
                  c: "text-accent",
                  d: "AI proposes a numbered implementation plan. Approve, modify, or reject before execution.",
                },
                {
                  k: "BUILD",
                  c: "text-primary",
                  d: "Steps execute sequentially. Pause, resume, skip, or retry — full visibility into every tool call.",
                },
              ].map((m) => (
                <div
                  key={m.k}
                  className="flex gap-4 border-l-2 border-border pl-4 hover:border-primary transition-colors"
                >
                  <span className={`font-mono text-sm font-bold tracking-widest ${m.c}`}>
                    {m.k}
                  </span>
                  <p className="text-sm text-muted-foreground">{m.d}</p>
                </div>
              ))}
            </div>
          </div>

          <TerminalWindow title="mode: build">
            <div className="text-muted-foreground text-[11px]">step 2 of 4 — running</div>
            <div className="mt-2">
              <span className="text-primary">▸</span>{" "}
              <span className="text-accent">search_files</span>{" "}
              <span className="text-muted-foreground">{`{ "pattern": "refreshToken", "cwd": "src/" }`}</span>
            </div>
            <div className="mt-1 pl-5 text-foreground/80 text-[12px]">
              <div>src/api/auth.ts:42 → const refreshToken = …</div>
              <div>src/api/client.ts:118 → if (err.status === 401) refreshToken()</div>
              <div>src/hooks/useSession.ts:9 → refreshToken()</div>
            </div>
            <div className="mt-3">
              <span className="text-primary">▸</span> <span className="text-accent">edit_file</span>{" "}
              <span className="text-muted-foreground">src/api/auth.ts</span>
            </div>
            <div className="mt-1 pl-5 text-[12px]">
              <div className="text-destructive">
                - if (token.expired) throw new Error('expired')
              </div>
              <div className="text-primary">+ if (token.expired) return rotateToken()</div>
            </div>
            <div className="mt-3 text-muted-foreground text-[11px]">
              <span className="text-primary">✓</span> 1 file changed · 3 insertions(+) · 1
              deletion(-)
            </div>
            <div className="mt-3">
              <Prompt user="build">
                <span className="caret">continue to step 3?</span>
              </Prompt>
            </div>
          </TerminalWindow>
        </motion.div>
      </section>

      {/* PROVIDERS */}
      <section className="border-b border-border">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">/providers</p>
          <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-bold">Bring your own model.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Four providers ship in v1.0. Configure one or all — ARPCODE handles failover
            automatically.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((p) => (
              <div
                key={p.name}
                className="border border-border bg-card p-5 hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-lg font-bold">{p.name}</h3>
                  <span className="text-primary text-xs">●</span>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent">
                  {p.tag}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TOOLS */}
      <section className="border-b border-border bg-card/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">/tools</p>
            <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-bold">
              Six tools.
              <br />
              Sandbox enforced.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every file operation runs through path-traversal protection. Every shell command
              requires confirmation. Read 50KB max. Output truncated at 10K. No surprises.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {tools.map((t, i) => (
              <div
                key={t}
                className="flex items-center gap-3 border border-border bg-background px-4 py-3 font-mono text-sm"
              >
                <span className="text-primary text-xs">[{String(i + 1).padStart(2, "0")}]</span>
                <span className="text-foreground">{t}</span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {t.startsWith("run") ? "guarded" : "safe"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">$ start</p>
          <h2 className="mt-3 font-mono text-4xl sm:text-5xl font-bold">Stay in the terminal.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Install ARPCODE in under 10 seconds. Free, MIT, no signup, no credit card, no telemetry.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 border border-primary bg-card px-5 py-3 font-mono text-base">
            <span className="text-accent">$</span>
            <span>npm install -g arp-code</span>
            <CopyButton value="npm install -g arp-code" className="ml-2" />
          </div>
          <div className="mt-6">
            <Link to="/docs" className="font-mono text-sm text-muted-foreground hover:text-primary">
              or read the docs first →
            </Link>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
