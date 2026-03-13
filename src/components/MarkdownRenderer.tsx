import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
    content: string;
}

/**
 * Strip any characters that cause mid-word line breaks:
 * - Soft hyphens (\u00AD / &shy;) — inserted by Word, some browsers, autocorrect
 * - Zero-width spaces / joiners that act as break opportunities
 * - <wbr> tags (word break opportunity HTML elements)
 */
function sanitizeContent(raw: string): string {
    if (!raw) return "";
    return raw
        .replace(/\u00AD/g, "")         // soft hyphen
        .replace(/\u200B/g, "")         // zero-width space
        .replace(/\u200C/g, "")         // zero-width non-joiner
        .replace(/\u200D/g, "")         // zero-width joiner
        .replace(/\u2060/g, "")         // word joiner
        .replace(/\uFEFF/g, "")         // BOM / zero-width no-break space
        .replace(/&shy;/gi, "")         // HTML entity for soft hyphen
        .replace(/<wbr\s*\/?>/gi, "");  // <wbr> tags
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const sanitized = sanitizeContent(content);
    return (
        <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
            font-jakarta min-w-0 overflow-x-hidden
            prose-p:leading-relaxed prose-p:my-6 prose-p:text-foreground/90
            prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tighter
            prose-h1:text-4xl md:prose-h1:text-6xl prose-h1:mb-12 prose-h1:mt-0
            prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-snug
            prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:leading-snug
            prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:italic prose-blockquote:my-10 prose-blockquote:pl-6 prose-blockquote:text-muted-foreground
            prose-ul:my-8 prose-ol:my-8
            prose-li:my-3
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-16
            "
            style={{
                wordBreak: "normal",
                overflowWrap: "normal",
                hyphens: "none",
                WebkitHyphens: "none",
                MozHyphens: "none",
                width: "100%",
                maxWidth: "100%",
            } as React.CSSProperties}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {sanitized}
            </ReactMarkdown>
        </div>
    );
}
