import { createFileRoute } from "@tanstack/react-router";
import { DocPage, H2, H3, P, Code, CodeBlock, Table, Callout } from "@/components/Doc";

export const Route = createFileRoute("/docs/providers")({
  head: () => ({
    meta: [
      { title: "Providers — ARPCODE Docs" },
      { name: "description", content: "Configure OpenRouter, Ollama, Groq, and Gemini. Required environment variables, API key sources, and example config blocks." },
      { property: "og:url", content: "/docs/providers" },
    ],
    links: [{ rel: "canonical", href: "/docs/providers" }],
  }),
  component: () => (
    <DocPage
      eyebrow="docs / providers"
      title="LLM Providers"
      lead="ARPCODE ships with four providers. Each one has a guided /connect flow, an env-var override, and a JSON config block."
    >
      <Table
        headers={["Provider", "Type", "Free tier", "Env var", "Default model"]}
        rows={[
          [<Code>openrouter</Code>, "Cloud aggregator", "Yes (free-model filter)", <Code>OPENROUTER_API_KEY</Code>, "anthropic/claude-3.5-sonnet"],
          [<Code>ollama</Code>, "Local", "Unlimited", <Code>OLLAMA_HOST</Code>, "llama3.1:8b"],
          [<Code>groq</Code>, "Cloud", "Generous", <Code>GROQ_API_KEY</Code>, "llama-3.1-70b-versatile"],
          [<Code>gemini</Code>, "Cloud", "1500 req/day", <Code>GEMINI_API_KEY</Code>, "gemini-1.5-flash"],
        ]}
      />

      <Callout>
        Env vars take precedence over <Code>~/.arp-code/config.json</Code>. ARPCODE reads them on startup
        and falls back to the stored config when unset.
      </Callout>

      <H2 id="openrouter">OpenRouter</H2>
      <P><strong>Best for:</strong> trying many models without separate accounts, or staying on the free tier.</P>

      <H3>1. Get a key</H3>
      <P>Sign up at <a className="text-primary underline-offset-4 hover:underline" href="https://openrouter.ai/keys">openrouter.ai/keys</a>, click <em>Create Key</em>, copy the <Code>sk-or-…</Code> value.</P>

      <H3>2. Connect</H3>
      <CodeBlock lang="bash">{`# Interactive
arpcode
/connect openrouter

# Or via env var
export OPENROUTER_API_KEY=sk-or-...
arpcode`}</CodeBlock>

      <H3>3. Example config</H3>
      <CodeBlock lang="json">{`{
  "defaultProvider": "openrouter",
  "openrouter": {
    "apiKey": "sk-or-...",
    "model": "anthropic/claude-3.5-sonnet",
    "freeTierOnly": false,
    "timeoutMs": 60000
  }
}`}</CodeBlock>
      <P>Set <Code>freeTierOnly: true</Code> to restrict the model picker to $0-cost models.</P>

      <H2 id="ollama">Ollama (local)</H2>
      <P><strong>Best for:</strong> privacy-first work. Your code never leaves the machine.</P>

      <H3>1. Install Ollama</H3>
      <CodeBlock lang="bash">{`# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows: download installer from https://ollama.com/download`}</CodeBlock>

      <H3>2. Pull a model and start the server</H3>
      <CodeBlock lang="bash">{`ollama serve &              # runs on http://127.0.0.1:11434
ollama pull llama3.1:8b     # ~4.7 GB
ollama pull qwen2.5-coder:7b   # coding-tuned alternative`}</CodeBlock>

      <H3>3. Connect</H3>
      <CodeBlock lang="bash">{`arpcode
/connect ollama
# Or with a remote host:
export OLLAMA_HOST=http://192.168.1.20:11434
arpcode`}</CodeBlock>

      <H3>4. Example config</H3>
      <CodeBlock lang="json">{`{
  "defaultProvider": "ollama",
  "ollama": {
    "host": "http://127.0.0.1:11434",
    "model": "qwen2.5-coder:7b"
  }
}`}</CodeBlock>

      <Callout>No API key required. Ollama mode also works fully offline once the model is pulled.</Callout>

      <H2 id="groq">Groq</H2>
      <P><strong>Best for:</strong> ultra-fast inference (sub-second first token).</P>

      <H3>1. Get a key</H3>
      <P>Sign in at <a className="text-primary underline-offset-4 hover:underline" href="https://console.groq.com/keys">console.groq.com/keys</a>, create a key starting with <Code>gsk_</Code>.</P>

      <H3>2. Connect</H3>
      <CodeBlock lang="bash">{`export GROQ_API_KEY=gsk_...
arpcode
# or:
/connect groq`}</CodeBlock>

      <H3>3. Example config</H3>
      <CodeBlock lang="json">{`{
  "defaultProvider": "groq",
  "groq": {
    "apiKey": "gsk_...",
    "model": "llama-3.1-70b-versatile"
  }
}`}</CodeBlock>

      <H2 id="gemini">Gemini</H2>
      <P><strong>Best for:</strong> long-context tasks (up to 1M tokens) and the daily free quota.</P>

      <H3>1. Get a key</H3>
      <P>Visit <a className="text-primary underline-offset-4 hover:underline" href="https://aistudio.google.com/apikey">aistudio.google.com/apikey</a> and create a key.</P>

      <H3>2. Connect</H3>
      <CodeBlock lang="bash">{`export GEMINI_API_KEY=...
arpcode
# or:
/connect gemini`}</CodeBlock>

      <H3>3. Example config</H3>
      <CodeBlock lang="json">{`{
  "defaultProvider": "gemini",
  "gemini": {
    "apiKey": "...",
    "model": "gemini-1.5-pro"
  }
}`}</CodeBlock>

      <H2>Switching providers at runtime</H2>
      <P>Open the model picker with <Code>Ctrl+P → models</Code>, or run <Code>/models</Code> to fuzzy-search across every configured provider.</P>

      <H2>Fallback chain</H2>
      <P>
        If your default provider returns an error (rate-limit, network, 5xx), the provider manager
        automatically retries against the next configured provider. Order is:
      </P>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
        <li><Code>defaultProvider</Code> from config</li>
        <li>Every other provider present in config, in declaration order</li>
        <li>Surface the original error if all fail</li>
      </ol>

      <H2>Where keys are stored</H2>
      <P>
        Keys live in <Code>~/.arp-code/config.json</Code> with file mode <Code>0600</Code> (owner read/write only).
        Env vars override file values and are never persisted to disk.
      </P>
    </DocPage>
  ),
});
