// npm i express cors dotenv node-fetch@3
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

// statikus fájlok (frontend)
app.use(express.static('./')); // ha index.html itt van

app.post('/api/chat', async (req, res) => {
  const messages = req.body?.messages ?? [];
  if(!process.env.OPENAI_API_KEY){
    return res.status(500).json({error:'OPENAI_API_KEY hiányzik (.env)!'});
  }

  // SSE fejlécek a kliens felé
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  const sysPrompt = `Te Nati vagy, barátságos magyar nyelvű ügyfélszolgálati AI.
- Légy tömör, segítőkész, és ha kell, kérdezz vissza.
- Használj egyszerű formázást (**kiemelés**), rövid felsorolásokat, de ne túl sokat.
- Ha nincs elég adat, kérj pontosítást.`;

  try{
    const oai = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',     // gyors, olcsó, jó minőség
        stream: true,
        messages: [
          {role:'system', content: sysPrompt},
          ...messages
        ]
      })
    });

    if(!oai.ok){
      const txt = await oai.text();
      res.write(`data: ${JSON.stringify({delta:'', error:txt})}\n\n`);
      return res.end();
    }

    for await (const chunk of oai.body){
      const s = chunk.toString('utf8');
      // OAI SSE-t továbbítjuk változatlan formában
      // “data: {choices:[{delta:{content:"…"}}]}”
      for(const line of s.split('\n')){
        const m = line.match(/^data:\s*(.+)$/);
        if(!m) continue;
        if(m[1] === '[DONE]'){ res.write(`data: ${JSON.stringify({done:true})}\n\n`); return res.end(); }
        try{
          const j = JSON.parse(m[1]);
          const delta = j?.choices?.[0]?.delta?.content ?? '';
          if(delta){
            res.write(`data: ${JSON.stringify({delta})}\n\n`);
          }
        }catch(_){}
      }
    }

    res.write(`data: ${JSON.stringify({done:true})}\n\n`);
    res.end();
  }catch(err){
    res.write(`data: ${JSON.stringify({error:String(err)})}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, ()=> console.log('Nati server running on http://localhost:'+PORT));
