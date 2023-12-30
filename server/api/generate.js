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
  const messages = body.messages || []
  // if (messages.length === 0) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Please enter a valid message',
  //   })
  // }

  try {
    const completion = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-1106:personal::8bE4EUwv',
      temperature: 0.1,
      messages
    })
    return {
      result: completion.choices[0].message,
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
