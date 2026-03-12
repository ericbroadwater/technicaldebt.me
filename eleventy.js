module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon*");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // Date filter for article display
  eleventyConfig.addFilter("readableDate", (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Use Nunjucks for templating
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    // Treat .html files as Nunjucks templates
    templateFormats: ["html", "njk", "md"],
  };
};
