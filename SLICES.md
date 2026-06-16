# Gitlestial — Vertical Slices

| Slice | Status |
|-------|--------|
| v2 Commander CLI | ✅ |
| `changelog` command | ✅ |
| `commit-msg` guide | ✅ |
| Git passthrough | ✅ |
| `commit-gen` removed | ✅ |
| Vitest unit tests | ✅ |
| Landing + `/docs` | ✅ |
| CI + release workflows | ✅ |
| `robots.txt` + sitemap | ✅ |
| `hook-template` command | ✅ |
| Vercel deploy | ✅ [gitlestial.vercel.app](https://gitlestial.vercel.app) |
| npm publish `@techlestial/gitlestial@2` | ✅ [2.0.0](https://www.npmjs.com/package/@techlestial/gitlestial) |

## CD

- Push to `master` → GitHub Actions `CI`
- Tag `v2.0.0` → `release.yml` publishes to npm (set `NPM_TOKEN` in repo secrets)
- Connect repo to Vercel → `gitlestial.vercel.app`

## Next lap (Boy Scout)

- `gitlestial hooks install` (writes hook automatically)
- favicon.svg on landing
