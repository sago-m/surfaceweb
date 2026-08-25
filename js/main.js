// main.js — renders the landing grid of blobs
async function loadBlobs(){
  try{
    const res = await fetch('/data/blobs.json');
    const blobs = await res.json();
    renderGrid(blobs);
  }catch(err){
    console.error(err);
    document.getElementById('blobs').innerHTML = '<p class="muted">Failed to load blobs.</p>';
  }
}

function renderGrid(blobs){
  const container = document.getElementById('blobs');
  if(!blobs || blobs.length===0){
    container.innerHTML = '<p class="muted">No blobs found.</p>';
    return;
  }

  container.innerHTML = blobs.map(b => `
    <a class="card" href="/blob.html?id=${encodeURIComponent(b.id)}">
      <div class="title">${escapeHtml(b.title)}</div>
      <div class="summary">${escapeHtml(b.summary)}</div>
    </a>
  `).join('');
}

function escapeHtml(s){
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

loadBlobs();
