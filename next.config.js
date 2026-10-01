const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',          // Generates the `out` folder for Hostinger
    images: {
        unoptimized: true,       // Allows images to work without a Node server
    },
    // Pin the workspace root; otherwise Turbopack walks up and finds a stray
    // lockfile in the home directory.
    turbopack: { root: path.resolve(__dirname) },
};

module.exports = nextConfig;
