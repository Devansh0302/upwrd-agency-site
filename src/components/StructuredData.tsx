import { siteConfig } from "@/config/site";

export default function StructuredData() {
  // AEO & AI SEO: Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`, // Placeholder for actual logo
    description: siteConfig.description,
    founder: [
      {
        "@type": "Person",
        name: siteConfig.founder,
        jobTitle: "Founder & CTO",
      },
      {
        "@type": "Person",
        name: siteConfig.coFounder,
        jobTitle: "Co-Founder",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phones.primary,
      contactType: "customer service",
      email: siteConfig.emails.contact,
    },
    sameAs: Object.values(siteConfig.links),
  };

  // AEO & GEO: WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
