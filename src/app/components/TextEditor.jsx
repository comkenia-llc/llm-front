"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function TextEditor({ token, onSaved }) {
    const [title, setTitle] = useState("");
    const [thumbFile, setThumbFile] = useState(null);
    const [error, setError] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    const editor = useEditor(
        isMounted
            ? {
                extensions: [
                    StarterKit,
                    Link.configure({ openOnClick: false }),
                    TextAlign.configure({ types: ["heading", "paragraph"] }),
                    Heading.configure({ levels: [1, 2, 3] }),
                    BulletList,
                    OrderedList,
                    ListItem,
                ],
                content: "<p>Write something amazing...</p>",
                immediatelyRender: false,
            }
            : null
    );

    if (!isMounted) return <p>Loading editor...</p>;

    const handleSave = async () => {
        setError("");
        try {
            const contentHtml = editor?.getHTML() || "";
            if (!title.trim() || !contentHtml.trim()) {
                setError("Title and content are required");
                return;
            }

            const fd = new FormData();
            fd.append("title", title);
            fd.append("content", contentHtml);
            if (thumbFile) fd.append("media", thumbFile);

            const res = await fetch(`${API}/api/admin/posts`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });

            if (!res.ok) throw new Error((await res.json()).error || "Failed to save");

            const data = await res.json();
            setTitle("");
            setThumbFile(null);
            editor?.commands.setContent("<p></p>");
            onSaved?.(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggle = (command, activeCheck) => {
        editor?.chain().focus()[command]().run();
    };

    return (
        <div className="space-y-4">
            {/* Title */}
            <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />

            {/* Thumbnail */}
            <div>
                <label className="block text-sm font-medium mb-1">Thumbnail</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbFile(e.target.files[0])}
                />
                {thumbFile && (
                    <img
                        src={URL.createObjectURL(thumbFile)}
                        alt="Preview"
                        className="h-32 mt-2 rounded border"
                    />
                )}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border p-2 bg-gray-50 rounded text-sm">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded ${editor.isActive("bold")
                            ? "bg-blue-600 text-white"
                            : "bg-white border text-gray-800"
                        }`}
                >
                    <b>B</b>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded italic ${editor.isActive("italic")
                            ? "bg-blue-600 text-white"
                            : "bg-white border text-gray-800"
                        }`}
                >
                    I
                </button>
                {[1, 2, 3].map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: lvl }).run()
                        }
                        className={`px-2 py-1 rounded ${editor.isActive("heading", { level: lvl })
                                ? "bg-blue-600 text-white"
                                : "bg-white border text-gray-800"
                            }`}
                    >
                        H{lvl}
                    </button>
                ))}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive("bulletList")
                            ? "bg-blue-600 text-white"
                            : "bg-white border text-gray-800"
                        }`}
                >
                    • List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive("orderedList")
                            ? "bg-blue-600 text-white"
                            : "bg-white border text-gray-800"
                        }`}
                >
                    1. List
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    className="px-2 py-1 border rounded"
                >
                    ⬅
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    className="px-2 py-1 border rounded"
                >
                    ⬍
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    className="px-2 py-1 border rounded"
                >
                    ➡
                </button>
            </div>

            {/* Editor area */}
            <div className="border rounded bg-white min-h-[200px] p-3">
                <EditorContent editor={editor} />
            </div>

            {error && <p className="text-red-600">{error}</p>}

            {/* Save */}
            <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Save Post
            </button>
        </div>
    );
}
