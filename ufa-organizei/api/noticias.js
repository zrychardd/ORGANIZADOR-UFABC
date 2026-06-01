import { GoogleGenerativeAI } from "@google/generative-ai";
import * as cheerio from "cheerio";
import { createClient } from '@supabase/supabase-js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // 1. Segurança: Verifica se quem chamou o robô tem a senha
  if (req.headers.authorization !== `Bearer ${process.env.ROBO_SECRET}`) {
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    // 2. Extração: Lê o site da UFABC com User-Agent para evitar bloqueios
    // ... dentro do try { ...
    const response = await fetch("https://www.ufabc.edu.br/noticias", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive"
      },
      redirect: 'follow'
    });

    if (!response.ok) throw new Error(`Status do site: ${response.status}`);
    
    const html = await response.text();
// ... resto do código
    const $ = cheerio.load(html);

    // Nota: Os seletores dependem da estrutura do site da UFABC
    const primeiraNoticia = $('.tile-item').first();
    const link = primeiraNoticia.find('a').attr('href');
    const titulo = primeiraNoticia.find('.tile-headline').text().trim();
    const imagem = primeiraNoticia.find('img').attr('src');

    // 3. IA: Pede o resumo para o Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Resuma esta notícia em 2 frases curtas: ${titulo}`;
    const result = await model.generateContent(prompt);
    const resumo = result.response.text();

    // 4. Banco: Salva no Supabase
    const { data, error } = await supabase
      .from('noticias_ufabc')
      .insert([{ titulo, resumo, imagem_url: imagem, link_original: link }]);

    res.status(200).json({ success: true, titulo });
  } catch (error) {
    // Isso fará o erro completo aparecer no painel de Logs da Vercel
    console.error("ERRO DO ROBÔ:", error); 
    
    // Isso nos dará mais detalhes no teste do cron-job.org
    res.status(500).json({ 
      error: error.message, 
      stack: error.stack,
      detalhe: "O erro ocorreu durante a execução do robô" 
    });
  }
}