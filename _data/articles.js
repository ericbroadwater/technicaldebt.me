const contentful = require("contentful");
const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");
const { BLOCKS, INLINES } = require("@contentful/rich-text-types");
require("dotenv").config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "noqo7wi3e5ju",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, next) =>
      `<h1 class="article-h1">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) =>
      `<h2 class="article-h2">${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node, next) =>
      `<h3 class="article-h3">${next(node.content)}</h3>`,
    [BLOCKS.PARAGRAPH]: (node, next) =>
      `<p class="article-p">${next(node.content)}</p>`,
    [BLOCKS.QUOTE]: (node, next) =>
      `<blockquote class="article-blockquote">${next(node.content)}</blockquote>`,
    [BLOCKS.HR]: () => `<hr class="article-rule" />`,
    [BLOCKS.UL_LIST]: (node, next) =>
      `<ul class="article-ul">${next(node.content)}</ul>`,
    [BLOCKS.OL_LIST]: (node, next) =>
      `<ol class="article-ol">${next(node.content)}</ol>`,
    [BLOCKS.LIST_ITEM]: (node, next) =>
      `<li>${next(node.content)}</li>`,
    [INLINES.HYPERLINK]: (node, next) =>
      `<a href="${node.data.uri}" class="article-link" target="_blank" rel="noopener">${next(node.content)}</a>`,
  },
};

module.exports = async function () {
  try {
    const response = await client.getEntries({
      content_type: "article",
      order: "-fields.publishDate",
      include: 2,
    });

    return response.items.map((item) => {
      const f = item.fields;

      return {
        id: item.sys.id,
        title: f.title || "",
        slug: f.slug || "",
        publishDate: f.publishDate || null,
        summary: f.summary || "",
        bodyHtml: f.body ? documentToHtmlString(f.body, richTextOptions) : "",
        videoUrl: f.videoUrl || null,
        videoCaption: f.videoCaption || null,
        seoTitle: f.seoTitle || f.title || "",
        metaDescription: f.metaDescription || f.summary || "",
        ogImage: f.ogImage?.fields?.file?.url
          ? "https:" + f.ogImage.fields.file.url
          : null,
        author: f.author?.fields
          ? {
              name: f.author.fields.name || "",
              slug: f.author.fields.slug || "",
              bio: f.author.fields.bio || "",
              photo: f.author.fields.photo?.fields?.file?.url
                ? "https:" + f.author.fields.photo.fields.file.url
                : null,
            }
          : null,
        topics: (f.topics || []).map((t) => ({
          name: t.fields?.name || "",
          slug: t.fields?.slug || "",
        })),
        url: `/writing/${f.slug}/`,
      };
    });
  } catch (err) {
    console.error("Contentful fetch error:", err.message);
    return [];
  }
};
