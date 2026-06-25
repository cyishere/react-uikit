# react-uikit

> Package name is `@cyishere/react-uikit`.

`react-uikit` is an SSR-safe React integration layer for the [**UIkit** framework](https://getuikit.com). This repository is the monorepo that contains the library itself, its documentation site, and the shared tooling that builds and tests them.

- Library details and usage: [`packages/react-uikit/README.md`](/packages/react-uikit/README.md)
- Documentation site: [react-uikit.cyishere.dev](https://react-uikit.cyishere.dev)

---

## Repository Architecture

This repository is organized as a **pnpm workspace** monorepo:

```text
react-uikit-workspace/
├── apps/
│   └── docs/                  # Astro documentation site with React islands
├── packages/
│   └── react-uikit/           # Core library package (React + TypeScript)
├── package.json               # Root workspace metadata & development scripts
└── tsconfig.base.json         # Shared base TypeScript configuration
```

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **pnpm** (v11+) installed.

### Installation

Clone the repository and install dependencies at the workspace root:

```bash
# Clone the repository
git clone https://github.com/cyishere/react-uikit.git
cd react-uikit

# Install dependencies across all workspace projects
pnpm install
```

### Development

Start the local development environments (library build watcher, styles watcher, and the Astro docs site) together:

```bash
pnpm dev
```

The docs site runs at `http://localhost:4321` and reflects library changes live.

### Available Scripts

All scripts run from the root of the workspace using `pnpm`:

| Script            | Description                                                    |
| :---------------- | :------------------------------------------------------------- |
| `pnpm dev`        | Run the library watcher, styles watcher, and docs server.      |
| `pnpm dev:lib`    | Watch and rebuild the library on save.                         |
| `pnpm dev:docs`   | Start the Astro dev server for the docs site only.             |
| `pnpm build`      | Build the production bundle of the library (ESM + CJS + d.ts). |
| `pnpm build:docs` | Build the library, then the static docs site.                  |
| `pnpm test`       | Run the library test suite in watch mode.                      |
| `pnpm test:run`   | Run the library test suite once.                               |
| `pnpm check`      | Run linting, Astro checks, and type checking.                  |

## Packages

| Package                                          | Description                                                                         |
| :----------------------------------------------- | :---------------------------------------------------------------------------------- |
| [`@cyishere/react-uikit`](/packages/react-uikit) | The publishable React component library. See its README for installation and usage. |
| [`docs`](/apps/docs)                             | The Astro documentation site (private, not published).                              |

## Contributing

Contributions are welcome. Before opening a Pull Request:

1. Document any new component or prop in the docs site (`apps/docs`).
2. Update the [Component Ownership Matrix](./apps/docs/src/content/component-ownership/index.mdx).
3. Run `pnpm check` to confirm there are no formatting, type, or lint issues.

## License

This project is licensed under the [ISC License](./LICENSE).
