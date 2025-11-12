import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // base can be configured via the VITE_BASE environment variable so
    // builds targeting GitHub Pages (project sites) can set the repository
    // subpath (e.g. '/my-repo/'). Defaults to '/'.
    base: './',
    plugins: [react()],
    define: {
      // Make the environment variables available in the client code
      'import.meta.env.TEST_ENV_VARIABLE': JSON.stringify(env.TEST_ENV_VARIABLE)
    }
  };
});
