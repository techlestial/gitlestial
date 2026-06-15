# @techlestial/gitlestial

**Gitlestial v2** — git productivity CLI: changelog, conventional commit guides, and full git passthrough.

- **Site:** [gitlestial.vercel.app](https://gitlestial.vercel.app) (deploy after push)
- **Docs:** `/docs` on the site

## Install

```sh
npm i -g @techlestial/gitlestial
```

## Commands

```sh
gitlestial changelog
gitlestial changelog --from v1.0.0 --out CHANGELOG.md
gitlestial commit-msg --scope api
gitlestial status   # passthrough to git
```

## Develop

```sh
npm install
npm run build
npm test
node dist/cli.js changelog -n 10
```

## v2 breaking change

`commit-gen` was removed. Use real commits with conventional commit format.

MIT · [@techlestial](https://github.com/techlestial)
