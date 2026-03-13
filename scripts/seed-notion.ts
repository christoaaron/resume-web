import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";
import path from "path";

// Load .env from the root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function seed() {
    if (!process.env.NOTION_TOKEN || !databaseId) {
        console.error("❌ Missing NOTION_TOKEN or NOTION_DATABASE_ID in .env");
        process.exit(1);
    }

    console.log("🚀 Seeding Notion database...");

    try {
        // Validate database access and update schema
        const db = await notion.databases.retrieve({ database_id: databaseId });
        console.log("✅ Connection successful!");

        const existingProps = Object.keys(db.properties);
        const requiredProps: Record<string, any> = {
            "Slug": { rich_text: {} },
            "Excerpt": { rich_text: {} },
            "CoverImage": { url: {} },
            "Published": { checkbox: {} },
            "Featured": { checkbox: {} },
            "Date": { date: {} }
        };

        const propsToUpdate: Record<string, any> = {};
        for (const [prop, schema] of Object.entries(requiredProps)) {
            if (!existingProps.includes(prop)) {
                console.log(`➕ Adding missing property: ${prop}...`);
                propsToUpdate[prop] = schema;
            }
        }

        if (Object.keys(propsToUpdate).length > 0) {
            await notion.databases.update({
                database_id: databaseId,
                properties: propsToUpdate
            });
            console.log("✅ Database schema updated!");
        }
    } catch (error: any) {
        console.error("❌ Could not connect to the database.");
        console.error("   Error:", error.message);
        console.error("\n💡 Make sure you have:");
        console.error("   1. Used an INTERNAL INTEGRATION secret.");
        console.error("   2. Shared the database with your integration (Connect to...).");
        process.exit(1);
    }

    const posts = [
        {
            title: "Exploring the Future of Web Design",
            slug: "future-of-web-design",
            excerpt: "A deep dive into upcoming trends like spatial UI, glassmorphism, and AI-driven layouts.",
            coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2560&h=850",
            published: true,
            featured: true,
            content: `
## The Shift Toward Spatial Interfaces
Digital design is moving beyond the flat screen. With the rise of AR/VR, we are seeing a shift toward depth and layers.

### Key Trends for 2026
1. **Glassmorphism 2.0**: Softer shadows and more realistic light refraction.
2. **AI-Driven Layouts**: Components that adapt in real-time to user behavior.
3. **Typography-First Design**: Bold, oversized fonts that dominate the visual hierarchy.

> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

Stay tuned for more updates on how these trends will shape our digital experiences.
            `.trim()
        },
        {
            title: "Mastering Next.js 16 and Server Actions",
            slug: "mastering-nextjs-16",
            excerpt: "Learn how to build faster, more secure applications using the latest features in the Next.js ecosystem.",
            coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=2560&h=850",
            published: true,
            featured: false,
            content: `
## Why Server Actions Change Everything
With Next.js 16, server actions have become the standard for data mutation. No more boilerplate API routes for simple form submissions.

### The Benefits
- **Zero Client-Side JS**: Mutations happen on the server, keeping your bundles small.
- **Auto-Retry**: Built-in mechanisms for handling network hiccups.
- **Type Safety**: End-to-end types without extra config.

\`\`\`typescript
export async function updateProfile(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await prisma.user.update({ where: { id: 1 }, data: { name } });
}
\`\`\`

Implementing these patterns will drastically reduce your development time.
            `.trim()
        }
    ];

    for (const post of posts) {
        try {
            console.log(`📝 Creating post: ${post.title}...`);
            await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    "Title": { title: [{ text: { content: post.title } }] },
                    "Slug": { rich_text: [{ text: { content: post.slug } }] },
                    "Excerpt": { rich_text: [{ text: { content: post.excerpt } }] },
                    "CoverImage": { url: post.coverImage },
                    "Published": { checkbox: post.published },
                    "Featured": { checkbox: post.featured },
                    "Date": { date: { start: new Date().toISOString().split('T')[0] } }
                },
                children: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        paragraph: {
                            rich_text: [{ text: { content: "This is a seeded post. You can edit this in Notion!" } }]
                        }
                    }
                ]
            });
        } catch (error: any) {
            console.error(`  ❌ Failed to create post "${post.title}":`, error.message);
            console.error("  💡 Tip: Ensure your database has columns named 'Title', 'Slug', 'Excerpt', 'CoverImage', 'Published', 'Featured', and 'Date' with correct types.");
        }
    }

    console.log("\n✅ Seeding complete! Refresh your site to see the new insights.");
}

seed();
