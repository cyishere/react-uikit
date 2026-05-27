import type { DocsCategory, DocsMetadata } from '../content.config';

export interface Docs {
  id: string;
  data: DocsMetadata;
  body: string; // the body of Markdown file
  filePath: string;
  digest: string;
  deferredRender: boolean;
  collection: 'docs';
}

export interface DocsForNav {
  id: string;
  title: string;
  navTitle?: string;
  category: DocsCategory;
  order?: number;
}
