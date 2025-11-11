# Deploying this project to GitHub Pages

This project contains a GitHub Actions workflow that builds the Vite app and deploys it to GitHub Pages.

What the workflow does

- Runs on push to `main`.
- Installs dependencies with `npm ci` and runs `npm run build`.
- Uploads the `dist` directory as the Pages artifact and deploys it using the official Pages actions.

Important Vite configuration

- `vite.config.ts` now reads `VITE_BASE` from the environment and uses it for the `base` option. This is required for project sites (when the site is served at `https://<owner>.github.io/<repo>/`).

Workflow configuration

- The workflow file is `.github/workflows/deploy.yml`.
- It sets `VITE_BASE` to `/github-actions-sandbox/` by default so the built files reference the correct subpath for this repo.

If your repository name or owner differs

- Update the `VITE_BASE` value in the workflow so it matches your repository path exactly. It must start and end with a slash, for example `/my-repo/`.

Published URL

If the repo is `PavlykRV/github-actions-sandbox` the site will be available at:

  https://PavlykRV.github.io/github-actions-sandbox/

If you'd like, I can also append these instructions to `README.md` instead of creating this file—tell me which you prefer.
