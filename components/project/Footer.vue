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

	&-wrap
		display flex
		padding-right 0

		+below($mobile)
			pad(0, .5)

.fnav
	&, &-ul
		width 100%

	&-ul
		overflow-x auto
		overflow-y hidden
		white-space nowrap
		z-index 1

	.mnav-a, + .credit
		font-weight 400
		margin 0
		pad(.5, .75, .75)

	+below($mobile)
		&-ul
			display block
			overflow-x scroll
			padding-right $gut*1em

			.mnav-a, + .credit
				background 0
				pad(.5, .5)

	.mnav-a
		color $nblk

		+above($mobile)
			&:hover, &:focus, &:active
				background $hw
				color $nblk

	.mnav-linkedin
		.mnav-a
			color $blu

	.mnav-unclear
		.mnav-a
			color $prpl

.credit
	color $bdr
	font-family $lato
	margin-left auto
	white-space nowrap

	strong
		letter-spacing inherit

	+below($mobile)
		display none

</style>
