/**
 * Icon registry mapping UIkit icon names to raw SVG markup strings.
 *
 * Sourced from UIkit's `src/images/icons/` directory. SVG content
 * keeps the original `#000` fill/stroke values — UIkit's CSS
 * automatically replaces them with `currentColor` via:
 *   .uk-icon [fill*="#"] { fill: currentcolor }
 *   .uk-icon [stroke*="#"] { stroke: currentcolor }
 *
 * Registry keys are the canonical UIkit icon names. Adding a new
 * entry automatically extends the `UIkitIconName` union type.
 */

const registry = {
  'arrow-up':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" x1="10" y1="16.53" x2="10" y2="4.53"/><polyline fill="none" stroke="#000" points="13.84 8 10 4.17 6.16 8"/></svg>',
  'arrow-down':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" x1="10" y1="3.48" x2="10" y2="15.48"/><polyline fill="none" stroke="#000" points="6.16 12 10 15.84 13.84 12"/></svg>',
  'arrow-left':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" x1="16.53" y1="10" x2="4.53" y2="10"/><polyline fill="none" stroke="#000" points="8 6.16 4.18 10 8 13.84"/></svg>',
  'arrow-right':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><line fill="none" stroke="#000" x1="3.47" y1="10" x2="15.47" y2="10"/><polyline fill="none" stroke="#000" points="11.98 13.84 15.82 10 11.98 6.16"/></svg>',
  'chevron-up':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"/></svg>',
  'chevron-down':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"/></svg>',
  'chevron-left':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4"/></svg>',
  'chevron-right':
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"/></svg>',
  check:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"/></svg>',
  close:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"/><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"/></svg>',
  minus:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect height="1" width="18" y="9" x="1"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="9" y="1" width="1" height="17"/><rect x="1" y="9" width="17" height="1"/></svg>',
  search:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',
  heart:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z"/></svg>',
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65"/><polygon points="15 4 18 4 18 7 17 7 17 5 15 5"/><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2"/></svg>',
  users:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5"/><path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"/><path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"/></svg>',
  folder:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5"/></svg>',
  file: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17"/></svg>',
  trash:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"/><polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"/><rect x="8" y="7" width="1" height="9"/><rect x="11" y="7" width="1" height="9"/><rect x="2" y="3" width="16" height="1"/></svg>',
  settings:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15"/><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15"/><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15"/><rect x="1" y="3" width="3" height="1"/><rect x="10" y="3" width="8" height="1"/><rect x="1" y="9" width="8" height="1"/><rect x="15" y="9" width="3" height="1"/><rect x="1" y="15" width="3" height="1"/><rect x="10" y="15" width="8" height="1"/></svg>',
  bolt: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5"/><path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z"/></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5"/><path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8"/></svg>',
  unlock:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10"/><path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9"/></svg>',
  camera:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8"/><path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z"/></svg>',
  comment:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="14" r="1"/><circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9"/><path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z"/></svg>',
  bookmark:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M2 4h16v1H2zM2 9h16v1H2zM2 14h16v1H2z"/></svg>'
} as const;

export type UIkitIconName = keyof typeof registry;

/**
 * Extracts the natural dimensions from an SVG string.
 *
 * Attempts to determine width and height in the following order:
 * 1. Parses the `viewBox` attribute (3rd and 4th values: width and height)
 * 2. Falls back to explicit `width` and `height` attributes
 * 3. If neither is found, warns and returns a default of 20x20
 *
 * @param svg - The raw SVG string to extract dimensions from
 * @returns An object containing `naturalWidth` and `naturalHeight` as numbers
 *
 * @example
 * const { naturalWidth, naturalHeight } = getSvgDimensions(
 *   '<svg viewBox="0 0 24 24">...</svg>'
 * );
 * // naturalWidth = 24, naturalHeight = 24
 */
export const getSvgDimensions = (svg: string): { naturalWidth: number; naturalHeight: number } => {
  const viewBoxMatch = svg.match(/viewBox="[^"]*\s+[^"]*\s+([0-9.]+)\s+([0-9.]+)"/);

  if (viewBoxMatch) {
    return {
      naturalWidth: parseFloat(viewBoxMatch[1]!),
      naturalHeight: parseFloat(viewBoxMatch[2]!)
    };
  }

  const widthMatch = svg.match(/width="([0-9.]+)"/);
  const heightMatch = svg.match(/height="([0-9.]+)"/);

  if (widthMatch && heightMatch) {
    return {
      naturalWidth: parseFloat(widthMatch[1]!),
      naturalHeight: parseFloat(heightMatch[1]!)
    };
  }

  console.warn(
    '[react-uikit] Icon SVG is missing both viewBox and width/height attributes. Falling back to 20x20.'
  );

  return {
    naturalWidth: 20,
    naturalHeight: 20
  };
};

/**
 * Retrieves an SVG icon by name and returns it scaled to the given ratio.
 *
 * The returned SVG is modified as follows:
 * - Existing `width` and `height` attributes are removed from the `<svg>` tag
 * - New `width` and `height` are set based on the icon's natural dimensions multiplied by `ratio`
 * - `aria-hidden="true"` is added, as icons are assumed to be decorative
 *
 * @param name - The name of the icon to retrieve from the registry
 * @param ratio - Scale factor applied to the icon's natural dimensions (default: `1`)
 * @returns The modified SVG string with updated dimensions
 *
 * @example
 * getIconSvg('arrow', 1);   // natural size, e.g. 20x20
 * getIconSvg('arrow', 1.5); // scaled up, e.g. 30x30
 * getIconSvg('arrow', 0.5); // scaled down, e.g. 10x10
 */
export const getIconSvg = (name: UIkitIconName, ratio = 1): string => {
  const rawSvg = registry[name];

  const { naturalWidth, naturalHeight } = getSvgDimensions(rawSvg);

  const scaledWidth = Math.round(naturalWidth * ratio);
  const scaledHeight = Math.round(naturalHeight * ratio);

  const svg = rawSvg.replace(/^<svg([^>]*)>/, (_, attrs) => {
    const cleaned = attrs.replace(/\s*width="[^"]*"/, '').replace(/\s*height="[^"]*"/, '');

    return `<svg${cleaned} width="${scaledWidth}" height="${scaledHeight}" aria-hidden="true">`;
  });

  return svg;
};
