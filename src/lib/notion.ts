/**
 * notion.ts
 *
 * Fetches blog posts (Insights) from a Notion database and converts
 * them to a shape compatible with the rest of the app.
 *
 * Required env vars:
 *   NOTION_TOKEN          – Notion integration secret (starts with "secret_")
 *   NOTION_DATABASE_ID    – The Notion database ID (32-char hex or UUID form)
 *
 * Expected Notion database properties:
 *   Title        (title)      – Post title
 *   Slug         (rich_text)  – URL slug, e.g. "my-first-post"
 *   Excerpt      (rich_text)  – Short description shown on the listing page
 *   CoverImage   (url)        – Panoramic cover image URL
 *   Published    (checkbox)   – true = publicly visible
 *   Featured     (checkbox)   – true = shown on the homepage
 *   Date         (date)       – Optional publish date (falls back to page created_time)
 */

import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// ---------------------------------------------------------------------------
// Client setup
// ---------------------------------------------------------------------------

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NotionInsight {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string; // Markdown string (only populated for detail pages)
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Property helpers (work with Notion's untyped property bag)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRichText(prop: any): string {
    return (prop?.rich_text ?? []).map((t: { plain_text: string }) => t.plain_text).join("");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTitleText(prop: any): string {
    return (prop?.title ?? []).map((t: { plain_text: string }) => t.plain_text).join("");
}

// ---------------------------------------------------------------------------
// Converters
// ---------------------------------------------------------------------------

/**
 * Build an insight summary (no content body) from a Notion page.
 * Fast — does NOT fetch page blocks.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToSummary(page: any): NotionInsight {
    const p = page.properties as Record<string, any>;

    return {
        id: page.id,
        title: getTitleText(p["Title"]) || "Untitled",
        slug: getRichText(p["Slug"]) || page.id,
        excerpt: getRichText(p["Excerpt"]) || null,
        coverImage: p["CoverImage"]?.url ?? null,
        published: p["Published"]?.checkbox ?? false,
        featured: p["Featured"]?.checkbox ?? false,
        createdAt: new Date(p["Date"]?.date?.start ?? page.created_time),
        updatedAt: new Date(page.last_edited_time),
        content: "",
    };
}

/**
 * Build a full insight (WITH content body) from a Notion page.
 * Slower — fetches and converts page blocks to Markdown.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function pageToInsight(page: any): Promise<NotionInsight> {
    const summary = pageToSummary(page);
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const content = n2m.toMarkdownString(mdBlocks).parent;
    return { ...summary, content };
}

// ---------------------------------------------------------------------------
// Public API — mirrors the old Prisma data functions
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Helpers to check property existence
// ---------------------------------------------------------------------------

async function getDatabaseProperties() {
    const db = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID! });
    return db.properties;
}

// ---------------------------------------------------------------------------
// Public API — mirrors the old Prisma data functions
// ---------------------------------------------------------------------------

/** Fetch all insights. Pass `publishedOnly = false` from admin routes. */
export async function getNotionInsights(
    publishedOnly = true
): Promise<NotionInsight[]> {
    try {
        const props = await getDatabaseProperties();
        const hasPublished = "Published" in props;

        const filter = (publishedOnly && hasPublished)
            ? { property: "Published", checkbox: { equals: true } }
            : undefined;

        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: filter as any,
            sorts: [{ timestamp: "created_time", direction: "descending" }],
        });

        return response.results.filter(isFullPage).map(pageToSummary);
    } catch (error) {
        console.error("Error fetching Notion insights:", error);
        return [];
    }
}

/** Fetch only featured + published insights. */
export async function getFeaturedNotionInsights(): Promise<NotionInsight[]> {
    try {
        const props = await getDatabaseProperties();
        const hasPublished = "Published" in props;
        const hasFeatured = "Featured" in props;

        const filters: any[] = [];
        if (hasPublished) filters.push({ property: "Published", checkbox: { equals: true } });
        if (hasFeatured) filters.push({ property: "Featured", checkbox: { equals: true } });

        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: filters.length > 0 ? (filters.length > 1 ? { and: filters } : filters[0]) : undefined,
            sorts: [{ timestamp: "created_time", direction: "descending" }],
        });

        return response.results.filter(isFullPage).map(pageToSummary);
    } catch (error) {
        console.error("Error fetching featured Notion insights:", error);
        return [];
    }
}

/** Fetch a single insight by its Slug property (includes full Markdown content). */
export async function getNotionInsightBySlug(
    slug: string
): Promise<NotionInsight | null> {
    try {
        const props = await getDatabaseProperties();
        if (!("Slug" in props)) return null;

        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: {
                property: "Slug",
                rich_text: { equals: slug },
            },
        });

        const page = response.results.filter(isFullPage)[0];
        if (!page) return null;

        return pageToInsight(page);
    } catch (error) {
        console.error(`Error fetching Notion insight with slug ${slug}:`, error);
        return null;
    }
}
