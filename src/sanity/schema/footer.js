import { defineType, defineField } from 'sanity'

export const footer = defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer Section',
  fields: [
    defineField({
      name: 'footerText',
      type: 'string',
      title: 'Footer Text',
      description: "Text that goes into the footer.",
      placeholder: 'e.g. Scout Studios'
    }),
  ],
})