# Contributing

Thanks for your interest in improving `@cyishere/react-uikit`! This guide covers
local development and how releases are cut.

## Prerequisites

Ensure you have **Node.js** (v18+) and **pnpm** (v11+) installed, then install
dependencies at the workspace root:

```bash
pnpm install
```

## Development

Common scripts (run from the repository root):

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `pnpm dev`        | Run the library, styles, and docs site in watch mode |
| `pnpm build`      | Build the library package                            |
| `pnpm test:run`   | Run the unit tests once                              |
| `pnpm type-check` | Type-check the library                               |
| `pnpm check`      | Lint, check docs, and type-check (the full CI gate)  |

## Releasing

Releases are automated with [Changesets](https://github.com/changesets/changesets)
and published to npm from CI using
[OIDC trusted publishing](https://docs.npmjs.com/trusted-publishers) — no local
`npm publish` and no npm tokens.

### 1. Add a changeset with your change

In the same PR as your code change, describe the release:

```bash
pnpm changeset
```

Pick the bump type (**patch** / **minor** / **major**) following
[semver](https://semver.org), and write a short, user-facing changelog line. This
creates a markdown file under `.changeset/` — **commit it as part of your PR**.

Not every PR needs a changeset. Docs-only or internal changes that don't affect
published consumers can skip it.

### 2. Merge to `main`

When PRs containing changesets land on `main`, the **Release** workflow opens (and
keeps updating) a **"Version Packages"** PR that:

- bumps the version in `packages/react-uikit/package.json`, and
- updates `CHANGELOG.md` from the accumulated changesets.

### 3. Merge the "Version Packages" PR

Merging that PR triggers the workflow to build and publish the new version to npm
automatically, with provenance. Nothing to run locally.

### One-time infrastructure (already configured)

- **npm Trusted Publisher** is set for this package, pointing at the
  `cyishere/react-uikit` repo and the `release.yml` workflow.
- The repo allows **GitHub Actions to create pull requests**, so the workflow can
  open the "Version Packages" PR.
