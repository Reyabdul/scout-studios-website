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
})