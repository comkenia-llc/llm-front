/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // tailwind.config.js
    theme: {
        extend: {
            typography: {
                blue: {
                    css: {
                        '--tw-prose-headings': '#1e3a8a',
                        '--tw-prose-links': '#2563eb',
                        '--tw-prose-bold': '#111827',
                    },
                },
            },
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
