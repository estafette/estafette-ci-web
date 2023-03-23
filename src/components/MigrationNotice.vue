<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="primary"
      @dismissed="redirect"
      @dismiss-count-down="countDownChanged"
    >
      <p>
        This repository has been migrated, redirecting to
        <b-link
          :href="redirectURL"
          class="alert-link"
        >
          {{ this.toSource }}/{{ this.toOwner }}/{{ this.toName }}
        </b-link>
      </p>
      <b-progress
        variant="primary"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      />
    </b-alert>
  </div>
</template>

<script>
import { BAlert, BLink, BProgress } from 'bootstrap-vue'

export default {
  components: {
    BAlert,
    BLink,
    BProgress
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
        redirectURL = `/pipelines/${this.toSource}/${this.toOwner}/${this.toName}/builds/${this.toId}/logs`
        break
      case 'releases':
        redirectURL = `/pipelines/${this.toSource}/${this.toOwner}/${this.toName}/releases/${this.toId}/logs`
        break
    }
    return {
      redirectURL,
      dismissSecs: 5,
      dismissCountDown: 5
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    redirect () {
      window.location.href = this.redirectURL
    }
  }
}
</script>
