import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { z } from 'zod'
import { SearchInternet } from "./internet.service.js";
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});
const Mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(SearchInternet,
  {
    name: 'searchInternet',
    description: 'A tool to search the internet for up-to-date information. Use this tool when you need to find current information or verify facts.',
    schema: z.object({
      query: z.string().describe('The search query to find relevant information on the internet.')
    })
  }
)
const agent = createReactAgent({
  llm: Mistralmodel,
  tools: [searchInternetTool],
})
export async function generateResponse(messages) {
  const response = await agent.invoke({
    messages: [
      new SystemMessage(`
        Answer ONLY the latest user question.
        Do NOT include previous answers.
      `),

      ...messages
        .slice(-2) 
        .map(msg => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          } else if (msg.role === "assistant") {
            return new AIMessage(msg.content);
          }
          return null;
        })
        .filter(Boolean)
    ]
  });

  return response.messages.at(-1)?.content || "No response";
}


// export async function generateResponse(messages) {
//   try {
//     const response = await Mistralmodel.invoke(
//       messages.map(msg => {
//         console.log(msg)
//         console.log("generating")

//         if (msg.role === "user") {
//           return new HumanMessage(msg.content)
//         } else if (msg.role === "ai") {
//           return new AIMessage(msg.content)
//         }
//       })
//     )

//     console.log("AI RESPONSE:", response.text)
//     return response.text

//   } catch (error) {
//     console.error("MISTRAL ERROR:", error.message)

//     return "⚠️ AI is currently unavailable. Try again later."
//   }
// }





export async function generateTitle(message) {
  // console.log(message)

  const response = await Mistralmodel.invoke([
    new SystemMessage(`You are a helpful assistant that generates a concise and descriptive title for a given message. The title should capture the essence of the message in a few words. `),
    new HumanMessage(`generate title for this message: ${message}`)
  ])
  console.log(response.text)
  return response.text
}