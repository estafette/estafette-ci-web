<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      class="icon-container"
    >
      <font-awesome-icon icon="filter" />
    </b-input-group-prepend>
    <b-form-input
      v-model="mutableModel"
      type="text"
      @input="onInput"
      autocomplete="off"
    />
  </b-input-group>
</template>

<script>
import { BFormInput, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilter)

export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    model: {
      type: String,
      default: null
    },
    onInput: {
      type: Function,
      default: null
    }
  },

  watch: {
    model: {
      handler: function (to, from) {
        this.mutableModel = to
      },
      deep: true
    }
  },

  data: function () {
    return {
      mutableModel: this.model
    }
  }
}
</script>
