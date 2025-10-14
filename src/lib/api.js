export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function apiRequest(endpoint, method = "GET", data, token) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Request failed");
    return result;
}
