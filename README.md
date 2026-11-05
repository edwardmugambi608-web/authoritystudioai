<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bc941acb-348a-4b44-8fc5-8b9aceb15340

## Run Locally

**Prerequisites:** Node.js 22+

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env](.env) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Deploy to Render (Dockerized)

This repository includes a production-ready `Dockerfile` and `render.yaml` blueprint.

### Option 1: Automatic Blueprint (Recommended)
1. Push this repository to GitHub / GitLab.
2. In your Render Dashboard, click **New +** &rarr; **Blueprint**.
3. Select your repository. Render will automatically detect `render.yaml` and configure the Docker web service.
4. Set your `GEMINI_API_KEY` environment variable in the dashboard.
5. Click **Apply** to deploy!

### Option 2: Manual Web Service
1. In Render, select **New +** &rarr; **Web Service**.
2. Connect your repository.
3. Select **Docker** as the Runtime.
4. Health Check Path: `/api/health`
5. Add Environment Variable:
   - `GEMINI_API_KEY`: Your Gemini API key
6. Click **Create Web Service**.

---

## Deploy Sales Pages to Firebase Hosting

The `/salespages` folder contains an independent, static marketing funnel:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize hosting in this directory:
   - Set public directory to: `salespages`
   - Configure as single-page app: `No`
4. Deploy: `firebase deploy --only hosting`
