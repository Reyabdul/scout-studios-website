import { defineType, defineField, defineArrayMember } from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  type: 'document',
  title: 'Navigation Bar',

  groups: [
    { name: 'main', title: 'Main Settings', default: true },
    { name: 'links', title: 'Navigation Links' },
    { name: 'sidebar', title: 'Sidebar Button' },
  ],

  fields: [
    // ======================
    // MAIN
    // ======================
    defineField({
      name: 'siteName',
      type: 'string',
      title: 'Site Name / Logo Text',
      group: 'main',
      description:
        'Short name or initials shown in the navigation bar (recommended: 2–4 characters).',
      placeholder: 'e.g. SS',
      validation: (Rule) =>
        Rule.max(10).warning('Keep this short for best appearance'),
    }),

    // ======================
    // LINKS (LABEL ONLY)
    // ======================
    defineField({
      name: 'links',
      type: 'array',
      title: 'Navigation Links',
      group: 'links',
      description:
        'Add navigation items. These will automatically link to sections on the page. Keep labels short (1–2 words). Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Link Label',
              description:
                'Text shown in the navigation (e.g. Work, About, Contact).',
              placeholder: 'e.g. Work',
              validation: (Rule) =>
                Rule.max(20).warning('Keep labels short'),
            }),
          ],

          preview: {
            select: {
              title: 'label',
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled Link',
                subtitle: 'Auto-linked to section',
              }
            },
          },
        }),
      ],
      options: {
        sortable: true,
      },
      validation: (Rule) =>
        Rule.max(6).warning('Too many links may clutter the navigation'),
    }),

    // ======================
    // SIDEBAR BUTTON
    // ======================
    defineField({
      name: 'sideBarTitle',
      type: 'string',
      title: 'Sidebar Button Text',
      group: 'sidebar',
      description:
        'Text for the button that opens the sidebar (right side of navbar). Keep it short.',
      placeholder: 'e.g. More Info',
      validation: (Rule) =>
        Rule.max(20).warning('Keep this concise'),
    }),
  ],

  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: title || 'Navigation Bar',
        subtitle: 'Navbar Configuration',
      }
    },
  },
})