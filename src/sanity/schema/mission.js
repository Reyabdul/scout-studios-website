// schemas/mission.js
import { defineType, defineField } from 'sanity'

export const mission = defineType({
  name: 'mission',
  title: 'Mission Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Optional heading for the mission section',
    }),
    defineField({
      name: 'body',
      type: 'text',
      title: 'Mission Statement',
      description: 'The main mission statement text',
      validation: Rule => Rule.required().error('Mission statement is required'),
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Slideshow Images',
      description: 'Images that cycle every 3 seconds in the mission component',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility',
            }),
          ],
        },
      ],
      validation: Rule => Rule.min(1).error('Add at least one image'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'body',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Mission Statement',
        subtitle: subtitle
          ? subtitle.length > 60
            ? subtitle.slice(0, 60) + '…'
            : subtitle
          : 'No statement set',
        media,
      }
    },
  },
})