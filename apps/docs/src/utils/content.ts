import type { DocsCategory } from '../content.config';
import type { Docs, NavItem } from '@/utils/types';

import { getCollection } from 'astro:content';

export const getAllDocs = async () => {
  const allDocs = (await getCollection('docs')) as Docs[];
  let docsInGettingStarted: Docs[] = [];
  const docsInComponents: Docs[] = [];

  allDocs.forEach((d) => {
    if (d.data.category === 'getting_started') {
      docsInGettingStarted.push(d);
    }

    if (d.data.category === 'components') {
      docsInComponents.push(d);
    }
  });

  docsInGettingStarted = docsInGettingStarted.sort(
    (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
  );

  return [...docsInGettingStarted, ...docsInComponents];
};

export const getSlug = (id: string) => {
  return id === 'introduction' ? '' : id;
};

export const getNavItem = (doc: Docs): NavItem => {
  return {
    slug: getSlug(doc.id),
    label: doc.data.navTitle || doc.data.title
  };
};

export const getDocsForNavByCategory = async (category: DocsCategory): Promise<NavItem[]> => {
  const allDocs = await getAllDocs();

  const fileterd = allDocs.filter((d) => d.data.category === category);

  return fileterd.map((d) => getNavItem(d));
};

export const getPrevAndNext = async (
  slug: string
): Promise<{ prev: NavItem | null; next: NavItem | null }> => {
  const allDocs = await getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.id === slug);
  let prev: NavItem | null = null;
  let next: NavItem | null = null;

  if (currentIndex !== 0) {
    const prevDoc = allDocs[currentIndex - 1];
    prev = getNavItem(prevDoc);
  }

  if (currentIndex !== allDocs.length - 1) {
    const nextDoc = allDocs[currentIndex + 1];
    next = getNavItem(nextDoc);
  }

  return { prev, next };
};
