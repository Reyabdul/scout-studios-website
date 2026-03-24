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
    // ======================
    // MAIN CONTENT
    // ======================
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      group: 'main',
      description:
        'Main title at the top of the section. Keep it short (recommended: under 60 characters).',
      placeholder: 'e.g. Scout Studio',
      validation: (Rule) =>
        Rule.max(60).warning('Keep heading under 60 characters'),
    }),

    defineField({
      name: 'body',
      type: 'array',
      title: 'Description',
      group: 'main',
      description:
        'Main description about your studio or business. Keep paragraphs short for better readability.',
      of: [defineArrayMember({ type: 'block' })],
    }),

    // ======================
    // SERVICES
    // ======================
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      description:
        'Add the services you offer. Keep it concise (recommended: 3–8 items). You can drag to reorder.',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        sortable: true,
      },
      validation: (Rule) =>
        Rule.max(12).warning(
          'Too many services may make the layout look crowded'
        ),
    }),

    // ======================
    // CONTACT
    // ======================
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      group: 'contact',
      description:
        'Public contact email shown on the website (e.g. hello@studio.com).',
      placeholder: 'e.g. hello@studio.com',
      validation: (Rule) =>
        Rule.email().warning('Please enter a valid email address'),
    }),

    // ======================
    // SOCIAL MEDIA
    // ======================
    defineField({
      name: 'socialmedia',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      description:
        `Optional: Add your social media profile links.\n
• Paste full URLs (must include https://)\n
• Example: https://instagram.com/yourname\n
• The correct icon will appear automatically on the website\n
• Avoid adding duplicate links\n
• Recommended: 1–5 links`,
      of: [
        defineArrayMember({
          type: 'object',

          fields: [
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              description:
                'Paste your full profile link (e.g. https://instagram.com/yourname)',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }).warning('Link should start with https://'),
            }),
          ],

          preview: {
            select: {
              url: 'url',
            },
            prepare({ url }) {
              if (!url) {
                return {
                  title: 'Social Link',
                  subtitle: 'No URL added',
                }
              }

              let hostname = ''
              try {
                hostname = new URL(url).hostname.replace('www.', '')
              } catch {
                hostname = 'Invalid URL'
              }

              return {
                title: hostname,
                subtitle: url,
              }
            },
          },
        }),
      ],

      validation: (Rule) =>
        Rule.max(5).warning('Recommended maximum is 5 social links'),
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      subtitle: 'email',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'More Info Section',
        subtitle: subtitle || 'No email set',
      }
    },
  },
})