<template>
  <b-modal
    ref="sessionRefreshModal"
    centered
    hide-footer
    hide-header
    hide-header-close
    no-close-on-esc
    no-close-on-backdrop
    v-model="visible"
  >
    <div class="d-block text-center mb-3">
      <h3>Keyboard shortcuts</h3>
    </div>

    <p>
      <strong>h</strong> - show help screen
    </p>
    <p>
      <strong>d</strong> - dashboard mode
    </p>
  </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'

export default {
  components: {
    bModal
  },

  props: {
    visible: {
      type: Boolean,
      default: null
    }
  }
}
</script>
