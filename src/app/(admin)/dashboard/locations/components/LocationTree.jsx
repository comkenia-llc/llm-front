"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Plus, Trash } from "lucide-react";

function LocationNode({ node, onEdit, onDelete, onAddChild }) {
    const [open, setOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="pl-4 border-l border-gray-200">
            <div className="flex items-center gap-2 py-1">
                {hasChildren ? (
                    <button onClick={() => setOpen(!open)} className="text-gray-500">
                        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                ) : (
                    <span className="w-4"></span>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                    
                    <span className="font-medium text-gray-800">
                        {node.country || node.state || node.city || node.neighborhood}
                    </span>

                    
                    <span className="text-xs text-gray-500 uppercase bg-gray-100 px-2 rounded">
                        {node.type}
                    </span>
                    {node.flag && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${node.flag}`}
                            alt="flag"
                            className="w-5 h-4 rounded border"
                        />
                    )}
                </div>

                <div className="ml-auto flex gap-2 text-gray-600">
                    <button onClick={() => onAddChild(node)} title="Add child">
                        <Plus size={15} />
                    </button>
                    <button onClick={() => onEdit(node)} title="Edit">
                        <Pencil size={15} />
                    </button>
                    <button
                        onClick={() => onDelete(node.id)}
                        title="Delete"
                        className="text-red-500"
                    >
                        <Trash size={15} />
                    </button>
                </div>
            </div>

            {open && hasChildren && (
                <div className="pl-4">
                    {node.children.map((child) => (
                        <LocationNode
                            key={child.id}
                            node={child}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function LocationTree({ tree, onEdit, onDelete, onAddChild }) {
    if (!tree || tree.length === 0)
        return <p className="text-gray-600 italic">No locations found.</p>;

    return (
        <div className="space-y-2">
            {tree.map((loc) => (
                <LocationNode
                    key={loc.id}
                    node={loc}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAddChild={onAddChild}
                />
            ))}
        </div>
    );
}
