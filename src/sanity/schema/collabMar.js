// schemas/collabMar.js
import { defineType, defineField } from 'sanity'

export const collabMar = defineType({
  name: 'collabMar',
  title: 'Collaboration Marquee',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Marquee Items',
      description: 'Add collaborator names or logos — they will scroll in the marquee',
      of: [
        {
          type: 'object',
          name: 'marqueeItem',
          title: 'Marquee Item',
          fields: [
            defineField({
              name: 'type',
              type: 'string',
              title: 'Item Type',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Image / Logo', value: 'image' },
                ],
                layout: 'radio',
              },
              validation: Rule => Rule.required().error('Please select an item type'),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Text Label',
              description: 'Collaborator or brand name shown in the marquee',
              hidden: ({ parent }) => parent?.type !== 'text',
            }),
            defineField({
              name: 'logo',
              type: 'image',
              title: 'Logo / Image',
              description: 'Accepts PNG or JPEG files uploaded to Sanity',
              options: { hotspot: false },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Collaborator name or description for accessibility',
                }),
              ],
              hidden: ({ parent }) => parent?.type !== 'image',
            }),
          ],
          preview: {
            select: {
              type: 'type',
              label: 'label',
              media: 'logo',
            },
            prepare({ type, label, media }) {
              return {
                title: type === 'text' ? label || 'Untitled text item' : 'Logo / Image',
                subtitle: type === 'text' ? 'Text' : 'Image',
                media: type === 'image' ? media : undefined,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.min(1).error('Add at least one marquee item'),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const count = items?.length ?? 0
      return {
        title: 'Collaboration Marquee',
        subtitle: count > 0 ? `${count} item${count !== 1 ? 's' : ''}` : 'No items yet',
      }
    },
  },
})