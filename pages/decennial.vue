<script setup lang="ts">
definePageMeta({
  layout: 'custom',
})

useHead({
  htmlAttrs: {
    class: 'decennial-page',
  },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap',
      rel: 'stylesheet',
    },
  ],
})
</script>

<template>
  <div class="decennial">
    <div class="decennial-content">
      <nuxt-img
        src="/images/dec-banner.png"
        alt="Decennial Image"
      />
      <h1>Decennial Caniversary</h1>
      <h2 class="bungee">
        Sat 21<sup>st</sup> June &middot; 3<sup>pm</sup>&ndash;Late
      </h2>
      <h3 class="bungee">
        Little Beach, Lakeshore
      </h3>
      <h4 class="bungee">
        Drop-ins welcome
      </h4>
      <h4 class="tagline">
        Celebrating 10 Years of Immigration Paperwork
      </h4>
      <hr>
      <h2 class="bungee">
        Location
      </h2>
      <p>
        <a
          href="https://maps.app.goo.gl/oQCSYfwLRQVqZYMB7"
          target="_blank"
          rel="noopener"
        >
          <nuxt-img
            src="/images/lil-beach.png"
            alt="Little Beach Location"
          />
        </a>
      </p>
      <p>
        Weather permitting, we’ll gather at
        <a
          href="https://maps.app.goo.gl/oQCSYfwLRQVqZYMB7"
          target="_blank"
          rel="noopener"
        >Little Beach</a>
        on the Lakeshore, just West of the Legion building. Best accessed by the
        footbridge at the bottom of Dowling Ave.
      </p>
      <p>
        If the clouds come and/or when the sun sets, we’ll move to
        <strong>99 Dowling</strong> for the remainder of the festivities.
      </p>
    </div>
  </div>
</template>

<style lang="stylus">

@import '../stylus/_variables'
.decennial-page
  background #e3000d
  color $w

  a
    text-decoration underline

.bungee
  font-family: "Bungee Inline", sans-serif
  font-weight: 400
  font-style: normal

.decennial-content
  max-width $pwidth * 1rem
  mgn(0, auto)
  pad(0, 1, 3)
  overflow hidden

  h1
    font-size 0
    opacity 0
    margin 0

  h2
    fs(mp(4))

  h3, h4
    mgn(.5, 0)

  hr
    border 0
    border-top 1px solid $w
    mgn(3, 0)

.tagline
  font-family $merriweather
  font-weight 400
  font-style italic
</style>
