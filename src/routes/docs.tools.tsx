import { createFileRoute } from "@tanstack/react-router";
import { DocPage, H2, H3, P, Code, CodeBlock, Table, Callout } from "@/components/Doc";

export const Route = createFileRoute("/docs/tools")({
  head: () => ({
    meta: [
      { title: "Tools — ARPCODE Docs" },
      {
        name: "description",
        content:
          "Complete reference for the six built-in ARPCODE tools: inputs, outputs, safety, path rules, and examples.",
      },
      { property: "og:url", content: "/docs/tools" },
    ],
    links: [{ rel: "canonical", href: "/docs/tools" }],
  }),
  component: () => (
    <DocPage
      eyebrow="docs / tools"
      title="Tooling Reference"
      lead="Six tools the LLM can call. Each one runs through path-safety checks; destructive operations require confirmation."
    >
      <H2>Tool call format</H2>
      <CodeBlock lang="text">{`[tool_name] {"arg":"value","arg2":42}`}</CodeBlock>
      <P>
        The parser is forgiving — partial JSON, single-line, and quoted-text fallbacks all work.
        Unknown tool names are rejected before any I/O happens.
      </P>

      <Table
        headers={["Tool", "Required inputs", "Optional", "Destructive?"]}
        rows={[
          [<Code>read_file</Code>, "path", "encoding", "no"],
          [<Code>write_file</Code>, "path, content", "createDirs", "yes (overwrites)"],
          [<Code>edit_file</Code>, "path, search, replace", "—", "yes"],
          [<Code>search_files</Code>, "pattern", "cwd, ignore", "no"],
          [<Code>list_dir</Code>, "path", "depth", "no"],
          [<Code>run_command</Code>, "cmd", "cwd, timeoutMs", "yes (gated)"],
        ]}
      />

      <H2 id="read_file">read_file</H2>
      <P>Read a UTF-8 file and return its contents with 1-indexed line numbers.</P>
      <CodeBlock>{`[read_file] {"path":"src/index.ts"}`}</CodeBlock>
      <H3>Inputs</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>path</Code> — string, required. Project-relative or absolute (must resolve under
          project root).
        </li>
        <li>
          <Code>encoding</Code> — string, default <Code>"utf-8"</Code>.
        </li>
      </ul>
      <H3>Limits</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          Hard cap: <strong className="text-foreground">50&nbsp;KB</strong> per call. Larger files
          return a truncation notice with the first 50&nbsp;KB.
        </li>
        <li>Binary files (detected via null-byte sniff) are rejected.</li>
      </ul>

      <H2 id="write_file">write_file</H2>
      <P>Create or overwrite a file. Missing parent directories are created automatically.</P>
      <CodeBlock>{`[write_file] {"path":"src/new.ts","content":"export const x = 1"}`}</CodeBlock>
      <H3>Inputs</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>path</Code> — string, required. Must resolve under the project root.
        </li>
        <li>
          <Code>content</Code> — string, required. Any size accepted; written atomically via temp
          file + rename.
        </li>
        <li>
          <Code>createDirs</Code> — boolean, default <Code>true</Code>.
        </li>
      </ul>
      <Callout kind="warn">
        Overwrites without prompting when <Code>confirmDestructive: false</Code>. With the default
        <Code>true</Code> setting, ARPCODE shows a diff and asks before touching disk.
      </Callout>

      <H2 id="edit_file">edit_file</H2>
      <P>
        Search-and-replace within a file. The <Code>search</Code> string must match{" "}
        <strong>exactly once</strong>, or the call fails — no silent ambiguity.
      </P>
      <CodeBlock>{`[edit_file] {
  "path": "src/api/auth.ts",
  "search": "throw new Error('expired')",
  "replace": "return rotateToken()"
}`}</CodeBlock>
      <H3>Inputs</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>path</Code> — string, required.
        </li>
        <li>
          <Code>search</Code> — string, required. Literal (no regex).
        </li>
        <li>
          <Code>replace</Code> — string, required. Empty string deletes the match.
        </li>
      </ul>
      <H3>Failure modes</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>search</Code> not found → error, no changes written.
        </li>
        <li>
          <Code>search</Code> matches multiple times → error, no changes written. The LLM must
          narrow the snippet.
        </li>
      </ul>

      <H2 id="search_files">search_files</H2>
      <P>
        Globby-powered pattern search. Respects <Code>.gitignore</Code> and hidden-file rules.
      </P>
      <CodeBlock>{`[search_files] {"pattern":"**/*.ts","cwd":"src/"}`}</CodeBlock>
      <H3>Inputs</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>pattern</Code> — string, required. Standard glob syntax.
        </li>
        <li>
          <Code>cwd</Code> — string, default project root.
        </li>
        <li>
          <Code>ignore</Code> — string[], additional ignore globs.
        </li>
      </ul>
      <P>Returns up to 200 matches. Anything beyond that is truncated with a count.</P>

      <H2 id="list_dir">list_dir</H2>
      <P>
        List a directory with type indicators (📁 dir, 📄 file). Hidden entries excluded by default.
      </P>
      <CodeBlock>{`[list_dir] {"path":"src/components"}`}</CodeBlock>
      <H3>Inputs</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>path</Code> — string, required.
        </li>
        <li>
          <Code>depth</Code> — number, default <Code>1</Code>. Max <Code>3</Code>.
        </li>
      </ul>

      <H2 id="run_command">run_command</H2>
      <P>
        Run a shell command and capture stdout/stderr. Output truncated at 10K chars; default
        30&nbsp;s timeout.
      </P>
      <CodeBlock>{`[run_command] {"cmd":"npm test"}`}</CodeBlock>
      <H3>Inputs</H3>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          <Code>cmd</Code> — string, required.
        </li>
        <li>
          <Code>cwd</Code> — string, default project root.
        </li>
        <li>
          <Code>timeoutMs</Code> — number, default <Code>30000</Code>, max <Code>120000</Code>.
        </li>
      </ul>
      <Callout kind="warn">
        With <Code>confirmDestructive: true</Code> (default), <strong>every</strong>{" "}
        <Code>run_command</Code>
        call prompts you with the exact command before executing. You can approve once or for the
        whole session.
      </Callout>

      <H2 id="safety">Safety and path rules</H2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1.5">
        <li>
          <strong>Path traversal blocked</strong> — every <Code>path</Code> input is resolved with{" "}
          <Code>path.resolve(projectRoot, input)</Code> and rejected if the result escapes the
          project root.
        </li>
        <li>
          <strong>Symlink escape blocked</strong> — symlinks are followed and re-checked against the
          root.
        </li>
        <li>
          <strong>Read cap</strong> — 50&nbsp;KB per <Code>read_file</Code> call.
        </li>
        <li>
          <strong>Output cap</strong> — 10K chars per tool result (truncation noted in output).
        </li>
        <li>
          <strong>Shell gating</strong> — <Code>run_command</Code> requires explicit confirmation
          when <Code>confirmDestructive</Code> is on.
        </li>
        <li>
          <strong>.gitignore respected</strong> — <Code>search_files</Code> and{" "}
          <Code>list_dir</Code> skip ignored paths.
        </li>
        <li>
          <strong>Hidden files hidden</strong> — entries beginning with <Code>.</Code> are excluded
          from search and list output by default.
        </li>
        <li>
          <strong>No network tool</strong> — there is no built-in tool that performs arbitrary HTTP
          requests.
        </li>
      </ul>

      <H2>Disabling confirmations</H2>
      <P>
        Power users can flip <Code>confirmDestructive: false</Code> in config. Do this only for
        sandboxes or CI — once off, every <Code>write_file</Code>, <Code>edit_file</Code>, and{" "}
        <Code>run_command</Code> executes immediately.
      </P>
    </DocPage>
  ),
});
