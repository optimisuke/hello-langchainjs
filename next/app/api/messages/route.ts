import { NextResponse } from "next/server";
import { BufferWindowMemory, ChatMessageHistory } from "langchain/memory";
import { AIMessage, HumanMessage } from "langchain/schema";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

export const Role = {
  Assistant: "assistant",
  User: "user",
} as const;

export type Message = {
  id: number;
  content: string;
  role: (typeof Role)[keyof typeof Role];
};

// メモリ上にチャット履歴を保持する
const messages: Message[] = [];

// GET /api/messagesにマッピングされる
export async function GET() {
  return NextResponse.json({ messages: messages });
}

// POST /api/messagesにマッピングされる
export async function POST(req: Request) {
  // 入力内容の取得
  const { message: userMessageContent } = await req.json();

  // 対話履歴をLangChain用に変換
  const chatMessageHistory = new ChatMessageHistory(
    messages.map((message) => {
      return message.role === Role.Assistant
        ? new AIMessage(message.content)
        : new HumanMessage(message.content);
    })
  );
  const memory = new BufferWindowMemory({
    k: 4, // 過去4回分の対話を使用する
    chatHistory: chatMessageHistory,
  });
  // 生成用のmodelを作成する。
  // openAIApiKeyを指定しない場合、環境変数内のOPENAI_API_KEYに設定した値を読み取ってくれる
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    // openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // 対話用Chainに過去の対話履歴を埋め込んで作成し、呼び出す
  const chain = new ConversationChain({
    llm: model,
    memory: memory,
    verbose: false, // verboseをtrueにすると処理内容などが出力される
  });
  const chainResult = await chain.call({ input: userMessageContent });
  const assistantMessageContent = chainResult.response;

  // メモリ上のチャット履歴にメッセージを追加
  const userMessage = {
    id: messages.length + 1,
    content: userMessageContent,
    role: Role.User,
  };
  messages.push(userMessage);
  const assistantMessage = {
    id: messages.length + 1,
    content: assistantMessageContent,
    role: Role.Assistant,
  };
  messages.push(assistantMessage);

  return new Response();
}
