import { defineConfig } from 'astro/config';

// Deploying to https://<username>.github.io (a repo named <username>.github.io) needs no `base`.
// If you ever host it under a sub-path (e.g. a project repo), add: base: '/repo-name'
export default defineConfig({
  site: 'https://shawn207.github.io',
});
