/**
 * This configuration is used for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 *
 * IMPORTANT: Do not add "use client" to this file.
 * Sanity configuration files must be a pure module (no client directive) since they are loaded server-side.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema'
import {structure} from './src/sanity/structure'

export default defineConfig({
  name: 'ScoutStudios',
  title: 'Scout Studios',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // structureTool(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
