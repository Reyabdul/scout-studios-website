import { defineType, defineField, defineArrayMember } from 'sanity'

export const moreInfo = defineType({
  name: 'moreInfo',
  type: 'document',
  title: "More Info Section",
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      placeholder: 'e.g. Scout Studio'
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'subheading1',
      type: 'string',
      title: 'Subheading 1',
      placeholder: 'e.g. Services'
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'string'}],
    }),
    defineField({
      name: 'subheading2',
      type: 'string',
      title: 'Subheading 2',
      placeholder: 'e.g. Contact'
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      placeholder: 'e.g. example@gmail.com'
    }),
    defineField({
      name: 'subheading3',
      type: 'string',
      title: 'Subheading 3',
      placeholder: 'e.g. Social Media'
    }),
    defineField({
      name: 'socialmedia',
      type: 'object',
      fieldsets: [
        { name: 'social', title: 'Social media' }
      ],
      fields: [
        {
          title: 'Twitter',
          name: 'twitter',
          type: 'url',
          fieldset: 'social'
        },
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'url',
          fieldset: 'social'
        },
        {
          title: 'Facebook',
          name: 'facebook',
          type: 'url',
          fieldset: 'social'
        },
        {
          title: 'YouTube',
          name: 'youtube',
          type: 'url',
          fieldset: 'social'
        },
        {
          title: 'LinkedIn',
          name: 'linkedin',
          type: 'url',
          fieldset: 'social'
        },
      ]
    }),
  ],
})