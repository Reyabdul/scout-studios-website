import { defineType, defineField } from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  type: 'document',
  title: 'Navigation Bar',
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      description: "The text that appears above the links.",
      placeholder: 'e.g. SS'
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      description: 'Name of links.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sideBarTitle',
      type: 'string',
      title: "Side Bar Title",
      description: "The title used for the 'Side bar' (located on the right side of the navigation bar).",
      placeholder: "e.g. 'More Info'",
    }),
  ],
})