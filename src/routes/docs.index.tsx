import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage, H2, P, Code, CodeBlock } from "@/components/Doc";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Introduction — ARPCODE Docs" },
      { name: "description", content: "What ARPCODE is, what it isn't, and how to get started in 60 seconds." },
      { property: "og:url", content: "/docs" },
    ],
    links: [{ rel: "canonical", href: "/docs" }],
  }),
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <DocPage
      eyebrow="docs / intro"
      title="Welcome to ARPCODE"
      lead="ARPCODE is an open-source terminal AI coding assistant built with React 18 + Ink 5. It runs entirely in your shell — no IDE, no browser, no Electron."
    >
      <P>
        These docs cover installation, configuring providers, the slash-command reference,
        the built-in tool system, and the configuration schema. If you're new, start with{" "}
        <Link to="/docs/install" className="text-primary underline-offset-4 hover:underline">Install</Link>.
      </P>

      <H2>What ARPCODE is</H2>
      <P>
        A small, fast, MIT-licensed CLI that talks to LLMs over a pluggable provider interface
        (OpenRouter, Ollama, Groq, Gemini). It can read your code, propose plans, execute
        tools, and persist conversations — all from the terminal.
      </P>

      <H2>60-second tour</H2>
      <CodeBlock lang="bash">{`# 1. Install
npm install -g arp-code

# 2. Launch in any project
cd ~/projects/myapp && arpcode

# 3. Analyze the project (generates AGENTS.md)
/init

# 4. Switch modes with Tab — CHAT · PLAN · BUILD
# 5. Ask away.`}</CodeBlock>

      <H2>Where to go next</H2>
      <ul className="space-y-1.5 list-none pl-0">
        {[
          ["/docs/install", "Install", "Install via npm, pnpm, or bun and run your first session."],
          ["/docs/providers", "Providers", "Configure OpenRouter, Ollama, Groq, or Gemini."],
          ["/docs/commands", "Slash Commands", "Every command available in the prompt."],
          ["/docs/tools", "Tools", "The six built-in tools and their safety rules."],
          ["/docs/config", "Configuration", "Schema reference for ~/.arp-code/config.json."],
        ].map(([href, t, d]) => (
          <li key={href} className="border-l-2 border-border hover:border-primary pl-4 py-1">
            <Link to={href} className="font-mono text-primary">{t}</Link>
            <span className="text-muted-foreground"> — {d}</span>
          </li>
        ))}
      </ul>

      <H2>Need help?</H2>
      <P>
        File issues on <a href="https://github.com" className="text-primary underline-offset-4 hover:underline">GitHub</a>{" "}
        or read the source — it's all in <Code>src/</Code>.
      </P>
    </DocPage>
  );
}
