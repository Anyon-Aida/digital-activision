// Nati – egyszerű kliens logika, streaming olvasással és localStorage történettel

const els = {
  messages: document.getElementById('messages'),
  composer: document.getElementById('composer'),
  prompt: document.getElementById('prompt'),
  sendBtn: document.getElementById('sendBtn'),
  status: document.getElementById('status'),
  newChat: document.getElementById('newChat'),
  clearChat: document.getElementById('clearChat'),
  newChatTop: document.getElementById('newChatTop'),
  aboutBtn: document.getElementById('aboutBtn'),
  aboutPane: document.getElementById('aboutPane'),
  aboutClose: document.getElementById('aboutClose'),
  fab: document.getElementById('fab'),
};

const STORAGE_KEY = 'nati:history:v1';

let history = loadHistory();
renderHistory();

function loadHistory(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [{role:'assistant', content:'Szia! Én **Nati** vagyok. Miben segíthetek? 😊'}];
  }catch(_){ return []; }
}
function saveHistory(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); }catch(_){}
}
function resetChat(){
  history = [{role:'assistant', content:'Szia! Én **Nati** vagyok. Miben segíthetek? 😊'}];
  els.messages.innerHTML = '';
  renderHistory();
  autosize();
}

function md(str){
  // nagyon egyszerű markdown -> HTML (csak **bold**, sorvégek)
  return str.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');
}

function appendMessage(role, html, klass=''){
  const row = document.createElement('div');
  row.className = `msg ${role==='user'?'user':'ai'} ${klass}`.trim();
  const bub = document.createElement('div');
  bub.className = 'bubble';
  bub.innerHTML = html;
  row.appendChild(bub);
  els.messages.appendChild(row);
  els.messages.scrollTop = els.messages.scrollHeight;
  return bub;
}

function renderHistory(){
  els.messages.innerHTML = '';
  for(const m of history){
    appendMessage(m.role, md(m.content));
  }
}

function setTyping(on){
  els.status.textContent = on ? 'Gépeli…' : 'Online';
}

function autosize(){
  const t = els.prompt;
  t.style.height = 'auto';
  t.style.height = Math.min(t.scrollHeight, 180) + 'px';
}

/* ---- küldés ---- */
els.composer.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const text = els.prompt.value.trim();
  if(!text) return;
  els.prompt.value = '';
  autosize();

  history.push({role:'user', content:text});
  appendMessage('user', md(text));
  saveHistory();

  // Typing placeholder
  const holder = appendMessage('assistant', `<span class="typing"><span></span><span></span><span></span></span>`);
  setTyping(true);

  try{
    const reply = await streamChat(history, holder);
    history.push({role:'assistant', content:reply});
    saveHistory();
  }catch(err){
    holder.innerHTML = 'Hiba történt. Próbáld újra.';
    holder.parentElement.classList.add('error');
    console.error(err);
  }finally{
    setTyping(false);
  }
});

els.prompt.addEventListener('input', autosize);
els.prompt.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    els.composer.requestSubmit();
  }
});

/* ---- új/törlés ---- */
[els.newChat, els.newChatTop].forEach(btn=>{
  btn?.addEventListener('click', resetChat);
});
els.clearChat?.addEventListener('click', ()=>{
  if(confirm('Biztosan törlöd a teljes előzményt?')){
    localStorage.removeItem(STORAGE_KEY);
    resetChat();
  }
});

/* ---- about panel ---- */
els.aboutBtn?.addEventListener('click', ()=> els.aboutPane.hidden = false);
els.aboutClose?.addEventListener('click', ()=> els.aboutPane.hidden = true);

/* ---- lebegő gomb görgessen a chathez ---- */
els.fab?.addEventListener('click', ()=>{
  document.getElementById('chat').scrollIntoView({behavior:'smooth', block:'start'});
  els.prompt?.focus({preventScroll:true});
});

/* =========================================================
   Streaming kliens – /api/chat-re POST-ol, vissza SSE-szerű streamet vár
   Ha nincs szerver (404), "mock" módra vált
========================================================= */
async function streamChat(messages, holderEl){
  const supportsStream = !!(window.ReadableStream && window.TextDecoder);
  let acc = '';

  // backend felé a minimális üzenetlista
  const body = JSON.stringify({ messages: messages.map(m=>({role:m.role, content:m.content})) });

  try{
    const res = await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body
    });

    if(!res.ok) throw new Error('Bad response: '+res.status);

    if(supportsStream && res.body){
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while(true){
        const {value, done} = await reader.read();
        if(done) break;
        const chunk = decoder.decode(value, {stream:true});

        // szerver SSE: "data: { delta: '...' }"
        for(const line of chunk.split('\n')){
          const m = line.match(/^data:\s*(.+)$/);
          if(m){
            try{
              const j = JSON.parse(m[1]);
              if(j.delta){ acc += j.delta; holderEl.innerHTML = md(acc); }
              if(j.done){ break; }
            }catch(_){}
          }
        }
      }
    }else{
      // fallback: egészben jön
      const j = await res.json();
      acc = j.reply || '';
      holderEl.innerHTML = md(acc);
    }

    return acc || '(nincs válasz)';
  }catch(err){
    // MOCK mód: ha nincs /api/chat, adjunk vissza egy mintaválaszt
    if(err.message && err.message.includes('Failed to fetch') || (err.message||'').includes('404')){
      acc = `Ez egy *bemutató* válasz, mert nincs beállítva a szerver.\n\nA kérdésed: **${messages.at(-1).content}**`;
      holderEl.innerHTML = md(acc);
      return acc;
    }
    throw err;
  }
}

// első fókusz és autoheight
autosize();
