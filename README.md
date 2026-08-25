SurfaceWeb — simple two-page blobs demo

What I added
- index.html: landing page that lists all blobs in a responsive grid.
- blob.html: detail page for a single blob; expects query parameter `id` (e.g. /blob.html?id=3).
- css/styles.css: styling for the site.
- js/main.js: fetches /data/blobs.json and renders the landing grid.
- js/blob.js: loads the selected blob and renders its details.
- data/blobs.json: sample blob data (6 example blobs).

How to use
1. Serve the repository statically (GitHub Pages, or a simple static server):
   - With Python 3: `python -m http.server` from the repository root and open http://localhost:8000
   - Or enable GitHub Pages for the `main` branch and browse https://<your-user>.github.io/surfaceweb/
2. Click any blob on the landing page to go to its detail page.

Notes & next steps
- If you have real blob data (API or CSV), replace data/blobs.json and the front-end will render it automatically.
- I can add thumbnails, pagination, or client-side search/filtering.
