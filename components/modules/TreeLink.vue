<script setup>

defineProps({
  link: {
    type: Object,
    default: () => ({
      image: null,
      label: [],
      url: null,
    })
  }
})

</script>

<template>
  <li class="tree-link">
    <a
      :href="link.url.url"
      :target="link.url.target"
      rel="noopener"
    >
      <div class="link-btn">
        <div class="link-btn-image">
          <prismic-image
            :field="link.image"
            class="link-image"
            width="60"
            height="60"
          />
        </div>
        <div class="link-btn-label">
          <!-- <prismic-text
            :field="link.label" -->
          <span
            class="link-label"
          >{{ link.label }}</span>
        </div>
      </div>
    </a>
  </li>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.tree-link {
  background $b
  border-radius 6px
  background linear-gradient(-45deg, $prpl, $blu, $dgry)
  overflow hidden
  mgn(1, .5)
  box-shadow 4px 4px 0 rgba($b, .15)

  .link-btn {
    background $w
    border-radius 3px
    align-items center
    display flex
    margin 4px
    min-height $let * 3rem
  }

  .link-btn-image {
    padding 5px
    width 20%
  }

  .link-image {
    width $let * 3rem
  }

  .link-btn-label {
    width 60%
  }

  .link-label {
    white-space nowrap

    h2 {
      fs(mp(0))
      margin 0
    }
  }
}

</style>
