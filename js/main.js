// main.js — renders the landing grid of blobs with sorting and search
let blobsCache = [];
let filtered = [];

async function loadBlobs(){
  try{
    const res = await fetch('data/blobs.json');
    const blobs = await res.json();
    // ensure published is present and parseable
    blobs.forEach(b => { if(!b.published) b.published = '1970-01-01T00:00:00Z'; });
    blobsCache = blobs;
    filtered = blobs.slice();
    setupControls();
    applySort('newest');
    renderGrid(filtered);
  }catch(err){
    console.error(err);
    document.getElementById('blobs').innerHTML = '<p class="muted">Failed to load blobs.</p>';
  }
}

function setupControls(){
  const sort = document.getElementById('sort');
  const search = document.getElementById('search');
  sort.addEventListener('change', e => {
    applySort(e.target.value);
    renderGrid(filtered);
  });
  search.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    if(!q){ filtered = blobsCache.slice(); }
    else{
      filtered = blobsCache.filter(b => (b.title+b.summary+b.content).toLowerCase().includes(q));
    }
    // keep current sort
    applySort(document.getElementById('sort').value);
    renderGrid(filtered);
  });
}

function applySort(mode){
  if(!filtered) return;
  if(mode === 'newest'){
    filtered.sort((a,b) => new Date(b.published) - new Date(a.published));
  }else if(mode === 'oldest'){
    filtered.sort((a,b) => new Date(a.published) - new Date(b.published));
  }else if(mode === 'title-asc'){
    filtered.sort((a,b) => String(a.title).localeCompare(String(b.title)));
  }
}

function renderGrid(blobs){
  const container = document.getElementById('blobs');
  const countEl = document.getElementById('result-count');
  countEl.textContent = `${blobs.length} blob${blobs.length===1?'':'s'}`;

  if(!blobs || blobs.length===0){
    container.innerHTML = '<p class="muted">No blobs found.</p>';
    return;
  }

  container.innerHTML = blobs.map(b => `
    <a class="card" href="blob.html?id=${encodeURIComponent(b.id)}">
      <div>
        <div class="title">${escapeHtml(b.title)}</div>
        <div class="summary">${escapeHtml(b.summary)}</div>
      </div>
      <div class="meta">
        <div class="meta-date">${formatDate(b.published)}</div>
        <div class="meta-id">#${escapeHtml(b.id)}</div>
      </div>
    </a>
  `).join('');
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

loadBlobs();
