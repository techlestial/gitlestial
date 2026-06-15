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
| Vercel deploy | ⏳ push + connect project |
| npm publish `@techlestial/gitlestial@2` | ⏳ tag `v2.0.0` + `NPM_TOKEN` secret |

## CD

- Push to `master` → GitHub Actions `CI`
- Tag `v2.0.0` → `release.yml` publishes to npm (set `NPM_TOKEN` in repo secrets)
- Connect repo to Vercel → `gitlestial.vercel.app`

## Next lap (Boy Scout)

- `gitlestial hooks install` (writes hook automatically)
- favicon.svg on landing
