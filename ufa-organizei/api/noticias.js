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
    // 2. Extração: Lê o site da UFABC
    const response = await fetch("https://www.ufabc.edu.br/noticias");
    const html = await response.text();
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