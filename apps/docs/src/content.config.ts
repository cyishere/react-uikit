import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const DocsCategorySchema = z.union([z.literal('getting_started'), z.literal('components')]);

const DocsSchema = z.object({
  title: z.string(),
  navTitle: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  category: DocsCategorySchema,
  order: z.number().optional()
});

export type DocsCategory = z.infer<typeof DocsCategorySchema>;
export type DocsMetadata = z.infer<typeof DocsSchema>;

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
  schema: DocsSchema
});

export const collections = { docs };
