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
## Note on artifact action deprecation

GitHub announced the deprecation of v3 of `actions/upload-artifact` and `actions/download-artifact` (customers should migrate to v4). This repository's Pages workflow uses the Pages-specific actions (`actions/upload-pages-artifact` and `actions/deploy-pages`) and does not reference `actions/upload-artifact` or `actions/download-artifact`, so no immediate change is required here.

If you have other workflows that use `actions/upload-artifact@v3` or `actions/download-artifact@v3`, update them to `@v4` as soon as possible. Example replacement:

```yaml
- name: Upload artifact
  uses: actions/upload-artifact@v4
  with:
    name: my-artifact
    path: ./path/to/files
```

See the `actions/upload-artifact` and `actions/download-artifact` repositories for migration notes and any input/output changes between v3 and v4.
