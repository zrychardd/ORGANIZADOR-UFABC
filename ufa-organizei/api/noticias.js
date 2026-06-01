import { GoogleGenerativeAI } from "@google/generative-ai";
import * as cheerio from "cheerio";
import { createClient } from '@supabase/supabase-js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // 1. Segurança
  if (req.headers.authorization !== `Bearer ${process.env.ROBO_SECRET}`) {
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    // 2. Extração via Proxy Direto
    const urlParaBuscar = "https://www.ufabc.edu.br/noticias";
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(urlParaBuscar)}`;

    const response = await fetch(proxyUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    // Trava de segurança: Se o proxy der erro, ele nos avisa o motivo exato
    if (!response.ok) {
      const erroTexto = await response.text();
      throw new Error(`Falha no proxy (${response.status}): ${erroTexto.substring(0, 100)}`);
    }

    // Agora recebemos o HTML direto, sem precisar de JSON
    const html = await response.text();
    const $ = cheerio.load(html);

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
    // Variável renomeada para 'supabaseData' para evitar conflito
    const { data: supabaseData, error } = await supabase
      .from('noticias_ufabc')
      .insert([{ titulo, resumo, imagem_url: imagem, link_original: link }]);

    if (error) throw error;

    res.status(200).json({ success: true, titulo });
  } catch (error) {
    console.error("ERRO DO ROBÔ:", error); 
    res.status(500).json({ 
      error: error.message, 
      detalhe: "O erro ocorreu durante a execução do robô" 
    });
  }
}