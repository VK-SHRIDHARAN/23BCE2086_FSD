Render deployment checklist
==========================

Follow these steps to deploy backend and both frontends to Render using the included `render.yaml`.

1) Import the repo using the Render YAML
   - Go to https://dashboard.render.com
   - Click New → Import from Render YAML
   - Select this repository and confirm
   - Render will create three services (backend, user frontend, admin frontend) as defined in `render.yaml`.

2) Set environment variables in Render
   - After services are created open each service and set the env vars (Dashboard → Environment):
     - Backend service (`foodprep-backend`):
       - `DB_URI` = your MongoDB Atlas connection string
       - `JWT_TOKEN_SECRET` = secure secret (>=32 chars)
       - `STRIPE_SECRET_KEY` = your Stripe secret key
       - `FRONTEND_URL` = the public user frontend URL you will get after the static site deploy
     - Frontend services (`foodprep-user-frontend`, `foodprep-admin-frontend`):
       - `VITE_API_URL` = `https://<your-backend-render-url>`

3) Deploy order
   - First: Deploy the backend service so it has a public URL.
   - Second: Update `VITE_API_URL` in both frontend services to the backend public URL.
   - Third: Deploy both static site services.

4) Optional: GitHub Actions
   - This repo already has simple GitHub Actions that will call Render deploy hooks if you set them in GitHub Secrets:
     - `RENDER_BACKEND_DEPLOY_HOOK`
     - `RENDER_USER_FRONTEND_DEPLOY_HOOK`
     - `RENDER_ADMIN_FRONTEND_DEPLOY_HOOK`
   - To enable: create a deploy hook in each Render service (Service → Settings → Deploy Hooks) and paste the hook URL into the corresponding GitHub secret.

5) Smoke tests
   - Open user frontend URL: browse menu, register/login, add items to cart, place order.
   - Open admin frontend URL: add/list items and view orders.

Notes
-----
- This repo uses local `uploads/` for images. Render's instances persist files for the lifetime of that VM, but if you scale to multiple instances or redeploy often consider moving uploads to Cloudinary or similar.
- If you prefer, I can add a GitHub Action to automatically set deploy hooks or call the Render API — tell me if you want that.
