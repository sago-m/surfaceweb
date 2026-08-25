SurfaceWeb — simple two-page blobs demo

What I changed
- Made all asset and data paths relative so the site works from a subpath (GitHub Pages):
  - css/styles.css, js/*.js and data/blobs.json are referenced with relative URLs.
  - Links to blob pages use `blob.html?id=...` and the back link uses `index.html`.

How to publish on GitHub Pages
1. Go to your repository settings → Pages.
2. Under "Build and deployment" select "Deploy from a branch" (or similar) and choose the `main` branch and the `/ (root)` folder.
3. Save. GitHub will publish the site. The site URL will be:
   - https://sago-m.github.io/surfaceweb/

Notes
- The site is fully static and works when served from a subpath because all asset and data URLs are relative.
- To preview locally run `python -m http.server` from the repo root and open http://localhost:8000

Next steps I can help with
- Add a custom 404 redirect to route pretty URLs to index.html if you convert to an SPA.
- Add Open Graph metadata for nicer sharing.
- Add thumbnails and search/filtering for large lists.
