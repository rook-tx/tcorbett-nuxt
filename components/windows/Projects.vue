<script setup>
const { client } = usePrismic() // eslint-disable-line no-undef
const { data: projects } = await useAsyncData('projects', () => client.getSingle('projects')) // eslint-disable-line no-undef
</script>

<template>
  <div class="projects">
    <div
      v-if="projects?.data"
      class="wrap"
    >
      <!-- <div class="blurb">
        <nuxt-link to="/projects/list">
          See all projects
        </nuxt-link>
      </div> -->

      <prismic-rich-text
        class="blurb"
        :field="projects.data.blurb"
      />

      <ol class="project-list">
        <li
          v-for="project in projects.data.projects"
          :key="project.project_link.url"
          class="project"
        >
          <router-link
            v-if="project.project && project.project.uid"
            :to="`/projects/${project.project.uid}`"
          >
            <div
              class="url"
              v-html="$prismic.asText(project.project_title)"
            />
            <div
              v-if="project.project_thumb"
              class="thumb"
            >
              <img :src="project.project_thumb.url">
            </div>
            <div
              class="info"
              v-html="`&mdash; ${'Senior Developer'}`"
            />
          </router-link>
          <a
            v-else-if="project.project_link"
            :href="project.project_link.url"
            target="_blank"
            rel="noopener"
          >
            <div
              class="url"
              v-html="$prismic.asText(project.project_title)"
            />
            <div
              v-if="project.project_thumb && project.project_thumb.url"
              class="thumb"
            >
              <img :src="project.project_thumb.url">
            </div>
          </a>

          <prismic-rich-text
            v-if="project.role && $prismic.asText(project.role).length"
            class="role"
            :field="project.role"
          />

          <prismic-rich-text
            v-if="project.notes && $prismic.asText(project.notes).length"
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
