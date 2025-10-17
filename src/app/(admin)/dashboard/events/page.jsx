"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { PlusCircle, RefreshCw } from "lucide-react";
import EventForm from "./components/EventForm";
import EventTable from "./components/EventTable";


export default function EventsAdminPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get("/api/events?status=published");
            setEvents(res.data);
        } catch (err) {
            console.error("❌ Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            await axiosClient.delete(`/api/events/${id}`);
            fetchEvents();
        } catch (err) {
            console.error("❌ Error deleting event:", err);
        }
    };

    const handleCreatedOrUpdated = () => {
        setShowForm(false);
        setEditingEvent(null);
        fetchEvents();
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">🎓 Manage Events</h1>
                <div className="flex gap-3">
                    <button
                        onClick={fetchEvents}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            setEditingEvent(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <PlusCircle size={18} />
                        Add Event
                    </button>
                </div>
            </div>

            <EventTable
                events={events}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showForm && (
                <EventForm
                    event={editingEvent}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleCreatedOrUpdated}
                />
            )}
        </div>
    );
}
