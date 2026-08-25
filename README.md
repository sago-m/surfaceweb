SurfaceWeb — modern UI, sorting and header/footer

What I added
- Updated the UI with a more modern header (brand, nav, search) and richer footer layout.
- Added sorting by published date (newest/oldest) and Title A–Z. A client-side search box filters blobs live.
- Display of published dates on the landing cards and blob detail page.

Files changed
- index.html — enriched header, search input, sort select, results count.
- blob.html — header aligned with the main site, shows published date in detail view.
- css/styles.css — new modern styling for header, toolbar, nav, cards, and footer.
- js/main.js — sorting, search, and improved rendering logic.
- js/blob.js — shows published date and improved formatting.
- data/blobs.json — sample blobs now include an ISO `published` field.

How to preview
1. Serve the repository root in a static server (e.g., `python -m http.server`).
2. Open http://localhost:8000 and try the search box and sort menu.

Next improvements you might like
- Add pagination or infinite scroll for very large blob lists.
- Allow sorting by other fields (e.g., relevance, id) or multi-criteria sorting.
- Add tags and tag-based filtering UI.
- Add thumbnails or image previews per blob.

If you want any of these, say which and I will implement it next.
