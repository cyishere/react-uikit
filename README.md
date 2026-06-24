# ⚛️ react-uikit

> A premium, highly performant, and SSR-safe React integration layer for the **UIkit CSS** framework.

`react-uikit` bridges the gap between React's declarative state model and UIkit's gorgeous, modern aesthetic. Unlike naive wrappers that imperatively mutate the DOM or break Server-Side Rendering (SSR), `react-uikit` is built from the ground up to respect React's virtual DOM, provide robust accessibility out of the box, and support smooth hydration.

---

## 🚀 Key Features

- 🎨 **Pure UIkit CSS Visuals:** Uses UIkit CSS classes as the authoritative visual styling layer.
- ⚡ **SSR-Safe by Default:** No module-level window or document references. Works seamlessly in frameworks like Next.js and Remix without hydration mismatches.
- 🤖 **Declarative React Ownership:** Interactive components (e.g., `OffCanvas`, `Switcher`, `Accordion`) are fully rewritten in React. React controls state, focus management, and event loops, ensuring no double-ownership conflict with UIkit JS.
- 🧹 **Automated Lifecycle & Cleanup:** JS-enhanced components (like `Alert`) initialize UIkit JS safely after mount and clean up on unmount.
- ♿ **Accessibility First:** Integrated WAI-ARIA patterns, ARIA attributes, and automatic keyboard/focus management (like focus trapping for overlays).
- 📦 **Modern Workspace:** Configured as a pnpm monorepo with an Astro-powered documentation site featuring interactive React islands.

---

## 🛠️ Repository Architecture

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

---

## 📐 The Component Ownership Philosophy

A core tenet of `react-uikit` is **architectural discipline**. We classify components into three distinct ownership categories:

1.  **CSS-only Components:** Presentational elements (e.g., `Button`, `Badge`, `Label`, `Card`) are **intentionally excluded** from this library. Creating React wrappers for purely visual CSS classes adds zero value and bloats bundles. The docs provide clear copy-paste-ready JSX snippets for these.
2.  **UIkit JS-Enhanced Components:** Components that delegate behavior to UIkit JS (e.g., `Alert`, `OffCanvas`) are rendered in React, with UIkit JS initialized and cleaned up safely inside client-side effect lifecycles. Where needed, React layers concerns like focus trapping and scroll locking on top (as `OffCanvas` does).
3.  **React-Owned Components:** Interactive widgets (e.g., `Switcher`, `Accordion`) are **fully implemented in React**. UIkit's JS never touches these nodes. React handles open/close state and standard keyboard/aria events.

For a detailed, granular breakdown of every component, check the [Component Ownership Matrix](./apps/docs/src/content/component-ownership/index.mdx).

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **pnpm** (v10+) installed.

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

To start the local development environments (both the library build watcher and the Astro docs site simultaneously):

```bash
pnpm dev
```

This will run:

1.  **Library Builder:** `tsup --watch` to rebuild the library on any change inside `packages/react-uikit`.
2.  **Docs Server:** Astro dev server running at `http://localhost:4321` to view live documentation, components, and interactive examples.

---

## 💻 Available Scripts

All scripts can be run from the root of the workspace using `pnpm`:

| Script           | Command                                          | Description                                                           |
| :--------------- | :----------------------------------------------- | :-------------------------------------------------------------------- |
| `pnpm dev`       | `concurrently ...`                               | Starts library watcher and Astro dev server concurrently.             |
| `pnpm dev:lib`   | `pnpm --filter react-uikit dev`                  | Watches library and builds on save (`tsup --watch`).                  |
| `pnpm dev:docs`  | `pnpm --filter docs dev`                         | Starts local Astro dev server for the docs site.                      |
| `pnpm build`     | `pnpm --filter react-uikit build`                | Builds the production bundle of the library (`ESM` + `CJS` + `D.TS`). |
| `pnpm test`      | `pnpm --filter react-uikit test`                 | Runs the Vitest test suite in interactive/watch mode.                 |
| `pnpm test:run`  | `pnpm --filter react-uikit test:run`             | Runs the Vitest test suite once (CI pipeline).                        |
| `pnpm check`     | `pnpm lint && pnpm docs:check && pnpm typecheck` | Comprehensive validation (linting, Astro checking, typechecking).     |
| `pnpm lint`      | `pnpm format && eslint .`                        | Formats all code with Prettier and runs ESLint.                       |
| `pnpm typecheck` | `pnpm --filter react-uikit typecheck ...`        | Runs TypeScript compilation checking across all packages.             |

---

## 📦 Library Usage

To use `react-uikit` components in your React application:

1.  **Install the library and peer dependencies:**
    ```bash
    npm install react-uikit uikit
    ```
2.  **Import the required CSS** in your application's root entry file (e.g., `main.tsx` or `_app.tsx`):
    ```typescript
    import 'uikit/dist/css/uikit.min.css';
    import 'react-uikit/styles.css'; // required for Switcher, Accordion, and other components with custom styles
    ```
3.  **Import and use components:**

    ```tsx
    import React from 'react';
    import { Alert, Accordion } from 'react-uikit';

    export default function App() {
      return (
        <div className="uk-container uk-margin-top">
          <Alert className="uk-alert-success">Welcome to the modern UIkit React integration!</Alert>

          <Accordion.Root showIcon>
            <Accordion.Item>
              <Accordion.Trigger>What is react-uikit?</Accordion.Trigger>
              <Accordion.Panel>
                It is a lightweight, SSR-safe React wrapper around UIkit CSS.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      );
    }
    ```

---

## 🧪 Testing Strategy

Our testing hierarchy guarantees high stability and reliability:

1.  **Unit & Integration Tests (Vitest + React Testing Library):** Located inside `packages/react-uikit/src/components/**/*.test.tsx`. Tests verify render cycles, state changes, accessibility attributes, and keyboard listeners.
2.  **End-to-End Tests (Playwright):** Verify full focus-trapping behavior, SSR rendering consistency, and complex hydration dynamics in browser environments.

Run unit tests locally with:

```bash
pnpm test
```

---

## 🤝 Contributing

Contributions are highly welcome! To ensure consistency across the library, please adhere to the following guidelines:

1.  **Maintain Documentation:** When adding a new component or prop, ensure you document it in the Astro docs site (`apps/docs`).
2.  **Update the Component Matrix:** Fill in all relevant columns inside the [Component Ownership Matrix](./apps/docs/src/content/component-ownership/index.mdx) for any new component before submitting your Pull Request.
3.  **Strict Linting:** Run `pnpm check` before pushing your commits to guarantee there are no formatting, type, or lint issues.

---

## 📄 License

This project is licensed under the [ISC License](./LICENSE).
