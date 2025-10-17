import axios from "axios";

export const dynamic = "force-dynamic"; // ✅ Always fetch fresh
export const revalidate = 3600; // Rebuild every hour

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://universitiesforllm.com";
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    try {
        const [uniRes, progRes, locRes] = await Promise.all([
            axios.get(`${apiBase}/api/universities?limit=200`).catch(() => ({ data: [] })),
            axios.get(`${apiBase}/api/programs?limit=200`).catch(() => ({ data: [] })),
            axios.get(`${apiBase}/api/locations?type=country&limit=200`).catch(() => ({ data: [] })),
        ]);

        const universities = uniRes.data.items || uniRes.data || [];
        const programs = progRes.data.items || progRes.data || [];
        const locations = locRes.data.items || locRes.data || [];

        const staticPages = [
            { url: `${baseUrl}/`, lastModified: new Date() },
            { url: `${baseUrl}/universities`, lastModified: new Date() },
            { url: `${baseUrl}/programs`, lastModified: new Date() },
            { url: `${baseUrl}/locations`, lastModified: new Date() },
            { url: `${baseUrl}/about`, lastModified: new Date() },
            { url: `${baseUrl}/contact`, lastModified: new Date() },
            { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
            { url: `${baseUrl}/terms`, lastModified: new Date() },
        ];

        const dynamicUrls = [
            ...universities
                .filter((u) => u.slug)
                .map((u) => ({
                    url: `${baseUrl}/universities/${u.slug}`,
                    lastModified: u.updatedAt ? new Date(u.updatedAt) : new Date(),
                })),

            ...programs
                .filter((p) => p.slug)
                .map((p) => ({
                    url: `${baseUrl}/programs/${p.slug}`,
                    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
                })),

            ...locations
                .filter((l) => l.slug)
                .map((l) => ({
                    url: `${baseUrl}/locations/${l.slug}`,
                    lastModified: l.updatedAt ? new Date(l.updatedAt) : new Date(),
                })),
        ];

        return [...staticPages, ...dynamicUrls];
    } catch (err) {
        console.error("❌ Sitemap generation error:", err.message);
        return [{ url: baseUrl, lastModified: new Date() }];
    }
}
