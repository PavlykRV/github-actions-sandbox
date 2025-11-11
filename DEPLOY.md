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
- The workflow computes `VITE_BASE` dynamically from the repository name so you don't need to hardcode the repo path.

Environments and environment-scoped variables

- The workflow uses GitHub Environments to load environment-scoped secrets. It chooses an environment in this order:
  1. `workflow_dispatch` input named `environment` (if you run the workflow manually), or
  2. `main` branch => `production`, any other branch => `staging`.

- Create two Environments in the repository settings named `production` and `staging` (Settings → Environments). In each environment add a secret named `TEST_ENV_VARIABLE` with the appropriate value for that environment.

- During the run the job is assigned to the chosen Environment and the secret `TEST_ENV_VARIABLE` will be available as `secrets.TEST_ENV_VARIABLE`. The workflow exports it into the environment so Vite can read it during build.

Separate staging/production workflows

- I split the single workflow into two files so each one is simple and only runs for its branch:
  - `.github/workflows/deploy-staging.yml` — triggers on `develop` (and manual runs), uses the `staging` Environment.
  - `.github/workflows/deploy-production.yml` — triggers on `main` (and manual runs), uses the `production` Environment.

Reading and passing multiple environment-scoped secrets

- GitHub exposes environment-scoped secrets to a job only when that job's `environment` matches. The workflow exports the secret named `TEST_ENV_VARIABLE` into the build environment so Vite can read it.
- Important limitation: GitHub Actions does not provide a way inside a workflow to enumerate environment-scoped secret names and automatically export all values. To export additional secrets you have three options:
  1. Add more explicit export steps in the workflow. Example (for secret named `ANOTHER_VAR`):

     - name: Export ANOTHER_VAR
       run: |
         if [ -n "${{ secrets.ANOTHER_VAR }}" ]; then
           echo "ANOTHER_VAR=${{ secrets.ANOTHER_VAR }}" >> $GITHUB_ENV
         fi

  2. Use a fixed list of expected secret names and add corresponding steps to export them.
  3. If you require dynamic listing, you must use an external controller (script or GitHub App) to read environment secret names and inject them into the workflow via inputs — this is more complex and typically unnecessary.

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
