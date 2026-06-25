# react-uikit docs

The documentation site for [`@cyishere/react-uikit`](../../packages/react-uikit), built with [Astro](https://astro.build) and React islands. Content is authored as MDX, and every component page renders live, interactive demos powered by the actual library.

Production site: https://react-uikit.cyishere.dev

## Running locally

This app lives in a pnpm workspace and imports from the local `@cyishere/react-uikit` package, so the library must be built before the docs can resolve those imports. Run commands from the **repository root**:

```bash
# Install all workspace dependencies
pnpm install

# Build the library, then start the docs dev server (plus the lib/styles watchers)
pnpm dev
```

`pnpm dev` runs the library build watcher, the styles watcher, and the Astro dev server (http://localhost:4321) concurrently, so library changes are reflected live in the docs.

To run only the docs dev server (assumes the library is already built):

```bash
pnpm dev:docs
```

## Building

From the repository root:

```bash
# Builds the library first, then the static docs site into apps/docs/dist
pnpm build:docs
```

## Commands

These scripts are defined in this package and run from `apps/docs` (or via `pnpm --filter docs <script>` from the root):

| Command        | Action                                              |
| :------------- | :-------------------------------------------------- |
| `pnpm dev`     | Start the Astro dev server at `localhost:4321`      |
| `pnpm build`   | Build the static site to `./dist/`                  |
| `pnpm preview` | Preview the production build locally                |
| `pnpm check`   | Run `astro check` (content, types, and diagnostics) |

Note: `pnpm build` here builds only the Astro site. It assumes the library's `dist/` already exists. Use `pnpm build:docs` from the root for a clean, from-scratch build.

## Project structure

```text
apps/docs/
├── src/
│   ├── content/              # Documentation content (the `docs` collection)
│   │   ├── introduction/
│   │   │   └── index.mdx
│   │   ├── accordion/
│   │   │   ├── index.mdx     # Page body
│   │   │   └── components/   # Per-page demo sources
│   │   │       ├── BasicUsage.tsx    # Live, interactive React island
│   │   │       └── BasicUsage.astro  # The same demo rendered as a code snippet
│   │   └── ...               # One directory per documented component / guide
│   ├── components/           # Site UI (nav, copy button, demo preview, etc.)
│   ├── layouts/              # Page layouts
│   ├── pages/
│   │   └── [...slug].astro   # Generates a route for every content entry
│   ├── styles/               # Global styles and theme
│   └── utils/                # Slug, content, and code helpers
├── content.config.ts         # `docs` collection loader and frontmatter schema
└── astro.config.mjs          # Astro config (site URL, MDX, React, Shiki)
```

### How pages are generated

`content.config.ts` defines a single `docs` collection that globs every `*.md`/`*.mdx` file under `src/content`. `src/pages/[...slug].astro` then renders one route per entry, deriving each slug from the file path (for example, `src/content/accordion/index.mdx` becomes `/accordion`).

### Frontmatter

Each content file is validated against the schema in `content.config.ts`:

| Field         | Required | Purpose                                          |
| :------------ | :------- | :----------------------------------------------- |
| `title`       | Yes      | Page title                                       |
| `category`    | Yes      | `getting_started` or `components` (nav grouping)  |
| `navTitle`    | No       | Short label for the sidebar                       |
| `tagline`     | No       | Short subtitle shown under the title              |
| `description` | No       | Meta description                                  |
| `order`       | No       | Sort order within a nav category                  |

## Adding a component page

1. Create `src/content/<name>/index.mdx` with valid frontmatter (set `category: components`).
2. Add demos under `src/content/<name>/components/`. Author the live example as a `.tsx` island and a matching `.astro` file to display its source as a copyable code block.
3. Import the demos in `index.mdx` and document the component's props and usage.
4. Add a row for the component to the [Component Ownership Matrix](./src/content/component-ownership/index.mdx).

## Deployment

The site deploys to Netlify from the repository root. The build configuration lives in [`netlify.toml`](../../netlify.toml): it runs `pnpm build:docs` and publishes `apps/docs/dist`. The canonical URL is set via the `site` option in `astro.config.mjs`.
