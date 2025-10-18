"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function TextEditor({ value = "", onChange }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: true,
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
        ],
        content: value || "<p>Write something amazing...</p>",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onChange) onChange(html);
        },
    });

    // ✅ Keep editor in sync when editing existing content
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "<p>Write something amazing...</p>");
        }
    }, [value, editor]);

    if (!isMounted) return <p>Loading editor...</p>;

    // 🧩 Toolbar Actions
    const setLink = () => {
        const url = prompt("Enter the URL");
        if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = prompt("Enter image URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="space-y-3">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border p-2 bg-gray-50 rounded">
                {/* Bold */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-white border"
                        }`}
                >
                    B
                </button>

                {/* Italic */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded italic ${editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-white border"
                        }`}
                >
                    I
                </button>

                {/* H1 */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 1 })
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                >
                    H1
                </button>

                {/* H2 */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 2 })
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                >
                    H2
                </button>

                {/* Bullet List */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive("bulletList")
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                >
                    • List
                </button>

                {/* Ordered List */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive("orderedList")
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                >
                    1. List
                </button>

                {/* Link */}
                <button
                    type="button"
                    onClick={setLink}
                    className={`px-2 py-1 rounded ${editor.isActive("link") ? "bg-blue-600 text-white" : "bg-white border"
                        }`}
                >
                    🔗 Link
                </button>

                {/* Image */}
                <button
                    type="button"
                    onClick={addImage}
                    className="px-2 py-1 rounded bg-white border hover:bg-gray-100"
                >
                    🖼 Image
                </button>

                {/* Clear Formatting */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    className="px-2 py-1 rounded bg-white border hover:bg-gray-100"
                >
                    ✖ Clear
                </button>
            </div>

            {/* Editor Content */}
            <div className="border rounded bg-white min-h-[250px] p-3 prose max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
