<script setup>
import { isFilled } from '@prismicio/client'

const { client } = usePrismic()
const { data: projects } = await useLazyAsyncData('projects', () => client.getSingle('projects'))

defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="projects">
    <div
      v-if="projects?.data"
      class="wrap"
    >
      <prismic-rich-text
        v-if="projects?.data?.blurb"
        class="blurb"
        :field="projects.data.blurb"
      />

      <ol
        v-if="projects?.data?.projects"
        class="project-list"
      >
        <li
          v-for="project in projects.data.projects"
          :key="project.project_link.url"
          class="project"
        >
          <nuxt-link
            v-if="project?.project?.uid"
            :to="`/projects/${project.project.uid}`"
          >
            <prismic-text
              class="url"
              :field="project.project_title"
            />
            <div
              v-if="isFilled.image(project.project_thumb)"
              class="thumb"
            >
              <prismic-image :field="project.project_thumb" />
            </div>
          </nuxt-link>

          <a
            v-else-if="project.project_link"
            :href="project.project_link.url"
            target="_blank"
            rel="noopener"
          >
            <prismic-text
              class="url"
              :field="project.project_title"
            />
            <div
              v-if="isFilled.image(project.project_thumb)"
              class="thumb"
            >
              <prismic-image :field="project.project_thumb" />
            </div>
          </a>

          <prismic-rich-text
            v-if="isFilled.richText(project.role)"
            class="role"
            :field="project.role"
          />

          <prismic-rich-text
            v-if="isFilled.richText(project.notes)"
            class="notes"
            :field="project.notes"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.projects {
  ::selection {
    background $w
    color inherit
  }

  .wrap {
    min-height 100%
    overflow hidden
  }

  .two-col {
    pad(2, 2, 4)

    h1 {
      fs(mp(9))
    }
  }

  .blurb {
    font-family $lato
    fs(mp(-1))
    mgn(2, 0, 0)
  }

  .project {
    mgn(4, 0)

    &:nth-child(even) {
      mgn(4, 0, 4, 4)
    }
  }

  .thumb {
    mgn(.5, 0)
    max-width $pwidth * .618rem

    img {
      display block
      max-width 100%
    }
  }

  .url {
    display inline-block
    font-weight 400
    border-bottom 2px solid $prpl
  }

  .role {
    h4 {
      fs(mp(-1))
      mgn(.5, 0)

      &::before {
        content ' — '
      }
    }
  }

  .notes {
    p, li {
      fs(mp(-3))
      font-family $lato
      font-weight 400
      letter-spacing ($ls / 4)
      mgn(.5, 0)
    }

    a {
      border-bottom 1px solid $blu
      white-space nowrap
    }
  }
}

</style>
