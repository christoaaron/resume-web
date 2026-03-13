/**
 * QuillRenderer - Proper HTML renderer for Quill-generated content.
 *
 * Quill outputs HTML, not Markdown. This component renders it correctly
 * using dangerouslySetInnerHTML, with preprocessing to strip invisible
 * characters and normalise inline styles that interfere with wrapping.
 */

interface QuillRendererProps {
    content: string;
}

/**
 * Pre-process Quill HTML:
 *  1. Remove invisible break-opportunity characters (soft hyphens, ZWSP…)
 *  2. Strip `white-space: nowrap` from inline styles (Quill sometimes adds it)
 *  3. Strip `word-break` / `overflow-wrap` overrides from inline styles
 *  4. Strip <wbr> tags
 */
function processQuillHtml(html: string): string {
    if (!html) return "";
    return html
        // invisible break chars
        .replace(/\u00AD/g, "")
        .replace(/\u200B/g, "")
        .replace(/\u200C/g, "")
        .replace(/\u200D/g, "")
        .replace(/\u2060/g, "")
        .replace(/\uFEFF/g, "")
        .replace(/&shy;/gi, "")
        .replace(/<wbr\s*\/?>/gi, "")
        // remove problematic inline style props that block wrapping
        .replace(/white-space\s*:\s*nowrap\s*;?\s*/gi, "")
        .replace(/word-break\s*:[^;}"']+;?\s*/gi, "")
        .replace(/overflow-wrap\s*:[^;}"']+;?\s*/gi, "")
        .replace(/hyphens\s*:[^;}"']+;?\s*/gi, "");
}

export function QuillRenderer({ content }: QuillRendererProps) {
    const processed = processQuillHtml(content);

    return (
        <div
            className="quill-prose"
            dangerouslySetInnerHTML={{ __html: processed }}
        />
    );
}
