// schemas/work.js
import { defineType, defineField } from 'sanity'

export const works = defineType({
  name: 'works',
  title: 'Work Section',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Display order (1 = first video, 2 = second, etc.)',
      validation: Rule =>
        Rule.required()
          .integer()
          .min(1)
          .error('Order must be a positive integer starting at 1'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
      validation: Rule => Rule.required().error('Company is required'),
    }),
    defineField({
      name: 'creator',
      title: 'Creator / Director',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
    }),
    defineField({
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: Rule =>
        Rule.integer()
          .min(1900)
          .max(new Date().getFullYear() + 1)
          .error('Year should be a valid number'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({ title, order }) {
      return {
        title: title || 'Untitled work',
        subtitle: order != null ? `Order ${order}` : 'No order set',
      }
    },
  },
})