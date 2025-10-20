import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean(),

    // About Us section with a list of items
    about_us: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
      }),
    ),

    // Frequently Asked Questions section
    faq_section_title: z.string().optional(),
    faq_section_subtitle: z.string().optional(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
    faqs: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    ),

    // Testimonials section
    testimonials_section_enable: z.boolean().optional(),
    testimonials_section_title: z.string().optional(),
    testimonials: z
      .array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string(),
          content: z.string(),
        }),
      )
      .optional(),

    // Staff section
    staff_section_enable: z.boolean().optional(),
    staff: z
      .array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string(),
        }),
      )
      .optional(),
  }),
});
