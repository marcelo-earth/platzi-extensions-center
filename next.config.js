const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Spanish is the default locale and has no /es/ prefix; keep old /es/* links alive.
      {
        source: '/es',
        destination: '/',
        permanent: true,
      },
      {
        source: '/es/:path+',
        destination: '/:path+',
        permanent: true,
      },
      // Legacy alias domain.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.platkey.dev' }],
        destination: 'https://platkey.astronware.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
