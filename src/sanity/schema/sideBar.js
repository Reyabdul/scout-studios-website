// import { defineType, defineField, defineArrayMember } from 'sanity'

// export const moreInfo = defineType({
//   name: 'moreInfo',
//   type: 'document',
//   title: "More Info Section",
//   fields: [
//     defineField({
//       name: 'heading',
//       type: 'string',
//       title: 'Heading',
//       placeholder: 'e.g. Scout Studio'
//     }),
//     defineField({
//       name: 'body',
//       type: 'array',
//       title: 'Body',
//       of: [
//         defineArrayMember({
//           type: 'block',
//         }),
//       ],
//     }),
//     defineField({
//       name: 'subheading1',
//       type: 'string',
//       title: 'Subheading 1',
//       placeholder: 'e.g. Services'
//     }),
//     defineField({
//       name: 'services',
//       title: 'Services',
//       type: 'array',
//       of: [{ type: 'string'}],
//     }),
//     defineField({
//       name: 'subheading2',
//       type: 'string',
//       title: 'Subheading 2',
//       placeholder: 'e.g. Contact'
//     }),
//     defineField({
//       name: 'email',
//       type: 'string',
//       title: 'Email',
//       placeholder: 'e.g. example@gmail.com'
//     }),
//     defineField({
//       name: 'subheading3',
//       type: 'string',
//       title: 'Subheading 3',
//       placeholder: 'e.g. Social Media'
//     }),
//     defineField({
//       name: 'socialmedia',
//       type: 'object',
//       fieldsets: [
//         { name: 'social', title: 'Social media' }
//       ],
//       fields: [
//         {
//           title: 'Twitter',
//           name: 'twitter',
//           type: 'url',
//           fieldset: 'social'
//         },
//         {
//           title: 'Instagram',
//           name: 'instagram',
//           type: 'url',
//           fieldset: 'social'
//         },
//         {
//           title: 'Facebook',
//           name: 'facebook',
//           type: 'url',
//           fieldset: 'social'
//         },
//         {
//           title: 'YouTube',
//           name: 'youtube',
//           type: 'url',
//           fieldset: 'social'
//         },
//         {
//           title: 'LinkedIn',
//           name: 'linkedin',
//           type: 'url',
//           fieldset: 'social'
//         },
//       ]
//     }),
//   ],
// })

import { defineType, defineField, defineArrayMember } from 'sanity'

export const moreInfo = defineType({
  name: 'moreInfo',
  type: 'document',
  title: 'More Info Section',

  groups: [
    { name: 'main', title: 'Main Content', default: true },
    { name: 'services', title: 'Services' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Media' },
  ],

  fields: [
    // Heading
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      group: 'main',
      description: 'Main title shown at the top of the sidebar',
      placeholder: 'e.g. Scout Studio',
    }),

    // Body
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      group: 'main',
      description: 'Main descriptive text',
      of: [defineArrayMember({ type: 'block' })],
    }),

    // Services
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      description: 'List of services offered',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        sortable: true,
      },
    }),

    // Contact
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      group: 'contact',
      description: 'Contact email displayed to users',
      placeholder: 'e.g. hello@studio.com',
      validation: (Rule) =>
        Rule.email().warning('Enter a valid email address'),
    }),

    // Social Media (improved)
    defineField({
      name: 'socialmedia',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      description: 'Add links to social platforms (optional)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
                layout: 'dropdown',
              },
            }),

            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              description: 'Paste full link (https://...)',
            }),
          ],

          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              return {
                title: title
                  ? title.charAt(0).toUpperCase() + title.slice(1)
                  : 'Social Link',
                subtitle: subtitle || 'No URL added',
              }
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      subtitle: 'email',
    },
  },
})