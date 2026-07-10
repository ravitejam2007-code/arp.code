import { createFileRoute } from "@tanstack/react-router";
import { DocPage, H2, H3, P, Code, CodeBlock, Callout } from "@/components/Doc";

export const Route = createFileRoute("/docs/install")({
  head: () => ({
    meta: [
      { title: "Install — ARPCODE Docs" },
      {
        name: "description",
        content:
          "Install ARPCODE on macOS, Windows, and Linux. Step-by-step Node.js setup, package manager commands, PATH troubleshooting.",
      },
      { property: "og:url", content: "/docs/install" },
    ],
    links: [{ rel: "canonical", href: "/docs/install" }],
  }),
  component: () => (
    <DocPage
      eyebrow="docs / install"
      title="Install ARPCODE"
      lead="A complete, platform-by-platform install guide. Pick your OS, install Node.js 20+, then a single npm command gets you the CLI."
    >
      <H2>Requirements</H2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
        <li>
          Node.js <strong className="text-foreground">≥ 20.0.0</strong> (ESM runtime)
        </li>
        <li>
          A truecolor-capable terminal (iTerm2, WezTerm, Alacritty, Kitty, Windows Terminal 1.18+,
          GNOME Terminal)
        </li>
        <li>
          ~10&nbsp;MB disk for the CLI itself, plus ~80&nbsp;MB for the global{" "}
          <Code>node_modules</Code>
        </li>
        <li>Internet access (cloud providers) or a local Ollama install (offline mode)</li>
      </ul>

      <H2 id="macos">macOS</H2>
      <H3>1. Install Node.js</H3>
      <P>
        Recommended: install via <Code>nvm</Code> so you can switch versions later.
      </P>
      <CodeBlock lang="bash">{`# Install nvm (skip if you already have it)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc

# Install Node 20 LTS
nvm install 20
nvm use 20
node --version   # v20.x.x`}</CodeBlock>
      <P>
        Prefer Homebrew? <Code>brew install node@20</Code> works too.
      </P>

      <H3>2. Install ARPCODE</H3>
      <CodeBlock lang="bash">{`npm install -g arp-code`}</CodeBlock>

      <H3>3. Run</H3>
      <CodeBlock lang="bash">{`cd ~/projects/myapp
arpcode`}</CodeBlock>

      <Callout>
        On macOS with nvm, global npm packages install under your nvm Node prefix — no{" "}
        <Code>sudo</Code> needed.
      </Callout>

      <H2 id="windows">Windows</H2>
      <P>Works natively on Windows 10/11 with PowerShell, or inside WSL 2.</P>

      <H3>Option A — Native (PowerShell)</H3>
      <CodeBlock lang="powershell">{`# 1. Install Node.js 20 LTS via winget
winget install OpenJS.NodeJS.LTS

# 2. Restart your terminal, then verify
node --version
npm  --version

# 3. Install ARPCODE
npm install -g arp-code

# 4. Run
cd C:\\Users\\you\\projects\\myapp
arpcode`}</CodeBlock>

      <H3>Option B — WSL 2 (recommended)</H3>
      <CodeBlock lang="bash">{`# Inside Ubuntu on WSL
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g arp-code`}</CodeBlock>

      <Callout kind="warn">
        Use <strong>Windows Terminal 1.18+</strong> for proper truecolor and Unicode rendering. The
        legacy
        <Code>cmd.exe</Code> console will display ARPCODE but with degraded colors.
      </Callout>

      <H2 id="linux">Linux</H2>

      <H3>Debian / Ubuntu</H3>
      <CodeBlock lang="bash">{`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g arp-code`}</CodeBlock>

      <H3>Fedora / RHEL</H3>
      <CodeBlock lang="bash">{`curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
npm install -g arp-code`}</CodeBlock>

      <H3>Arch</H3>
      <CodeBlock lang="bash">{`sudo pacman -S nodejs-lts-iron npm
npm install -g arp-code`}</CodeBlock>

      <H3>Avoid sudo for global installs</H3>
      <P>
        Configure npm to use a user-owned prefix so <Code>npm install -g</Code> never needs root.
      </P>
      <CodeBlock lang="bash">{`mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g arp-code`}</CodeBlock>

      <H2>All platforms — alternative package managers</H2>
      <CodeBlock lang="bash">{`pnpm add -g arp-code
bun  add -g arp-code
yarn global add arp-code`}</CodeBlock>
      <P>
        All four install the same two binaries: <Code>arp-code</Code> and the shorter alias{" "}
        <Code>arpcode</Code>.
      </P>

      <H2>Verify the install</H2>
      <CodeBlock lang="bash">{`arpcode --version
# arp-code 1.0.1

arpcode --help
# Lists all flags and subcommands`}</CodeBlock>

      <H2>First run</H2>
      <P>
        The first launch opens a 4-step onboarding wizard: pick a default provider, paste an API key
        (or skip for Ollama), choose a theme, and you're in. Config is written to{" "}
        <Code>~/.arp-code/config.json</Code>.
      </P>
      <Callout>
        Prefer running locally? Install{" "}
        <a href="https://ollama.ai" className="text-primary underline-offset-4 hover:underline">
          Ollama
        </a>{" "}
        first — ARPCODE auto-discovers a server on <Code>http://127.0.0.1:11434</Code> and skips the
        API-key step entirely.
      </Callout>

      <H2>Troubleshooting</H2>
      <H3>`arpcode: command not found`</H3>
      <P>
        Your shell's <Code>PATH</Code> doesn't include npm's global bin directory. Run:
      </P>
      <CodeBlock lang="bash">{`npm config get prefix
# macOS/Linux: append <prefix>/bin to PATH
# Windows:     append <prefix>     (it contains arpcode.cmd)`}</CodeBlock>

      <H3>`EACCES` permission errors on Linux/macOS</H3>
      <P>See the "Avoid sudo" snippet above, or use nvm.</P>

      <H3>Garbled box-drawing characters</H3>
      <P>
        Switch to a terminal that supports truecolor and UTF-8 (Windows Terminal 1.18+, iTerm2,
        WezTerm, Alacritty).
      </P>

      <H2>Uninstall</H2>
      <CodeBlock lang="bash">{`npm uninstall -g arp-code
rm -rf ~/.arp-code   # remove config, sessions, AGENTS cache`}</CodeBlock>
    </DocPage>
  ),
});
