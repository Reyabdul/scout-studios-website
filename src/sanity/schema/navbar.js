import { defineType, defineField } from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  type: 'document',
  title: 'Navigation Bar',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site Name',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [{ type: 'string' }],
    }),
  ],
})