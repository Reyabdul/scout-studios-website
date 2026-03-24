import { defineType, defineField } from 'sanity'

export const intro = defineType({
  name: 'intro',
  type: 'document',
  title: 'Intro Page',
  fields: [
    defineField({
      name:'title1',
      type:'string',
      title:'Title 1 (top)',
      description: 'Text used for the top title.',
      placeholder: 'e.g. Scout',

    }),
    defineField({
      name:'title2',
      type:'string',
      title:'Title 2 (bottom)',
      description: 'Text used for the bottom title.',
      placeholder: 'e.g. Studios',
    }),
  ]
})