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
            name: 'tenure',
            title: 'Tenure',
            type: 'string',
            description: 'Which academic year did this event belong to?',
            options: {
                list: [
                    { title: '2025–26', value: '2025-26' },
                    { title: '2024–25', value: '2024-25' },
                    { title: '2023–24', value: '2023-24' },
                    { title: '2022–23', value: '2022-23' },
                ],
                layout: 'radio',
            },
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'What type of event is this?',
            options: {
                list: [
                    { title: 'Technical', value: 'Technical' },
                    { title: 'Fun', value: 'Fun' },
                    { title: 'Humanitarian Drive / Initiative', value: 'Humanitarian' },
                    { title: 'Annual Day', value: 'Annual Day' },
                    { title: 'Industrial / Outreach Trip', value: 'Industrial' },
                ],
                layout: 'radio',
            },
        },
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
        },
        {
            title: 'Tenure, then Date (Newest First)',
            name: 'tenureDateDesc',
            by: [
                { field: 'tenure', direction: 'desc' },
                { field: 'date', direction: 'desc' }
            ]
        }
    ]
}
