import { tavily as Tavily } from "@tavily/core"

export const SearchInternet = async ({ query }) => {
    // Initialize lazily so dotenv has already loaded the key
    const tavily = Tavily({
        apiKey: process.env.TAVILY_API_KEY
    })
    const result = await tavily.search(query, {
        maxResults: 5,
    })
    console.log(JSON.stringify(result))
    return JSON.stringify(result)
}