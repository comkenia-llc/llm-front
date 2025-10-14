/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "4000",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "back.studyportal.com",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
