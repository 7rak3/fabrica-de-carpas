import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fabricadecarpas.cl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/propuestas/',
      },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bytespider'],
        allow: '/',
        disallow: '/propuestas/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
