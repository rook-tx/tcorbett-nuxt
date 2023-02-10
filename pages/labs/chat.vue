<script setup>
useHead({
  title: 'Chat GPTom'
})
definePageMeta({
  layout: 'lab'
})

const topicInput = ref('')
const result = ref('')
const submitting = ref(false)

async function onSubmit() {
  if (submitting.value) {return}
  submitting.value = true

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: topicInput.value }),
    })

    const data = await response.json()

    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`)
    }

    result.value = data.result
  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error)
    result.value = error.message
  } finally {
    submitting.value = false
  }
}

function setTopicInput(e) {
  topicInput.value = e.target.value
}

onMounted(() => {
  document.getElementById('topic').focus()
})

</script>

<template>
  <div class="page lab-page chat-page">
    <div class="content">
      <h1>Ask GPT-3 about me!</h1>
      <div class="chat-input">
        <form @submit.prevent="onSubmit">
          <label
            class="chat-input-label"
            for="topic"
          >What does Tom know about </label>
          <input
            id="topic"
            class="chat-input-field"
            type="text"
            name="topic"
            placeholder="…blank"
            @change="setTopicInput"
          >
          <button
            class="chat-input-btn"
            type="submit"
            title="Find out"
          >
            ?
          </button>
        </form>
      </div>
      <div class="chat-result">
        <div
          v-if="submitting"
          class="loading"
        />
        <div :class="['result', submitting ? 'result-pend' : 'result-loaded']">
          {{ result }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.chat-page {
  h1 {
    fs(mp(0))
    color $dgry
    font-weight 600
    mgn(2, 0, 1)
  }

  .content {
    max-width $pwidth * 1.382rem
    pad(1, 1)
  }
}

.chat-input {
  font-family $lato
  fs(mp(1))
  font-weight 600
  display flex
  mgn(1, 0)

  &-label,
  &-field,
  &-btn {
    color inherit
    font inherit
  }

  &-label {
    color $prpl
    mgn(0, .5, 0, 0)
  }

  &-field {
    background none
    border 1px solid $b
    outline 0
    pad(0, .5)
    mgn(0, .5, 0, 0)
    background darken($blk, 50%)
    border-radius 8px
    transition background-color 200ms
    transition-property background-color, border-color

    &:hover,
    &:focus-visible {
      border-color darken($prpl, 60%)
      background-color $blk
    }
  }

  &-btn {
    background darken($prpl, 70%)
    border-radius 8px
    cursor pointer
    font-weight 900
    pad(0, 1)
    transition background-color 200ms

    &:hover,
    &:focus-visible {
      background-color darken($prpl, 65%)
    }
  }
}

.chat-result {
  pad(1, 0)
  position relative

  .loading {
    border 5px solid $prpl
    border-color $prpl transparent transparent transparent
    border-radius 1.2rem
    height 1.2rem
    position absolute
    top 0
    right 0
    width 1.2rem
    animation spin 2s $easeInOutCubic infinite
    pointer-events none
  }

  .result {
    position relative
    opacity 1
    transition opacity 200ms

    &-pend {
      opacity .7
    }
  }
}

@keyframes spin {
  0% {
    transform rotateZ(0deg)
  }
  100% {
    transform rotateZ(360deg)
  }
}

</style>
