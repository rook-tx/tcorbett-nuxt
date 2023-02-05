<script setup>

defineProps({
  project: {
    type: Object,
    default: () => ({
      headline: []
    })
  }
})

</script>

<template>
  <div class="project-footer">
    <section class="sec pagination">
      <div class="pag-wrap">
        <a
          href="/projects/web/Halsbury/Halsbury2014.html"
          class="pag next"
          title="Halsbury 2014"
        >
          <span class="pag-arrow">&raquo;</span><br>
          Next:<br>
          <strong>Halsbury 2014</strong>
        </a>
      </div>

      <div class="pag-wrap index-pag">
        <a
          href="/projects/list"
          class="pag"
          title="Projects list"
        >All projects</a>
      </div>

      <div class="pag-wrap">
        <a
          href="/projects/web/Halsbury/HalsburyGroup.html"
          class="pag previous"
          title="Halsbury Group"
        >
          <span class="pag-arrow">&laquo;</span><br>
          Previous:<br>
          <strong>Halsbury Group</strong>
        </a>
      </div>
    </section>
  </div>
</template>
