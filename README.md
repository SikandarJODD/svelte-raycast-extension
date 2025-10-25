# Svelte Extension for Raycast

A comprehensive Raycast extension for Svelte and SvelteKit developers, providing quick access to documentation and an interactive CLI command builder.

## Features

### 🔍 Search Docs
Browse and search through 80+ Svelte and SvelteKit documentation links with:
- **Category Filtering**: Filter by Introduction, Runes, Template Syntax, Styling, Special Elements, Runtime, SvelteKit, and more
- **Full-text Search**: Quickly find the documentation you need
- **Custom Icons**: Beautiful icons for better visual navigation
- **Direct Links**: Open documentation pages directly in your browser

### 🛠️ CLI Builder
Interactive command builder for Svelte CLI (`sv`) with real-time preview:

#### `sv create` - Create New Projects
Build your `sv create` command with options for:
- **Templates**: minimal, demo, library
- **TypeScript**: ts, jsdoc, or no types
- **Package Managers**: npm, pnpm, yarn, bun, deno
- **Installation**: Skip installation if needed
- **Add-ons**: Skip add-ons prompt

**Example Generated Commands:**
```bash
npx sv create my-app --template minimal --types ts --install pnpm
npx sv create my-library --template library --no-types --no-install
```

#### `sv add` - Add Integrations
Select from multiple add-ons to add to your existing project:
- tailwindcss
- drizzle
- lucia
- mdsvex
- paraglide
- playwright
- vitest
- prettier
- eslint
- storybook
- sveltekit-adapter
- mcp
- devtools-json

**Example Generated Commands:**
```bash
npx sv add tailwindcss vitest prettier eslint
npx sv add drizzle lucia playwright
```

### ⚡ Quick Actions
- **Copy Command**: Press Enter or Cmd+Enter to copy the generated command
- **Copy & Paste to Terminal**: Cmd+Shift+Enter to copy and paste directly
- **Open CLI Docs**: Cmd+D to view official Svelte CLI documentation

## Installation

### From Raycast Store (Recommended)
1. Open Raycast
2. Search for "Svelte"
3. Click "Install"

### Manual Installation
1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. The extension will be available in Raycast

## Usage

### Search Documentation
1. Open Raycast
2. Type "Search Docs" or "Svelte"
3. Browse or search for documentation
4. Press Enter to open in browser

### Build CLI Commands
1. Open Raycast
2. Type "CLI Builder" or "Svelte CLI"
3. Select your options using the form
4. See the command update in real-time
5. Press Enter to copy the command
6. Paste in your terminal and run!

## Development

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint

# Build extension
npm run build

# Publish to Raycast Store
npm run publish
```

## Requirements

- Raycast (macOS only)
- Node.js 16+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

sikandar_bhide

## Links

- [Svelte Documentation](https://svelte.dev/docs)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte CLI Documentation](https://svelte.dev/docs/cli/overview)
- [Raycast Extension Documentation](https://developers.raycast.com/)

