---
description: Deploy a product to production after QA sign-off
argument-hint: "<product name or target URL>"
---

# /product-deploy

> See [CONNECTORS.md](../CONNECTORS.md) — uses `~~publishing`, `~~chat`, and `~~email marketing`.

## Workflow

### Step 1: Pre-Deploy Checklist

Confirm QA is complete before deploying:

- [ ] All pages load without errors
- [ ] Primary user flow works end-to-end
- [ ] Mobile layout correct
- [ ] CTAs link to correct destinations
- [ ] Payment/checkout works (if applicable)
- [ ] Email capture works (if applicable)
- [ ] Meta title, description, and OG image set
- [ ] No console errors

If any item is unchecked: **do not deploy**. Fix first, or explicitly confirm override.

### Step 2: Deploy

Use `~~publishing` connector:
- Push to production via git (Vercel/Netlify auto-deploy)
- Or trigger deploy command for the configured platform

### Step 3: Verify Production

After deploy:
1. Open the production URL and confirm it loads
2. Test the primary user flow end-to-end in production
3. Confirm no build errors in deployment logs

### Step 4: Announce (optional)

If `~~chat` connected: send launch notification to team channel.
If `~~email marketing` connected: offer to notify waitlist or subscriber list.

### Step 5: Log the Launch

Record in project notes:
- Date deployed
- What shipped (version / feature / product)
- Production URL
- Any issues found post-deploy

Suggest: "Set a `/product-retro` reminder in 30 days to review performance."
