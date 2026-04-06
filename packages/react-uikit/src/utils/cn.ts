/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx for UIkit class composition.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
