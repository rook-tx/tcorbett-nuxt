<script setup>

defineProps({
  current: {
    type: String,
    default: ''
  },
  labs: {
    type: Array,
    default: () => []
  }
})

</script>

<template>
  <div class="lab-footer">
    <section class="sec pagination">
      <div class="pag-wrap index-pag">
        <div class="list-content">
          <h3 class="caption list-heading">
            moar
          </h3>
          <ul>
            <li
              v-for="lab in labs"
              :key="lab.uid"
            >
              <nuxt-link
                :to="`/labs/${lab.uid}`"
                class="list-link"
              >
                <prismic-text
                  class="caption"
                  :field="lab.data.title"
                />
              </nuxt-link>
            </li>
          </ul>
          <nuxt-link
            to="/labs/list"
            class="list-link caption"
          >
            All labs
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.lab-page {
  .pagination {
    border-top 1px solid lighten($lab-bg, 8%)
    mgn(3, 0)
    display flex

    +below($tablet) {
      flex-wrap wrap
    }
  }

  .pag-wrap {
    width 50%

    +above($mobile) {
      border-bottom: 1px solid $nw
    }

    +above($tablet) {
      width: 30%
    }
  }

  .index-pag {
    +above($tablet) {
      border-width 0
      margin 0 auto
      width 40%
      order 2
    }
  }

  .prev-wrap {
    +above($tablet) {
      order 1
    }
  }

  .next-wrap {
    +above($tablet) {
      order 3
    }
  }

  .pag {
    width: 100%
    height: 100%
    text-align: center
    display: block
    padding: $let*1em 0
    background: rgba($nw,.1)
    transition .5s all ease-out

    &:hover {
      box-shadow: inset 0 3px 13px rgba($blk,.05)
      background: rgba($blk,.03)
      transition .2s all ease-out
    }

    .index-pag & {
      padding: $let*2em 0

      +above($mobile) {
        padding: $let*1em 0
      }
    }
  }

  .list-content {
    mgn(1, auto)
    max-width $pwidth*.62rem
  }

  .list-heading {
    border-bottom-width 0
    letter-spacing 1em
    color $dgry
  }

  .list-link {
    &.router-link-exact-active {
      color $prpl
    }

    &:hover {
      color $blu
    }
  }
}

</style>
