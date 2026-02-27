export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text'
    },
    {
      name: 'featured',
      title: 'Featured Blog',
      type: 'boolean'
    },
    { name: 'author', title: 'Author', type: 'string' },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'Free-text topic label shown on the card (e.g. "AI & ML", "Blockchain"). Display only — not used for filtering.'
    },
    // Kept for backwards compatibility with existing documents
    { name: 'category', title: 'Category (legacy)', type: 'string', hidden: true },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'body',
      title: 'Blog Content',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
}
