/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_APP_ENV: "DEMO",
        // NEXT_APP_API_URL: "http://localhost:5001/api/v1",
        NEXT_APP_API_URL: "https://petournal.onrender.com/api/v1",
        NEXT_APP_CLIENT: "https://petournal.vercel.app",
        // HOST: "http://localhost:5001",
        HOST: "https://petournal.onrender.com",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "**",
            },
        ],
    },
    pageExtensions: ['js', 'jsx']
};

module.exports = nextConfig;
