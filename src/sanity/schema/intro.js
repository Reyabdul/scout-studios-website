import { defineType, defineField } from 'sanity'

export const intro = defineType({
  name: 'intro',
  type: 'document',
  title: 'Intro Page',
  fields: [
    defineField({
      name:'title1',
      type:'string',
      title:'Title 1 (top)'
    }),
    defineField({
      name:'title2',
      type:'string',
      title:'Title 2 (bottom)'
    }),
  ]
})