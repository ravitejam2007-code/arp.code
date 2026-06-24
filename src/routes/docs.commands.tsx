import { createFileRoute } from "@tanstack/react-router";
import { DocPage, H2, P, Code, Table } from "@/components/Doc";

export const Route = createFileRoute("/docs/commands")({
  head: () => ({
    meta: [
      { title: "Slash Commands — ARPCODE Docs" },
      { name: "description", content: "Reference for every slash command in ARPCODE: /init, /plan, /build, /chat, /models, /connect, /export, and more." },
      { property: "og:url", content: "/docs/commands" },
    ],
    links: [{ rel: "canonical", href: "/docs/commands" }],
  }),
  component: () => (
    <DocPage
      eyebrow="docs / commands"
      title="Slash Commands"
      lead="Type / at the prompt to autocomplete. Press Tab to cycle suggestions."
    >
      <Table
        headers={["Command", "Status", "What it does"]}
        rows={[
          [<Code>/init</Code>, "✅", "Analyze project, generate AGENTS.md"],
          [<Code>/chat</Code>, "✅", "Switch to free-form chat mode"],
          [<Code>/plan</Code>, "✅", "Generate a structured implementation plan"],
          [<Code>/build</Code>, "✅", "Execute the current plan step by step"],
          [<Code>/models</Code>, "✅", "Open model picker overlay"],
          [<Code>/agents</Code>, "✅", "Open agent palette"],
          [<Code>/connect</Code>, "✅", "Configure or reconfigure a provider"],
          [<Code>/clear</Code>, "✅", "Clear the current session messages"],
          [<Code>/export</Code>, "✅", "Export the conversation to Markdown"],
          [<Code>/help</Code>, "✅", "Open the help overlay"],
          [<Code>/exit</Code>, "✅", "Quit ARPCODE"],
          [<Code>/diff</Code>, "🔄", "Show git diff (planned)"],
          [<Code>/undo</Code>, "🔄", "Revert to last git checkpoint (planned)"],
          [<Code>/mcps</Code>, "🔄", "MCP server management (planned)"],
        ]}
      />

      <H2>Keyboard shortcuts</H2>
      <Table
        headers={["Keys", "Action"]}
        rows={[
          [<Code>Tab</Code>, "Cycle modes — CHAT → PLAN → BUILD"],
          [<Code>Ctrl+P</Code>, "Open command palette"],
          [<Code>Esc</Code>, "Abort current stream / close overlay"],
          [<Code>↑ / ↓</Code>, "Navigate history & suggestions"],
          [<Code>Enter</Code>, "Submit prompt"],
        ]}
      />

      <H2>File references</H2>
      <P>
        Reference files inline with <Code>@path/to/file</Code> or <Code>{"{file:path/to/file}"}</Code>.
        ARPCODE inlines the file contents (up to 50&nbsp;KB) into the model context.
      </P>
    </DocPage>
  ),
});
