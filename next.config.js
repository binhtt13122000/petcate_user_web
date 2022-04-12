/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["source.unsplash.com", "flagcdn.com", "images.unsplash.com"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    i18n,
};

module.exports = nextConfig;
