<template>
  <b-input-group class="mb-3">
    <b-input-group-prepend
      is-text
      v-b-tooltip.hover
      title="Filter pipelines based on when they're last built or executed"
    >
      <font-awesome-icon icon="upload" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="botTargetOptions"
      @change="onChange"
    />
  </b-input-group>
</template>

<script>
import { BFormSelect, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload)

export default {
  components: {
    BFormSelect,
    BInputGroup,
    BInputGroupPrepend,
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
    },
    pipeline: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      mutableModel: this.model
    }
  },

  computed: {
    botTargetOptions () {
      const botTargetOptions = [
        { value: 'all', text: 'All bots' }
      ]

      if (this.pipeline && this.pipeline.botTargets) {
        this.pipeline.botTargets.forEach(rt => {
          botTargetOptions.push({ value: rt.name, text: rt.name })
        })
      }

      return botTargetOptions
    }
  }
}
</script>
