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
    const res = await fetch('data/blobs.json');
    const blobs = await res.json();
    const b = blobs.find(x => String(x.id) === String(id));
    if(!b){
      document.getElementById('blob-content').innerHTML = '<p class="blob-meta">Blob not found.</p>';
      return;
    }
    renderBlob(b);
  }catch(err){
    console.error(err);
    document.getElementById('blob-content').innerHTML = '<p class="blob-meta">Failed to load blob.</p>';
  }
}

function renderBlob(b){
  document.getElementById('blob-title').textContent = b.title || 'Blob';
  const el = document.getElementById('blob-content');
  el.innerHTML = `
    <div class="blob-meta">ID: <strong>${escapeHtml(b.id)}</strong> &nbsp; • &nbsp; <span>${escapeHtml(b.summary)}</span></div>
    <div class="blob-body">${escapeHtml(b.content).replace(/\n/g,'<br/>')}</div>
  `;
}

function escapeHtml(s){
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/\"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

loadBlob();
