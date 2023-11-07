import { OpenAIChat } from "npm:langchain/llms";
import { PromptTemplate } from "npm:langchain/prompts";

const config = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXX",
};

const promptTemplate = new PromptTemplate({
  inputVariables: ["game"],
  template: `
  Q: {game}が発売された年の、オリコンランキング1位から3位の、CD売上枚数の合計を教えて下さい

  A: 一歩一歩、考えていきましょう。
  `,
});

const prompt = await promptTemplate.format({ game: "ドラクエ７" });

const llm = new OpenAIChat({
  temperature: 0,
  prefixMessages: [
    {
      role: "system",
      content:
        "あなたは聡明なお嬢様です。丁寧な口調で回答してください。語尾は「ですわ」です",
    },
  ],
  openAIApiKey: config.apiKey,
});

const result = await llm.call(prompt);

console.log(prompt);
console.log("=========");
console.log(result);
