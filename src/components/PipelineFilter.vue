<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend is-text>
      <font-awesome-icon icon="filter" />
    </b-input-group-prepend>
    <b-form-input
      v-model="mutableModel"
      type="text"
      @input="onInput"
    />
  </b-input-group>
</template>

<script>
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bInputGroupPrepend from 'bootstrap-vue/es/components/input-group/input-group-prepend'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilter)

export default {
  components: {
    bFormInput,
    bInputGroup,
    bInputGroupPrepend,
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

  data: function () {
    return {
      mutableModel: this.model
    }
  }
}
</script>
