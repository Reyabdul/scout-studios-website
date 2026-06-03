// schemas/contact.js
import { defineType, defineField } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'cta',
      type: 'string',
      title: 'Call to Action',
      description: 'e.g. "Get in Touch"',
      validation: Rule => Rule.required().error('CTA is required'),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      description: 'Short supporting text, e.g. "Let\'s build something meaningful together"',
      validation: Rule => Rule.required().error('Tagline is required'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      description: 'The company email clients will be redirected to',
      validation: Rule =>
        Rule.required()
          .email()
          .error('A valid email address is required'),
    }),
  ],
  preview: {
    select: {
      title: 'cta',
      subtitle: 'email',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Section',
        subtitle: subtitle || 'No email set',
      }
    },
  },
})