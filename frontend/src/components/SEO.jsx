import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, ogImage, jsonLd, noindex = false, keywords = '' }) => {
  const siteName = 'Akankasa';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = canonical || (origin ? `${origin}${typeof window !== 'undefined' ? window.location.pathname : ''}` : '');

  const defaultDescription = 'Interactive Akan language lessons, dictionary, and cultural heritage resources. Learn Twi, explore traditions, and connect with the community.';
  const defaultImage = '/vite.svg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
