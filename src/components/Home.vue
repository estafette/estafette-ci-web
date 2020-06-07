<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12">
        <b-jumbotron
          lead="Your portal to application development & management"
          bg-variant="white"
          text-variant="dark"
          header-level="3"
          container-fluid
          fluid
          class="mb-3 pl-4 pt-4 pr-4 pb-5 rounded border"
        >
          <template
            v-slot:header
          >
            <span class="text-success font-italic">
              Estafette
            </span>
          </template>

          <p>For more information visit the public website.</p>

          <b-button
            variant="success"
            href="https://estafette.io/"
            target="_blank"
          >
            Learn more
          </b-button>
        </b-jumbotron>
      </div>

      <section-banner
        v-for="section in sections"
        :key="section.name"
        :section="section"
      />
    </div>

    <div class="row">
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron, BButton } from 'bootstrap-vue'
import SectionBanner from '@/components/SectionBanner'
import MyPipelines from '@/components/MyPipelines'

export default {
  components: {
    BJumbotron,
    BButton,
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
