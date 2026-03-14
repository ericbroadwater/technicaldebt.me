module.exports = function (eleventyConfig) {
  // Ignore docs — not templates
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("CLAUDE.md");

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("favicon*");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("web-app-manifest-192x192.png");
  eleventyConfig.addPassthroughCopy("web-app-manifest-512x512.png");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Short date: "Mar 2026"
  eleventyConfig.addFilter("dateDisplay", (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  });

  // Full date: "March 14, 2026"
  eleventyConfig.addFilter("readableDate", (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Year only: "2026"
  eleventyConfig.addFilter("dateYear", (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).getFullYear();
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
  };
};
