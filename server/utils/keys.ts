import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

export const openAIApiKey = process.env.OPENAI_API_KEY as string;

export const llm = new ChatOpenAI({ openAIApiKey, modelName: "gpt-4o-mini" });
const sbApiKey = process.env.SUPABASE_API_KEY as string;
const sbUrl = process.env.SUPABASE_PROJECT_URL as string;
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});
const sbClient = createClient(sbUrl, sbApiKey);
export const vectorStore = new SupabaseVectorStore(embeddings, {
  client: sbClient,
  tableName: "therapistai_swapnilmkab_gmail",
  queryName: "match_therapistai_swapnilmkab_gmail",
});
export const combineDocs = (docs: any) => {
  return docs.map((doc: any) => doc.pageContent).join("\n\n");
};
