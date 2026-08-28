// templates.js — simple client-side templates for blob detail pages
window.templates = (function(){
  function escapeHtml(s){
    return String(s||'')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  return {
    render: function(b, esc){
      esc = esc || escapeHtml;
      var tpl = b.template || 'default';
      if(tpl === 'image'){
        var img = b.image ? '<div class="blob-hero"><img src="'+esc(b.image)+'" alt="'+esc(b.title)+'"/></div>' : '';
        var body = '<div class="blob-body">'+esc(b.content).replace(/\n/g,'<br/>')+'</div>';
        return img + body;
      }
      // default template
      return '<div class="blob-body">'+esc(b.content).replace(/\n/g,'<br/>')+'</div>';
    }
  };
})();
