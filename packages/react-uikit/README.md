# @cyishere/react-uikit

A SSR-safe React integration layer for the [UIkit CSS](https://getuikit.com/) framework.

`@cyishere/react-uikit` bridges the gap between React's declarative state model and UIkit's modern aesthetic. It is built from the ground up to respect React's virtual DOM, provide accessibility, and support smooth hydration.

## Features

- **Pure UIkit CSS visuals** — uses UIkit CSS classes as the authoritative styling layer.
- **SSR-safe by default** — no module-level `window`/`document` access. Works in Next.js, Remix, and Astro without hydration mismatches.
- **Declarative React ownership** — interactive components like `Switcher` and `Accordion` are fully rewritten in React, so UIkit JS never touches their nodes. JS-enhanced components like `Alert` and `OffCanvas` wrap UIkit's own JS with safe mount/unmount lifecycles and add React-side focus trapping and scroll locking.
- **Accessibility first** — WAI-ARIA patterns, ARIA attributes, and automatic keyboard/focus management (including focus trapping for overlays).
- **Typed** — ships with full TypeScript definitions and dual ESM/CJS builds.

## Installation

Install the library together with its peer dependencies:

```bash
npm install @cyishere/react-uikit uikit react react-dom
```

Peer dependency requirements:

| Package     | Version   |
| :---------- | :-------- |
| `react`     | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `uikit`     | `^3.0.0`  |

## Styling

This package depends on UIkit's stock CSS being loaded by your app, and ships its own small stylesheet for the components that need custom styles (`Switcher`, `Accordion`, and others).

Import both stylesheets once, in your application's root entry file (e.g. `main.tsx`, `_app.tsx`, or a root layout):

```ts
import 'uikit/dist/css/uikit.min.css';
import '@cyishere/react-uikit/styles.css';
```

> **Important:** the stylesheet must be imported manually. This package is marked
> `"sideEffects": false` so bundlers can tree-shake unused JavaScript, which
> means CSS is **not** pulled in automatically when you import a component.
> Always add the `@cyishere/react-uikit/styles.css` import yourself.

### Using Less or Sass

If you compile your own styles, you can import the source partials instead of the prebuilt CSS so they participate in your UIkit theme:

```less
// Less
@import '@cyishere/react-uikit/less/index.less';
```

```scss
// Sass
@import '@cyishere/react-uikit/scss/index.scss';
```

## Usage

```tsx
import { Accordion, Alert } from '@cyishere/react-uikit';

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

## Components

The library focuses on components that genuinely benefit from React ownership.
Purely presentational UIkit classes (e.g. `Button`, `Card`, `Label`) are
intentionally left to plain JSX and are not wrapped here.

- `Accordion`
- `Alert`
- `Close`
- `Grid`
- `Icon`
- `OffCanvas`
- `Switcher`

A `cn` class-name utility is also exported.

## License

[ISC](./LICENSE) © Chen Yang
