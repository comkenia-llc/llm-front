import axios from "axios";

export const revalidate = 3600; // rebuild every hour

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://universitiesforllm.com";
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://back.universitiesforllm.com";

    try {
        const [uniRes, progRes, locRes] = await Promise.all([
            axios.get(`${apiBase}/api/universities?limit=200`).catch(() => ({ data: [] })),
            axios.get(`${apiBase}/api/programs?limit=200`).catch(() => ({ data: [] })),
            axios.get(`${apiBase}/api/locations?type=country&limit=200`).catch(() => ({ data: [] })),
        ]);

        const universities = Array.isArray(uniRes.data)
            ? uniRes.data
            : uniRes.data.items || uniRes.data.data || [];
        const programs = Array.isArray(progRes.data)
            ? progRes.data
            : progRes.data.items || progRes.data.data || [];
        const locations = Array.isArray(locRes.data)
            ? locRes.data
            : locRes.data.items || locRes.data.data || [];

        return [
            { url: `${baseUrl}/`, lastModified: new Date() },
            { url: `${baseUrl}/universities`, lastModified: new Date() },
            { url: `${baseUrl}/programmes`, lastModified: new Date() },
            { url: `${baseUrl}/locations`, lastModified: new Date() },
            ...universities.map((u) => ({
                url: `${baseUrl}/universities/${u.slug}`,
                lastModified: u.updatedAt || new Date(),
            })),
            ...programs.map((p) => ({
                url: `${baseUrl}/programmes/${p.slug}`,
                lastModified: p.updatedAt || new Date(),
            })),
            ...locations.map((l) => ({
                url: `${baseUrl}/locations/${l.slug}`,
                lastModified: l.updatedAt || new Date(),
            })),
        ];
    } catch (err) {
        console.error("❌ Sitemap generation error:", err.message);
        return [{ url: baseUrl, lastModified: new Date() }];
    }
}
