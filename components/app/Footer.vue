<template>
  <footer class="sec footer">
    <div class="wrap footer-wrap">
      <nav class="mnav fnav">
        <ul class="mnav-ul fnav-ul">
          <li class="mnav-li mnav-home">
            <router-link
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
            </router-link>
          </li>

          <li class="mnav-li mnav-contact">
            <a
              href="mailto:twcorb@gmail.com"
              class="mnav-a"
            >twcorb@gmail.com</a>
          </li>

          <li class="mnav-li mnav-linkedin">
            <a
              href="https://www.linkedin.com/in/tom-corbett/"
              target="_blank"
              rel="noopener"
              class="mnav-a"
            >LinkedIn</a>
          </li>

          <li class="mnav-li mnav-unclear">
            <a
              href="https://www.youtube.com/watch?v=SU4-ONM7Qng&list=PLN3790JG1OCO5b2DiUpFLCbqAVnEjLPyy"
              target="_blank"
              rel="noopener"
              class="mnav-a"
            >Unclear podcast</a>
          </li>

          <li class="mnav-li mnav-insta">
            <a
              href="https://www.instagram.com/rook_tx/"
              target="_blank"
              rel="noopener"
              class="mnav-a"
            >@rook_tx</a>
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
	bottom 0
	position fixed
	left 0
	pointer-events none
	width 100%

</style>
