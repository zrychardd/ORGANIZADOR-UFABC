import Parser from "rss-parser";
import { createClient } from "@supabase/supabase-js";

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent": "Mozilla/5.0 UFA-ORGANIZEI-NewsBot",
  },
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const FEEDS = [
  "https://www.ufabc.edu.br/noticias?format=feed&type=rss",
];

function cleanText(text = "") {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function parseFeedWithRetry(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await parser.parseURL(url);
    } catch (error) {
      console.log(`Tentativa ${attempt} falhou: ${error.message}`);

      if (attempt === retries) throw error;

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

async function main() {
  for (const feedUrl of FEEDS) {
    const feed = await parseFeedWithRetry(feedUrl);

    for (const item of feed.items.slice(0, 10)) {
      const title = item.title || "Sem título";
      const url = item.link;
      const summary = cleanText(item.contentSnippet || item.content || "").slice(0, 240);
      const published_at = item.isoDate || item.pubDate || new Date().toISOString();

      if (!url) continue;

      const { error } = await supabase.from("news").upsert(
        {
          title,
          summary,
          url,
          source: "UFABC",
          category: "Notícia",
          published_at,
        },
        { onConflict: "url" }
      );

      if (error) {
        console.error("Erro ao salvar notícia:", error.message);
      }
    }
  }

  console.log("Notícias atualizadas com sucesso.");
}

main().catch((error) => {
  console.error("Erro final:", error.message);
  process.exit(1);
});