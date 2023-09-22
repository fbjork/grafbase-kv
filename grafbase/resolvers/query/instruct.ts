import { OpenAI } from 'langchain/llms/openai'

export default async function Resolver(_, { prompt }, { kv }) {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct",
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const value = await kv.get(prompt)

    if (value === undefined) {
      const response = await model.invoke(prompt)
      await kv.put(prompt, response)
      return response
    } else {
      return value
    }
  } catch (e) {
    console.log(e)
    return "error"
  }
}
