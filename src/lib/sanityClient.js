import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'qtyfg39d',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})