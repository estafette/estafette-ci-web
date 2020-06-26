<template>
  <div>
    <article class="uk-article">
      <h1 class="uk-article-title">
        Estafette
      </h1>
      <p class="uk-article-meta">
        <vk-button-link href="https://estafette.io/">
          Learn more
        </vk-button-link>
      </p>
    </article>
    <vk-grid>
      <section-banner
        v-for="section in sections"
        :key="section.name"
        :section="section"
      />
    </vk-grid>
    <vk-grid>
      <my-pipelines
        title="Pipelines you recently committed to"
        filter="recent-committer"
        type="build"
        class="col-12 col-md-6"
      />
      <my-pipelines
        title="Pipelines you recently released"
        filter="recent-releaser"
        type="release"
        class="col-12 col-md-6"
      />
    </vk-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SectionBanner from '@/components/SectionBanner'
import MyPipelines from '@/components/MyPipelines'

import { Grid, ButtonLink } from 'vuikit'

export default {
  components: {
    VkGrid: Grid,
    VkButtonLink: ButtonLink,
    SectionBanner,
    MyPipelines
  },

  methods: {
    isFunction (functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    sections () {
      return this.$router.options.routes.filter(r => {
        // only include routes without meta.hide: true
        if (r.meta && r.meta.hide) {
          return false
        }

        if (!r.meta || !r.meta.banner) {
          return false
        }

        // only include routes with meta.allowedWithoutAuth: true if user is not logged in
        if ((!this.user || !this.user.active) && (!r.meta || !r.meta.allowedWithoutAuth)) {
          return false
        }

        // filter out routes that require a role the user does not have
        if (r.meta && r.meta.requiredRole && (!this.user || !this.user.active || !this.user.roles || !this.user.roles.includes(r.meta.requiredRole))) {
          return false
        }

        return true
      })
    }
  }
}
</script>
