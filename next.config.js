/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_APP_ENV: "DEMO",
        NEXT_APP_API_URL: "http://localhost:5001/api/v1",
        NEXT_APP_CLIENT: "https://petournal.vercel.app",
    },
};

module.exports = nextConfig;
