import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
  if (!configuration.apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key not configured, please follow instructions in README.md',
    })
  }

  const body = await readBody(event)
  const animal = body.animal || ''
  if (animal.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter a valid animal',
    })
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(animal),
      temperature: 0.6,
    })
    return {
      result: completion.data.choices[0].text,
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

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase()
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`
}
