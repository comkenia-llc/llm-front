"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios";
import { Loader2, CreditCard } from "lucide-react";

export default function ApplyPage({ params }) {
    const { slug } = use(params); // ✅ unwrap the params Promise
    const router = useRouter();

    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        highestEducation: "",
        motivation: "",
    });
    const [paying, setPaying] = useState(false);

    // ✅ Fetch program details
    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const res = await axiosClient.get(`/api/programs/slug/${slug}`);
                setProgram(res.data);
            } catch (err) {
                console.error("Failed to fetch program:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProgram();
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.fullName || !form.email) {
            alert("Please fill in your name and email.");
            return;
        }

        setPaying(true);

        try {
            const res = await axiosClient.post("/api/applications", {
                ...form,
                programId: program.id,
                fee: program.applicationFee || 0,
            });

            const app = res.data;

            if (app.paymentUrl) {
                window.location.href = app.paymentUrl;
            } else {
                alert("Application submitted successfully!");
                router.push("/thank-you");
            }
        } catch (err) {
            console.error("Application error:", err);
            alert("Failed to submit application. Try again later.");
        } finally {
            setPaying(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );

    if (!program)
        return <div className="text-center py-20 text-gray-500">Program not found.</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Apply for {program.title}
            </h1>
            <p className="text-gray-600 mb-6">{program.university?.name}</p>

            <form
                onSubmit={handleSubmit}
                className="bg-white border rounded-xl shadow-sm p-6 space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full mt-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Highest Education
                    </label>
                    <input
                        name="highestEducation"
                        value={form.highestEducation}
                        onChange={handleChange}
                        className="w-full mt-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Motivation / Personal Statement
                    </label>
                    <textarea
                        name="motivation"
                        value={form.motivation}
                        onChange={handleChange}
                        rows={4}
                        className="w-full mt-1 border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <p className="text-gray-800 font-semibold">
                        Application Fee:{" "}
                        <span className="text-blue-600">
                            {program.currency} {program.applicationFee || 0}
                        </span>
                    </p>

                    <button
                        type="submit"
                        disabled={paying}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2"
                    >
                        {paying ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="h-4 w-4" /> Pay & Submit
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
