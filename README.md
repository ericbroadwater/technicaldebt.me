# technicaldebt.me

Personal site for Eric Broadwater. Built with Eleventy + Contentful.

## Stack

- **SSG:** Eleventy v3
- **CMS:** Contentful (headless, Delivery API)
- **Hosting:** GitHub Pages
- **Domain:** technicaldebt.me (DNS via Bluehost)

## Local Development

```bash
cd "/Users/ebertmain/Desktop/Stuff/Github/GitHub/technicaldebt.me"
npm install
npm start        # dev server at localhost:8080
npm run build    # production build to _site/
```

Requires a `.env` file (not committed) with:
```
CONTENTFUL_SPACE_ID=noqo7wi3e5ju
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_ENVIRONMENT=master
```

## Key Files

| File | Purpose |
|---|---|
| `index.html` | Homepage (Nunjucks template) |
| `writing/article.njk` | Article inner page template |
| `_data/articles.js` | Contentful data fetch |
| `.eleventy.js` | Eleventy config |
| `CLAUDE.md` | Full design system + architecture docs for AI sessions |

## Project Planning (Notion)

<!-- Paste Notion project links here -->

## Contentful

- **Space:** https://app.contentful.com/spaces/noqo7wi3e5ju
- **Content types:** Article, Author, Topic
