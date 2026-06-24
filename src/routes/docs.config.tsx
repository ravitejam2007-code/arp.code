import { createFileRoute } from "@tanstack/react-router";
import { DocPage, H2, H3, P, Code, CodeBlock, Table } from "@/components/Doc";

export const Route = createFileRoute("/docs/config")({
  head: () => ({
    meta: [
      { title: "Configuration — ARPCODE Docs" },
      { name: "description", content: "ARPCODE configuration schema. ~/.arp-code/config.json fields and defaults." },
      { property: "og:url", content: "/docs/config" },
    ],
    links: [{ rel: "canonical", href: "/docs/config" }],
  }),
  component: () => (
    <DocPage
      eyebrow="docs / config"
      title="Configuration"
      lead="ARPCODE stores its config at ~/.arp-code/config.json. The schema is validated with Zod on read and write."
    >
      <H2>Example</H2>
      <CodeBlock lang="json">{`{
  "version": 1,
  "defaultProvider": "openrouter",
  "openrouter": {
    "apiKey": "sk-or-…",
    "model": "anthropic/claude-3.5-sonnet",
    "timeoutMs": 60000
  },
  "ollama": {
    "host": "http://127.0.0.1:11434",
    "model": "llama3.1:8b"
  },
  "onboarded": true,
  "theme": "dark",
  "animations": true,
  "sidebarVisible": true,
  "confirmDestructive": true,
  "maxContextWindow": 128000,
  "temperature": 0.2
}`}</CodeBlock>

      <H2>Schema reference</H2>
      <Table
        headers={["Key", "Type", "Default", "Notes"]}
        rows={[
          [<Code>version</Code>, "number", "1", "Schema version"],
          [<Code>defaultProvider</Code>, '"openrouter"|"ollama"|"groq"|"gemini"', '"openrouter"', "Provider selected on launch"],
          [<Code>theme</Code>, '"dark"|"dracula"|"solarized"', '"dark"', "TUI color theme"],
          [<Code>animations</Code>, "boolean", "true", "Spinners, transitions"],
          [<Code>sidebarVisible</Code>, "boolean", "true", "Stats sidebar"],
          [<Code>confirmDestructive</Code>, "boolean", "true", "Gate run_command and write ops"],
          [<Code>maxContextWindow</Code>, "number", "128000", "Tokens before truncation"],
          [<Code>temperature</Code>, "number", "0.2", "Model sampling temperature"],
          [<Code>onboarded</Code>, "boolean", "false", "Skips first-run wizard if true"],
        ]}
      />

      <H3>Per-provider blocks</H3>
      <Table
        headers={["Provider", "Required", "Optional"]}
        rows={[
          [<Code>openrouter</Code>, "apiKey", "model, timeoutMs, freeTierOnly"],
          [<Code>ollama</Code>, "—", "host, model"],
          [<Code>groq</Code>, "apiKey", "model"],
          [<Code>gemini</Code>, "apiKey", "model"],
        ]}
      />

      <H2>Editing config</H2>
      <P>You can edit the JSON file directly, or use <Code>/connect &lt;provider&gt;</Code> from inside the TUI.</P>

      <H2>Reset to defaults</H2>
      <CodeBlock lang="bash">{`rm ~/.arp-code/config.json
arpcode   # re-runs onboarding`}</CodeBlock>
    </DocPage>
  ),
});
