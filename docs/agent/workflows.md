# Workflows

## When to consult this file
When running, building, or deploying.

---

## Local

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # astro check — run before pushing
npm run build      # static build to dist/ (~6s incl. image optimization)
npm run preview    # serve dist/
npm run format     # prettier --write .
```

Node 24+ (CI uses 24).

## Build notes

The build optimizes ~56 source images into ~380 variants (AVIF/WebP/JPEG × widths). It takes a
few seconds locally and is cached in `.astro/` between runs; CI runs it cold every time.

`src/lib/images.ts` validates the image set at module load, so a missing or orphaned photo fails
the build with a message naming the file. That failure is intentional — fix the data or the
file, don't bypass the check.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` → `npm ci` → `npm run check` → `npm run build`
→ upload `dist/` → GitHub Pages. No manual step.

`astro check` runs **before** the build, so a type error fails the deploy rather than shipping.

### Environment

`PUBLIC_GTM_ID` is a **repository variable** (not a secret — it ends up in the client bundle by
design). Set it in Settings → Secrets and variables → Actions → Variables.

## Environments

| | Staging | Live (after cutover) |
|---|---|---|
| URL | `new.olandsstuguthyrning.com` | `olandsstuguthyrning.com` |
| `site` in astro.config.mjs | `https://new.olandsstuguthyrning.com` | `https://olandsstuguthyrning.com` |
| `public/CNAME` | `new.olandsstuguthyrning.com` | `olandsstuguthyrning.com` |
| Indexed? | No — `noindex` via hostname | Yes |

There is no `base` path in either environment; both use a custom domain, so both serve from the
domain root.

## Cutover to the live domain

Not a routine deploy. Follow [../project-plan.md](../project-plan.md) §8 exactly — in particular
the warning about leaving MX records alone, since `kontakt@olandsstuguthyrning.com` is a live
mailbox on the domain being repointed.

## How to contribute to this file
Update when a build or deploy step changes, or an npm script is added or renamed.
