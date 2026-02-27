export default {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' }
        },
        { name: 'date', title: 'Date', type: 'date' },
        { name: 'time', title: 'Time', type: 'string' },
        { name: 'venue', title: 'Venue', type: 'string' },
        {
            name: 'poster',
            title: 'Poster (A3)',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'registrationLink',
            title: 'Registration Link (optional)',
            type: 'url',
            description: 'If provided, a "Register Now" button will appear in the upcoming event modal.'
        },
        {
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        }
    ],
    orderings: [
        {
            title: 'Date, Newest First',
            name: 'dateDesc',
            by: [{ field: 'date', direction: 'desc' }]
        }
    ]
}
