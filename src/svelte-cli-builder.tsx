import { Form, ActionPanel, Action, showToast, Toast, Clipboard, Icon } from "@raycast/api";
import { useState, useEffect } from "react";

type CommandType = "create" | "add";

export default function Command() {
  const [commandType, setCommandType] = useState<CommandType>("create");
  const [generatedCommand, setGeneratedCommand] = useState<string>("");

  // sv create options
  const [projectPath, setProjectPath] = useState<string>("my-app");
  const [template, setTemplate] = useState<string>("minimal");
  const [types, setTypes] = useState<string>("ts");
  const [packageManager, setPackageManager] = useState<string>("npm");
  const [skipInstall, setSkipInstall] = useState<boolean>(false);
  const [skipAddons, setSkipAddons] = useState<boolean>(false);

  // sv add options
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Generate command whenever options change
  useEffect(() => {
    let command = "npx sv ";

    if (commandType === "create") {
      command += "create";

      // Add project path FIRST (required)
      command += ` ${projectPath}`;

      // Add template option (always show)
      command += ` --template ${template}`;

      // Add types option
      if (types === "none") {
        command += " --no-types";
      } else if (types === "ts") {
        command += " --types ts";
      } else if (types === "jsdoc") {
        command += " --types jsdoc";
      }

      // Add package manager option
      if (packageManager !== "npm") {
        command += ` --install ${packageManager}`;
      }

      // Add no-install flag
      if (skipInstall) {
        command += " --no-install";
      }

      // Add no-add-ons flag
      if (skipAddons) {
        command += " --no-add-ons";
      }
    } else {
      // sv add command
      command += "add";

      // Add space-separated add-ons
      if (selectedAddons.length > 0) {
        command += ` ${selectedAddons.join(" ")}`;
      }
    }

    setGeneratedCommand(command);
  }, [commandType, projectPath, template, types, packageManager, skipInstall, skipAddons, selectedAddons]);

  async function handleCopyCommand() {
    await Clipboard.copy(generatedCommand);
    await showToast({
      style: Toast.Style.Success,
      title: "Command copied!",
      message: "Paste it in your terminal",
    });
  }

  async function handleCopyAndPaste() {
    await Clipboard.paste(generatedCommand);
    await showToast({
      style: Toast.Style.Success,
      title: "Command pasted!",
      message: "Check your terminal",
    });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action title="Copy Command" icon={Icon.Clipboard} onAction={handleCopyCommand} />
          <Action
            title="Copy & Paste to Terminal"
            icon={Icon.Terminal}
            onAction={handleCopyAndPaste}
            shortcut={{ modifiers: ["cmd", "shift"], key: "enter" }}
          />
          <Action.OpenInBrowser
            title="Open CLI Docs"
            url="https://svelte.dev/docs/cli/overview"
            shortcut={{ modifiers: ["cmd"], key: "d" }}
          />
        </ActionPanel>
      }
    >
      {/* Live Preview */}
      <Form.Description title="Generated Command" text={generatedCommand} />

      <Form.Separator />

      {/* Command Type Selection */}
      <Form.Dropdown
        id="commandType"
        title="Command Type"
        value={commandType}
        onChange={(value) => setCommandType(value as CommandType)}
      >
        <Form.Dropdown.Item value="create" title="sv create - Create new project" icon={Icon.Plus} />
        <Form.Dropdown.Item value="add" title="sv add - Add integrations" icon={Icon.Box} />
      </Form.Dropdown>

      <Form.Separator />

      {/* sv create options */}
      {commandType === "create" && (
        <>
          <Form.TextField
            id="projectPath"
            title="Project Name"
            placeholder="my-app"
            value={projectPath}
            onChange={setProjectPath}
            info="Name of your project directory"
          />

          <Form.Dropdown
            id="template"
            title="Template"
            value={template}
            onChange={setTemplate}
            info="Choose your project template"
          >
            <Form.Dropdown.Item value="minimal" title="Minimal - Barebones scaffolding" icon={Icon.Document} />
            <Form.Dropdown.Item value="demo" title="Demo - Showcase app with examples" icon={Icon.AppWindowList} />
            <Form.Dropdown.Item value="library" title="Library - Svelte library template" icon={Icon.Box} />
          </Form.Dropdown>

          <Form.Dropdown
            id="types"
            title="TypeScript"
            value={types}
            onChange={setTypes}
            info="How to add type checking"
          >
            <Form.Dropdown.Item value="ts" title="TypeScript - .ts files & lang='ts'" icon={Icon.Code} />
            <Form.Dropdown.Item value="jsdoc" title="JSDoc - Type annotations in comments" icon={Icon.Text} />
            <Form.Dropdown.Item
              value="none"
              title="None - No type checking (not recommended)"
              icon={Icon.XMarkCircle}
            />
          </Form.Dropdown>

          <Form.Dropdown
            id="packageManager"
            title="Package Manager"
            value={packageManager}
            onChange={setPackageManager}
            info="Which package manager to use"
          >
            <Form.Dropdown.Item value="npm" title="npm" icon={Icon.Box} />
            <Form.Dropdown.Item value="pnpm" title="pnpm" icon={Icon.Box} />
            <Form.Dropdown.Item value="yarn" title="yarn" icon={Icon.Box} />
            <Form.Dropdown.Item value="bun" title="bun" icon={Icon.Bolt} />
            <Form.Dropdown.Item value="deno" title="deno" icon={Icon.Bolt} />
          </Form.Dropdown>

          <Form.Checkbox
            id="skipInstall"
            label="Skip dependency installation"
            value={skipInstall}
            onChange={setSkipInstall}
            info="Don't install dependencies after creating project"
          />

          <Form.Checkbox
            id="skipAddons"
            label="Skip add-ons prompt"
            value={skipAddons}
            onChange={setSkipAddons}
            info="Don't show the interactive add-ons selection during project creation"
          />
        </>
      )}

      {/* sv add options */}
      {commandType === "add" && (
        <>
          <Form.Description title="Select Add-ons" text="Choose one or more integrations to add to your project" />

          <Form.TagPicker
            id="addons"
            title="Add-ons"
            value={selectedAddons}
            onChange={setSelectedAddons}
            placeholder="Select add-ons..."
          >
            <Form.TagPicker.Item value="tailwindcss" title="Tailwind CSS" icon={Icon.Brush} />
            <Form.TagPicker.Item value="drizzle" title="Drizzle ORM" icon={Icon.Coin} />
            <Form.TagPicker.Item value="lucia" title="Lucia Auth" icon={Icon.Lock} />
            <Form.TagPicker.Item value="mdsvex" title="MDsveX (Markdown)" icon={Icon.Document} />
            <Form.TagPicker.Item value="paraglide" title="Paraglide (i18n)" icon={Icon.Globe} />
            <Form.TagPicker.Item value="playwright" title="Playwright (E2E)" icon={Icon.Bug} />
            <Form.TagPicker.Item value="vitest" title="Vitest (Unit Tests)" icon={Icon.CheckCircle} />
            <Form.TagPicker.Item value="prettier" title="Prettier" icon={Icon.Stars} />
            <Form.TagPicker.Item value="eslint" title="ESLint" icon={Icon.Warning} />
            <Form.TagPicker.Item value="storybook" title="Storybook" icon={Icon.Book} />
            <Form.TagPicker.Item value="sveltekit-adapter" title="SvelteKit Adapter" icon={Icon.Plug} />
            <Form.TagPicker.Item value="mcp" title="MCP Server" icon={Icon.Network} />
            <Form.TagPicker.Item value="devtools-json" title="Devtools JSON" icon={Icon.Gear} />
          </Form.TagPicker>

          <Form.Description
            title="💡 Tip"
            text="You can select multiple add-ons. They will be added to your command separated by spaces."
          />
        </>
      )}

      {/* Copy Button at the end */}
      <Form.Separator />
      <Form.Description
        title="✨ Ready to Copy?"
        text="Press Enter or Cmd+Enter to copy the command to your clipboard!"
      />
    </Form>
  );
}
