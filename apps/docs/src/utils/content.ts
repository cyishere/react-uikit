import type { DocsCategory } from '../content.config';
import type { Docs, DocsForNav } from '@/utils/types';

import { getCollection } from 'astro:content';

export const getAllDocs = async () => {
  return (await getCollection('docs')) as Docs[];
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
  let fileterd = docs.filter((d) => d.category === category);

  if (category === 'getting_started') {
    fileterd = fileterd.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  return fileterd.map((d) => ({
    label: d.navTitle || d.title,
    slug: d.id === 'introduction' ? '' : d.id
  }));
};
