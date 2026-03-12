// _data/articles.js
// Fetches all published articles from Contentful at build time.
// Eleventy makes this available as `articles` in all templates.

require("dotenv").config();
const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "noqo7wi3e5ju",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

module.exports = async function () {
  try {
    const response = await client.getEntries({
      content_type: "article",
      order: "-fields.publishDate",
      include: 2, // resolve linked entries (author, topics)
    });

    return response.items.map((item) => {
      const fields = item.fields;

      return {
        id: item.sys.id,
        title: fields.title || "",
        slug: fields.slug || "",
        publishDate: fields.publishDate || null,
        summary: fields.summary || "",
        body: fields.body || null,
        videoUrl: fields.videoUrl || null,
        videoCaption: fields.videoCaption || null,
        seoTitle: fields.seoTitle || fields.title || "",
        metaDescription: fields.metaDescription || fields.summary || "",
        ogImage: fields.ogImage?.fields?.file?.url
          ? "https:" + fields.ogImage.fields.file.url
          : null,
        author: fields.author?.fields
          ? {
              name: fields.author.fields.name || "",
              slug: fields.author.fields.slug || "",
              bio: fields.author.fields.bio || "",
              photo: fields.author.fields.photo?.fields?.file?.url
                ? "https:" + fields.author.fields.photo.fields.file.url
                : null,
            }
          : null,
        topics: (fields.topics || []).map((t) => ({
          name: t.fields?.name || "",
          slug: t.fields?.slug || "",
        })),
        url: `/articles/${fields.slug}/`,
      };
    });
  } catch (err) {
    console.error("Contentful fetch error:", err.message);
    return [];
  }
};
