export const extractComponentCode = (
  rawCode: string,
  componentName: string = 'Accordion.Root'
): string => {
  // Escape the component name to be used in regex
  const tag = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Matches the target component in either of two forms:
  //
  // Alternative 1 — paired open/close tags (handles nesting):
  //   ( *)          Capture group 1: leading spaces before the opening tag, used
  //                 below to strip indentation from the extracted block.
  //   <Tag          Literal opening tag name.
  //   [\s\S]*       Greedy wildcard — consumes everything including inner closing
  //                 tags of the same name, so nested components are captured in
  //                 full rather than stopping at the first inner </Tag>.
  //   <\/Tag>       Literal closing tag (the last one, thanks to greediness).
  //
  // Alternative 2 — self-closing tag:
  //   <Tag          Literal tag name.
  //   (?:\s[^>]*)?  Optional non-capturing group: one whitespace character followed
  //                 by any characters that are not ">", covering props such as
  //                 `large` or `large={true}`. The leading \s prevents matching
  //                 tags whose names merely start with the same prefix.
  //   \/\s*>        The self-closing sequence `/>`, with optional whitespace before
  //                 the `>` for tolerant matching.
  const regex = new RegExp(`( *)(?:<${tag}[\\s\\S]*<\\/${tag}>|<${tag}(?:\\s[^>]*)?\\/\\s*>)`);
  const match = rawCode.match(regex);

  if (match) {
    const leadingSpaces = match[1];
    return match[0].replace(new RegExp('\\n' + leadingSpaces, 'g'), '\n').trim();
  }

  return rawCode;
};
