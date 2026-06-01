import Parser from "rss-parser";
import { createClient } from "@supabase/supabase-js";

const parser = new Parser();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const FEEDS = [
  "https://www.ufabc.edu.br/noticias?format=feed&type=rss"
];

function cleanText(text = "") {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  for (const feedUrl of FEEDS) {
    const feed = await parser.parseURL(feedUrl);

    for (const item of feed.items.slice(0, 10)) {
      const title = item.title || "Sem título";
      const url = item.link;
      const summary = cleanText(item.contentSnippet || item.content || "").slice(0, 240);
      const published_at = item.isoDate || item.pubDate || new Date().toISOString();

      if (!url) continue;

      await supabase
        .from("news")
        .upsert(
          {
            title,
            summary,
            url,
            source: "UFABC",
            category: "Notícia",
            published_at
          },
          { onConflict: "url" }
        );
    }
  }

  console.log("Notícias atualizadas com sucesso.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});