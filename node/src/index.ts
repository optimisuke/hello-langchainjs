import { OpenAI } from "langchain/llms/openai";

// 環境変数
require("dotenv").config();

export const run = async () => {
  // LLMの準備
  const llm = new OpenAI({ temperature: 0.9 });

  // LLMの呼び出し
  const res = await llm.call(
    "コンピュータゲームを作る日本語の新会社名をを1つ提案してください"
  );
  console.log(res);
};
run();
