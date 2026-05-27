import type { Docs, DocsForNav } from '@/utils/types';

import { getCollection } from 'astro:content';
import type { DocsCategory } from '../content.config';

export const getAllDocs = async () => {
  return ((await getCollection('docs')) as Docs[]).sort((a, b) => {
    if (a.data.order && b.data.order) {
      return a.data.order - b.data.order;
    }
    if (a.data.order) return -1;
    if (b.data.order) return 1;
    return a.data.title.localeCompare(b.data.title);
  });
};

export const getDocsForNav = async (): Promise<DocsForNav[]> => {
  const docs = (await getCollection('docs')) as Docs[];

  return docs.map((d) => ({
    id: d.id,
    title: d.data.title,
    navTitle: d.data.navTitle,
    category: d.data.category,
    order: d.data.order
  }));
};

export const getDocsForNavByCategory = (docs: DocsForNav[], category: DocsCategory) => {
  return docs
    .filter((d) => d.category === category)
    .map((d) => ({
      label: d.navTitle || d.title,
      slug: d.id
    }));
};
