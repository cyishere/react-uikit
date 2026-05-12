export function extractComponentCode(rawCode: string, componentName: string = 'Accordion.Root'): string {
  // Escape the component name to be used in regex
  const tag = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const regex = new RegExp(`( *)<${tag}[\\s\\S]*<\\/${tag}>`);
  const match = rawCode.match(regex);
  
  if (match) {
    const leadingSpaces = match[1];
    return match[0].replace(new RegExp('\\n' + leadingSpaces, 'g'), '\n').trim();
  }
  
  return rawCode;
}
