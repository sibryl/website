# Sibryl website

The source for [sibryl.ai](https://sibryl.ai), arranged as a self-contained Hugo project for direct use in Sibryl.

## Work with the site

Use Node 24 and the package-local Hugo Extended 0.147.3 binary:

```sh
npm ci
npm run dev
```

Build the production static output with:

```sh
npm run build
```

The generated `public/` directory is ready for Cloudflare Pages. Its build command is `npm run build` and its output directory is `public`.

## Open it in Sibryl

Open the `website/` directory itself in Sibryl. Do not open `~/Projects/sibryl/` as the site project and do not add a nested `hugo/` directory.

The editor sees its conventional Hugo source directly:

```text
website/
├── config/
├── content/
├── data/
├── layouts/
├── assets/
└── static/
```

Regular pages should be ordinary Markdown files such as `content/about.md`; use `_index.md` only for the homepage and section landing pages. This keeps Sibryl's page navigation aligned with Hugo routes.

Pages compose modules in their front matter. Each module is declared in `data/modules/` and rendered by its matching partial in `layouts/partials/modules/`. Shared navigation, actions, and company details live in `data/site/`.

## Design foundation

The site uses a Hugo-native translation of the shadcn design language. The semantic colour tokens (`--background`, `--foreground`, `--primary`, `--card`, and so on) live in `assets/styles/_tokens.scss`; reusable UI materials such as `.button` and `.card` live in `_components.scss`.

This keeps the familiar shadcn vocabulary without introducing React, Tailwind, a remote theme, or a separate build process that would make Sibryl previews fragile. The existing Sibryl mark is kept at `static/images/brand/sibryl-mark.png`.
