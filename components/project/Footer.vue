<template>
  <footer class="sec footer">
    <div class="wrap footer-wrap">
      <nav class="mnav fnav">
        <ul class="mnav-ul fnav-ul">
          <li class="mnav-li mnav-home">
            <nuxt-link
              class="mnav-a"
              to="/"
              title="Tom Corbett"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                class="header-logo"
                viewBox="0 0 21 21"
              >
                <path
                  d="M5 3.05v15.76l-4-1.5V5.55l4-2.5m1-1.8L0 5v13l6 2.25v-19z"
                  class="header-logo-path header-logo-path-left"
                />
                <path
                  d="M9 1.46l11 4.23V17.2L9 19.74V1.46M8 0v21l13-3V5L8 0z"
                  class="header-logo-path header-logo-path-right"
                />
              </svg>
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <span class="credit">&copy; 2023 <strong>T Corbett</strong></span>
    </div>
  </footer>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.footer
	width 100%

</style>
