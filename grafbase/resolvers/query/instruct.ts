import { Context } from '@grafbase/sdk'
import { OpenAI } from 'langchain/llms/openai'

export default async function Resolver(_, { prompt }, { kv }: Context) {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct",
    openAIApiKey: process.env.OPENAI_API_KEY
  })

  try {
    const { value } = await kv.get(prompt)

    if (value === null) {
      const response = await model.invoke(prompt)
      await kv.set(prompt, response, { ttl: 60 })

      console.log(`uncached lookup: ${prompt}`)

      return response
    } else {
      console.log(`cached lookup for key: ${prompt}`)

      return value
    }
  } catch (e) {
    console.log(e)
    return "error"
  }
}
