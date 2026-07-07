import { createFileRoute } from "@tanstack/react-router";
import { DocPage, H2, H3, P, Code, CodeBlock, Callout } from "@/components/Doc";

export const Route = createFileRoute("/docs/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ARPCODE Docs" },
      {
        name: "description",
        content:
          "Frequently asked questions about ARPCODE: API key storage, undo/redo, security model for shell commands, telemetry, offline use.",
      },
      { property: "og:url", content: "/docs/faq" },
    ],
    links: [{ rel: "canonical", href: "/docs/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Where are my API keys stored?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Keys are stored in ~/.arp-code/config.json with file mode 0600 (owner read/write only). Environment variables override file values and are never persisted.",
              },
            },
            {
              "@type": "Question",
              name: "Can I undo an edit ARPCODE made?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Use git. ARPCODE runs in your working tree, so 'git diff' and 'git checkout -- <file>' revert any change. /undo is on the v1.1 roadmap.",
              },
            },
            {
              "@type": "Question",
              name: "Is it safe to let ARPCODE run shell commands?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "By default every run_command call prompts you with the exact command before executing. Path traversal is blocked, output is capped, and no network tool is built in.",
              },
            },
            {
              "@type": "Question",
              name: "Does ARPCODE send telemetry?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. ARPCODE has zero analytics, crash reporting, or usage tracking. The only outbound traffic is your chosen LLM provider.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <DocPage
      eyebrow="docs / faq"
      title="Frequently Asked Questions"
      lead="Security, storage, undo, telemetry, and the things people ask most often before they install."
    >
      <H2 id="keys">Where are my API keys stored?</H2>
      <P>
        Keys live in <Code>~/.arp-code/config.json</Code> with file mode <Code>0600</Code> — owner
        read/write only. Group and other have no access. On Windows the equivalent ACL is applied so
        only the current user can read the file.
      </P>
      <P>
        Environment variables (<Code>OPENROUTER_API_KEY</Code>, <Code>GROQ_API_KEY</Code>,{" "}
        <Code>GEMINI_API_KEY</Code>) override file values at startup and are{" "}
        <strong>never persisted to disk</strong>. If you'd rather not store a key on disk at all,
        export it in your shell profile and skip <Code>/connect</Code>.
      </P>
      <Callout>
        OS keychain integration (macOS Keychain, Windows Credential Manager, Linux libsecret) is on
        the v1.2 roadmap.
      </Callout>

      <H2 id="undo">Can I undo an edit ARPCODE made?</H2>
      <P>
        Today: use <strong>git</strong>. ARPCODE writes directly to your working tree, so the usual
        workflow applies.
      </P>
      <CodeBlock lang="bash">{`git diff                       # see every change
git checkout -- src/api/auth.ts  # revert one file
git stash                      # park everything
git reset --hard HEAD          # nuclear option`}</CodeBlock>
      <P>Tomorrow (v1.1 roadmap):</P>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>/undo</Code> — revert to the last automatic git checkpoint ARPCODE creates before
          each BUILD step.
        </li>
        <li>
          <Code>/redo</Code> — re-apply a reverted step.
        </li>
        <li>
          <Code>/diff</Code> — pretty-printed unified diff inside the TUI.
        </li>
      </ul>

      <H2 id="security">What's the security model for command execution?</H2>
      <P>Three layers of protection for any tool the LLM calls:</P>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-1.5">
        <li>
          <strong className="text-foreground">Path sandboxing.</strong> Every <Code>path</Code>{" "}
          input is resolved with <Code>path.resolve(projectRoot, input)</Code> and rejected if the
          result escapes the project root — including via symlink. Files outside <Code>cwd</Code>{" "}
          are unreachable.
        </li>
        <li>
          <strong className="text-foreground">Confirmation gating.</strong> With{" "}
          <Code>confirmDestructive: true</Code> (default),
          <Code>write_file</Code>, <Code>edit_file</Code>, and every <Code>run_command</Code> show a
          diff or the literal command and wait for <Code>y</Code> before touching anything.
        </li>
        <li>
          <strong className="text-foreground">Capped surface area.</strong> Reads cap at 50&nbsp;KB,
          tool output caps at 10K chars, <Code>run_command</Code> has a 30&nbsp;s default timeout
          (120&nbsp;s max), and there is no built-in network tool.
        </li>
      </ol>

      <H3>What ARPCODE will not do</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>Read files outside the current project root.</li>
        <li>
          Make arbitrary HTTP requests on its own (the model can suggest <Code>curl</Code> in a{" "}
          <Code>run_command</Code> call, which you'd see and approve).
        </li>
        <li>
          Write to <Code>~/.arp-code</Code> from tool calls — that path is excluded.
        </li>
      </ul>

      <H2 id="telemetry">Does ARPCODE send telemetry?</H2>
      <P>
        <strong className="text-foreground">No.</strong> Zero analytics, zero crash reporting, zero
        usage tracking. The only outbound traffic is your chosen LLM provider's API. Local providers
        (Ollama) keep everything on your machine.
      </P>

      <H2 id="offline">Can I use ARPCODE offline?</H2>
      <P>
        Yes — via <Code>ollama</Code> as the default provider. Once a model is pulled, ARPCODE works
        with no internet at all. See{" "}
        <a
          className="text-primary underline-offset-4 hover:underline"
          href="/docs/providers#ollama"
        >
          Providers → Ollama
        </a>
        .
      </P>

      <H2 id="cost">How much does it cost?</H2>
      <P>The CLI itself is MIT-licensed and free. Costs come from your LLM provider:</P>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <strong>Ollama</strong> — $0, runs locally.
        </li>
        <li>
          <strong>OpenRouter</strong> — pay-per-token; the <Code>freeTierOnly</Code> config flag
          restricts you to $0 models.
        </li>
        <li>
          <strong>Groq</strong> — generous free tier, paid above it.
        </li>
        <li>
          <strong>Gemini</strong> — 1500 requests/day on the free key.
        </li>
      </ul>

      <H2 id="models">Which model should I pick?</H2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <strong>Best results, paid:</strong> <Code>anthropic/claude-3.5-sonnet</Code> via
          OpenRouter.
        </li>
        <li>
          <strong>Fastest, free:</strong> <Code>llama-3.1-70b-versatile</Code> on Groq.
        </li>
        <li>
          <strong>Local, private:</strong> <Code>qwen2.5-coder:7b</Code> on Ollama.
        </li>
        <li>
          <strong>Long context:</strong> <Code>gemini-1.5-pro</Code> (1M tokens).
        </li>
      </ul>

      <H2 id="files">What files does ARPCODE create on my machine?</H2>
      <CodeBlock lang="text">{`~/.arp-code/
├── config.json     # provider keys, preferences (mode 0600)
├── sessions/       # one JSON file per saved conversation
└── cache/          # AGENTS.md, file index, model metadata`}</CodeBlock>
      <P>Remove the whole directory to factory-reset:</P>
      <CodeBlock lang="bash">{`rm -rf ~/.arp-code`}</CodeBlock>

      <H2 id="contrib">How do I contribute or report bugs?</H2>
      <P>
        File issues and PRs on the{" "}
        <a className="text-primary underline-offset-4 hover:underline" href="https://github.com">
          GitHub repository
        </a>
        . Source is small (~6K LOC) and readable end-to-end — the code itself is the canonical
        reference.
      </P>
    </DocPage>
  ),
});
