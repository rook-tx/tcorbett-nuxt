import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default defineEventHandler(async (event) => {
  // if (!openai.apiKey) {
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: 'OpenAI API key not configured, please follow instructions in README.md',
  //   })
  // }

  const body = await readBody(event)
  const topic = body.topic || ''
  if (topic.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter a valid topic',
    })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: generatePrompt(topic),
        }
      ]
      // max_tokens: 256
    })
    return {
      result: completion.choices[0].message.content,
    }
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.message
      })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      throw createError({
        statusCode: 500,
        statusMessage: 'An error occurred during your request.',
      })
    }
  }

})

function generatePrompt(topic) {
  return `Explain succinctly but humorously the relation between ${topic} and remote-working web developer Tom Corbett`
}
