# Component Ownership Matrix

This document tracks the implementation responsibilities for each component in the `react-uikit` library.

| Component | Styling   | Behavior | State | SSR  | Cleanup | Accessible Pattern |
| --------- | --------- | -------- | ----- | ---- | ------- | ------------------ |
| Close     | UIkit CSS | React    | React | Safe | None    | WAI-ARIA Close     |

## Column Definitions

- **Styling**: Who owns the visual styling (`UIkit CSS` = UIkit class utilities, `CSS-in-JS` = inline styles, `CSS Modules` = scoped stylesheets)
- **Behavior**: Who controls the interactivity (`UIkit JS` = JS-enhanced by UIkit, `React` = React-managed)
- **State**: Where component state lives (`UIkit JS` = internal to UIkit JS, `React` = managed via React hooks/props)
- **SSR**: Whether the component is safe to render on the server (`Safe` = works without JS, `Requires JS` = needs client hydration)
- **Cleanup**: Whether the component needs side-effect teardown (e.g., `useEffect` cleanup, event listener removal)
- **Accessible Pattern**: The accessibility strategy used (e.g., `WAI-ARIA Close`, `ARIA Expanded`, `ARIA Modal`)

## Rules

- No component ships without a row in this matrix.
- Update this file when adding or modifying components.
- Every column should be filled in before merging a component PR.
