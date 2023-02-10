<script setup>
const animalInput = ref('')
const result = ref('')

async function onSubmit(event) {
  event.preventDefault()
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animal: animalInput.value }),
    })

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`)
    }

    result.value = data.result
  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error)
    alert(error.message)
  }
}

function setAnimalInput(e) {
  animalInput.value = e.target.value
}
</script>

<template>
  <main class="main">
    <h3>Name my pet</h3>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        name="animal"
        placeholder="Enter an animal"
        @change="setAnimalInput"
      >
      <input
        type="submit"
        value="Generate names"
      >
    </form>
    <div class="result">
      {{ result }}
    </div>
  </main>
</template>
