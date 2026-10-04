# GBP Automation Dashboard

## What's new in this update
- All 6 tabs are now real, clickable pages (not just labels)
- Approval Queue is fully functional: approve/deny buttons actually update the database
- A "+ Add 2 test items" button on the Approval Queue lets you test it before n8n is connected (remove this later)

## Before deploying this update
Run the ADDITIONAL section at the bottom of `supabase/schema.sql` (the `content_items` table) in Supabase SQL Editor — the businesses table part you already ran, no need to rerun that.

## Deploying an update to an existing GitHub repo
1. On GitHub, open your existing `gbp-dashboard` repo
2. Delete the old files (select all, delete, commit) OR delete the whole repo and recreate it
3. Upload these new files the same way as before (go inside this unzipped folder, select everything inside, drag onto GitHub's upload page)
4. Vercel will auto-deploy from the new commit
