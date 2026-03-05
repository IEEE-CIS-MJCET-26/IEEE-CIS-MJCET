import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageSEO = ({ title, description }) => {
    // Determine if this is the homepage to show the full title difference
    const isHome = title === 'IEEE CIS MJCET';
    const pageTitle = isHome
        ? 'IEEE CIS MJCET | Computational Intelligence Society'
        : `${title} | IEEE CIS MJCET`;

    const metaDescription = description || "Official website of IEEE CIS MJCET (Computational Intelligence Society, Muffakham Jah College of Engineering and Technology). Discover our events, AI/ML initiatives, and technological innovations.";

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={metaDescription} />
        </Helmet>
    );
};

export default PageSEO;
