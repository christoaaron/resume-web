"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
import "./quill-dark.css"; // We'll add custom dark mode styles for quill

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <p className="text-muted-foreground p-4 text-sm animate-pulse border border-border rounded-lg bg-muted h-[400px]">Loading Editor...</p>,
});

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "color",
    "background",
    "link",
    "image",
    "video",
    "align",
];

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ color: [] }, { background: [] }],
                ["link", "image", "video"],
                ["clean"],
            ],
            handlers: {
                image: function (this: any) {
                    const quill = this.quill;
                    const url = prompt("Paste direct image URL:");
                    if (url) {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, "image", url);
                        quill.setSelection(range.index + 1);
                    }
                },
                video: function (this: any) {
                    const quill = this.quill;
                    const url = prompt("Paste video URL (YouTube/Vimeo):");
                    if (url) {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, "video", url);
                        quill.setSelection(range.index + 1);
                    }
                },
            },
        },
    }), []);

    return (
        <div className="rich-text-editor-container font-inter">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="rich-text-editor"
            />
        </div>
    );
}
