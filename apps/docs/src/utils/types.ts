import type { DocsMetadata } from '../content.config';

export interface Docs {
  id: string;
  data: DocsMetadata;
  body: string; // the body of Markdown file
  filePath: string;
  digest: string;
  deferredRender: boolean;
  collection: 'docs';
}

export interface NavItem {
  slug: string;
  label: string;
}
