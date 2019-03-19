<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      class="icon-container"
    >
      <font-awesome-icon icon="clock" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="sinceOptions"
      @change="onChange"
    />
  </b-input-group>
</template>

<script>
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bInputGroupPrepend from 'bootstrap-vue/es/components/input-group/input-group-prepend'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faClock)

export default {
  components: {
    bFormSelect,
    bInputGroup,
    bInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    model: {
      type: String,
      default: null
    },
    onChange: {
      type: Function,
      default: null
    }
  },

  data: function () {
    return {
      sinceOptions: [
        { value: '1h', text: 'Since 1 hour ago' },
        { value: '1d', text: 'Since 1 day ago' },
        { value: '1w', text: 'Since 1 week ago' },
        { value: '1m', text: 'Since 1 month ago' },
        { value: '1y', text: 'Since 1 year ago' },
        { value: 'eternity', text: 'Since dawn of mankind' }
      ],
      mutableModel: this.model
    }
  }
}
</script>
