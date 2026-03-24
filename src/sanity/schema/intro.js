import { defineType, defineField } from 'sanity'

export const intro = defineType({
  name: 'intro',
  type: 'document',
  title: 'Intro Section',

  groups: [
    { name: 'main', title: 'Main Content', default: true },
  ],

  fields: [
    defineField({
      name: 'titleTop',
      type: 'string',
      title: 'Top Title',
      group: 'main',
      description:
        'Main word displayed at the top. Keep it short and impactful (recommended: 1–2 words).',
      placeholder: 'e.g. Scout',
      validation: (Rule) =>
        Rule.max(20).warning('Keep this short for best visual impact'),
    }),

    defineField({
      name: 'titleBottom',
      type: 'string',
      title: 'Bottom Title',
      group: 'main',
      description:
        'Second word or phrase displayed below the top title. Should complement the top title.',
      placeholder: 'e.g. Studios',
      validation: (Rule) =>
        Rule.max(20).warning('Keep this short for best layout balance'),
    }),
  ],

  preview: {
    select: {
      top: 'titleTop',
      bottom: 'titleBottom',
    },
    prepare({ top, bottom }) {
      return {
        title: `${top || 'No Top Title'} ${bottom || ''}`.trim(),
        subtitle: 'Intro Section',
      }
    },
  },
})