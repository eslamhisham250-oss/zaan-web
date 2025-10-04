# Zaan Web (Standalone, fixed)

Fully working **Next.js** web app with **built-in mock API**. No external backend needed.
To switch to a real backend later, set `NEXT_PUBLIC_API_URL` to your server URL.

## Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Switch to real backend
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```
Restart dev server.

## Troubleshooting
- Use Node 18 LTS.
- If errors: delete `.next`, `node_modules`, `package-lock.json`, then reinstall.
