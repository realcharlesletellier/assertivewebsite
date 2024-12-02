import ogImageSrc from "@images/assertive-ai-logo (8).png";

export const SITE = {
  title: "Assertive - Autonomous Unit Test Generation with AI",
  tagline: "Unit Testing AI",
  description: "Assertive AI offers a reliable autonomous unit testing solution for companies looking to cut costs on manual testing efforts and accelerate development",
  description_short: "Assertive offers an autonomous unit testing solution to generate reliable tests at scale.",
  url: "https://assertiveai.com",
  author: "Charles Letellier",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: : Autonomous Unit Testing`,
  description: "Supercharge your projects by reducing manual testing efforts and focusing on development! Assertive's test generation software helps businesses cut testing costs by over 30%!",
  image: ogImageSrc,
};