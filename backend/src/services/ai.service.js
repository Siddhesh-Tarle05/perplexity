import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage,AIMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});
const Mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

// export async function generateResponse(messages) {

//   const response = await geminiModel.invoke(messages.map(msg => {
//     console.log(msg)
//      console.log("genearting")
//         if (msg.role == "user") {
//             return new HumanMessage(msg.content)
//         } else if (msg.role == "ai") {
//             return new AIMessage(msg.content)
//         }
      
//     }));
//     console.log(response.text)
//   return response.text
// }
export async function generateResponse(messages) {
  try {
    const response = await Mistralmodel.invoke(
      messages.map(msg => {
        console.log(msg)
        console.log("generating")

        if (msg.role === "user") {
          return new HumanMessage(msg.content)
        } else if (msg.role === "ai") {
          return new AIMessage(msg.content)
        }
      })
    )

    console.log("AI RESPONSE:", response.text)
    return response.text

  } catch (error) {
    console.error("MISTRAL ERROR:", error.message)

    return "⚠️ AI is currently unavailable. Try again later."
  }
}
export async function generateTitle(message) {
  // console.log(message)
   
  const response= await Mistralmodel.invoke([
    new SystemMessage(`You are a helpful assistant that generates a concise and descriptive title for a given message. The title should capture the essence of the message in a few words. `),
    new HumanMessage(`generate title for this message: ${message}`)
  ])
  console.log(response.text)
  return response.text
}