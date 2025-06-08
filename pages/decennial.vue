<script setup lang="ts">
definePageMeta({
  layout: 'custom',
})

useHead({
  htmlAttrs: {
    class: 'decennial-page',
  },
  title: '21st June · Decennial Caniversary',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap',
      rel: 'stylesheet',
    },
  ],
  meta: [
    { hid: 'og:image', property: 'og:image', content: '/images/decen.jpg' }
  ]
})
</script>

<template>
  <div class="decennial">
    <div class="decennial-hero">
      <nuxt-img
        src="/images/dec-banner.png"
        alt="Decennial Image"
        sizes="(max-with:1068px) 100vw, 1068px"
        width="1584"
        height="1224"
      />
    </div>
    <div class="decennial-content">
      <h1>Decennial Caniversary</h1>
      <h2 class="bungee">
        Sat 21<sup>st</sup> June
      </h2>
      <h3 class="bungee">
        3<sup>pm</sup>&ndash;Late
      </h3>
      <h3 class="bungee">
        Little Beach, Lakeshore
      </h3>

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
            sizes="660"
            width="1822"
            height="1040"
          />
        </a>
      </p>
      <p>
        We’ll gather at <a
          href="https://maps.app.goo.gl/oQCSYfwLRQVqZYMB7"
          target="_blank"
          rel="noopener"
        >Little Beach</a> on the Lakeshore path, just West of the Legion building. Best access is the footbridge from the bottom of Dowling Ave and across the Gardiner.
      </p>

      <hr>

      <h2 class="bungee">
        Day
      </h2>
      <p>Come down to the beach after 3<sup>pm</sup> for hangs, music, drinks and memories. We’ll be posted up and easy to spot. We welcome:</p>
      <ul>
        <li>✓ friends and +1s ✓</li>
        <li>✓ small animals ✓</li>
        <li>✓ small people ✓</li>
        <li>✓ outdoor games ✓</li>
      </ul>
      <p>Feel free to drop in for a hi & bye any time in the afternoon.</p>
      <h2 class="bungee">
        Evening
      </h2>
      <p>
        When the sun sets and/or the weather turns, we’ll move to <strong>99&nbsp;Dowling</strong> for the next chapter of festivities. Pizza will be ordered and there will be drinks in the fridge(s).
      </p>
      <p>
        The party will continue into the night and you’re welcome to come direct for this phase! <strong>DJ Bucky Fresh</strong> will play a set for the grown-ups in the wee hours.
      </p>

      <hr>

      <h2 class="bungee">
        BYOB & BYOS
      </h2>
      <p>
        Bring your own booze and snacks! We’ll have some drinks and <strong>“Canadian classic” snacks</strong> available &mdash; please feel inspired to bring your own favourites to share.
      </p>

      <hr>

      <h2 class="bungee">
        Dress Code
      </h2>
      <h3 class="bungee">
        Canadian Tuxedo
      </h3>
      <nuxt-img
        src="/images/canadiantuxedo.jpg"
        alt="Canadian Tuxedo gang"
        sizes="660"
        width="956"
        height="502"
      />
      <p>
        Denim on denim, the quintessential look.
      </p>
      <h2 class="bungee">
        &middot; OR &middot;
      </h2>
      <h3 class="bungee">
        Red & White
      </h3>
      <nuxt-img
        src="/images/red-white.jpg"
        alt="Sports"
        sizes="660"
        width="800"
        height="800"
      />
      <p>
        Show your pride for the flag by sporting all red and white! Points for creativity.
      </p>

      <hr>

      <h2 class="bungee">
        See you there!
      </h2>
      <nuxt-img
        src="/images/fall.jpg"
        alt="99 Dowling Location"
        sizes="660"
        width="792"
        height="542"
      />
      <svg-canada class="icon-large" />
    </div>
  </div>
</template>

<style lang="stylus">

@import '../stylus/_variables'

$red = #a2161e

.decennial-page
  background $red
  color $w

  a
    text-decoration underline

  h1
    font-size 0
    opacity 0
    margin 0

  h2
    fs(mp(4))

  h3
    fs(mp(2))

  h3, h4
    mgn(.5, 0)

  hr
    border 0
    border-top 1px solid $w
    color $red
    mgn(5, 0)
    position relative

  img
    width 100%
    height auto
    overflow hidden
    border-radius 0.5rem

  ul
    mgn(1, 0, 1, 1)

.bungee
  font-family: "Bungee Inline", sans-serif
  font-weight: 400
  font-style: normal

.decennial-hero
  max-width $pwidth * 1.618rem
  mgn(0, auto)

.decennial-content
  max-width $pwidth * 1rem
  mgn(0, auto)
  pad(0, 1, 5)
  overflow hidden

.tagline
  font-family $merriweather
  font-weight 400
  font-style italic

.icon-large
  width 5rem
  height 5rem
  mgn(2, auto)

</style>
