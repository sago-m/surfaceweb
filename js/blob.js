// blob.js — render the blob detail page based on ?id=...
function parseQuery(){
  const q = new URLSearchParams(location.search);
  return q.get('id');
}

async function loadBlob(){
  const id = parseQuery();
  if(!id){
    document.getElementById('blob-content').innerHTML = '<p class="blob-meta">No blob id provided.</p>';
    return;
  }
  try{
    // Attempt to fetch the individual blob file. Files live at data/blobs/{id}.json
    const path = `data/blobs/${encodeURIComponent(id)}.json`;
    const res = await fetch(path);
    if(!res.ok){
      // Fallback: try the index and locate the file entry
      const idx = await (await fetch('data/blobs.json')).json();
      const entry = idx.find(x => String(x.id) === String(id));
      if(entry && entry.file){
        const r2 = await fetch(entry.file);
        if(!r2.ok) throw new Error('Blob file not found');
        const b2 = await r2.json();
        renderBlob(b2);
        return;
      }
      throw new Error('Blob not found');
    }
    const b = await res.json();
    renderBlob(b);
  }catch(err){
    console.error(err);
    document.getElementById('blob-content').innerHTML = '<p class="blob-meta">Failed to load blob.</p>';
  }
}

function renderBlob(b){
  document.getElementById('blob-title').textContent = b.title || 'Blob';
  const el = document.getElementById('blob-content');
  // Use templates if available
  if(window.templates && typeof window.templates.render === 'function'){
    el.innerHTML = `
      <div class="blob-meta">ID: <strong>${escapeHtml(b.id)}</strong> &nbsp; • &nbsp; <span>${escapeHtml(b.summary)}</span></div>
      <div class="blob-meta">Published: <strong>${formatDate(b.published)}</strong></div>
      ` + window.templates.render(b, escapeHtml) + `
      <a class="back-link" href="index.html">← Back to all blobs</a>
    `;
  }else{
    el.innerHTML = `
      <div class="blob-meta">ID: <strong>${escapeHtml(b.id)}</strong> &nbsp; • &nbsp; <span>${escapeHtml(b.summary)}</span></div>
      <div class="blob-meta">Published: <strong>${formatDate(b.published)}</strong></div>
      <div class="blob-body">${escapeHtml(b.content).replace(/\n/g,'<br/>')}</div>
      <a class="back-link" href="index.html">← Back to all blobs</a>
    `;
  }
}

function formatDate(iso){
  try{
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'});
  }catch(e){return ''}
}

function escapeHtml(s){
  return String(s||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

loadBlob();
