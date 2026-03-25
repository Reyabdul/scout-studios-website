// schemas/work.js
import { defineType, defineField } from 'sanity'

export const works = defineType({
  name: 'works',
  title: 'Work Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'creator',
      title: 'Creator / Director',
      type: 'string',
    }),

    defineField({
      name: 'service',
      type: 'string',
    }),

    defineField({
      name: 'year',
      type: 'number',
    }),


    // Video preview (local or CDN — used in your animation)
    // defineField({
    //   name: 'previewVideo',
    //   title: 'Preview Video (MP4/WebM)',
    //   type: 'file',
    //   options: {
    //     accept: 'video/*',
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),

    // External link (YouTube, Vimeo, etc.)
    defineField({
      name: 'externalUrl',
      title: 'External Video Link',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),

    // Optional thumbnail
    // defineField({
    //   name: 'thumbnail',
    //   type: 'image',
    // }),
  ],
})