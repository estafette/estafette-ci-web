<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="redirect"
    >
      <p>
        This repository has been migrated to
        <b-link :href="redirectURL">
          /{{ this.toSource }}/{{ this.toOwner }}/{{ this.toName }}
        </b-link>
        , redirecting...
      </p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      />
    </b-alert>
  </div>
</template>

<script>
import { BAlert } from 'bootstrap-vue'

export default {
  components: {
    BAlert
  },
  props: {
    toSource: {
      type: String,
      default: null
    },
    toOwner: {
      type: String,
      default: null
    },
    toName: {
      type: String,
      default: null
    },
    toId: {
      type: String,
      default: null
    },
    page: {
      type: String,
      default: 'overview'
    }
  },
  data: function () {
    let redirectURL = `/pipelines/${this.toSource}/${this.toOwner}/${this.toName}`
    switch (this.page) {
      case 'builds':
        redirectURL = `/pipelines/${this.toSource}/${this.toOwner}/${this.toName}/builds/${this.toId}`
        break
      case 'releases':
        redirectURL = `/pipelines/${this.toSource}/${this.toOwner}/${this.toName}/releases/${this.toId}`
        break
    }
    return {
      redirectURL,
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  methods: {
    redirect () {
      window.location.href = this.redirectURL
    }
  }
}
</script>
