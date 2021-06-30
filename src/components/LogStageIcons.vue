<template>
  <span>
    <log-warning
      :step="step"
      :max-lines-to-show="maxLinesToShow"
      class="text-warning"
    />
    <extension-icon
      :image="step.image"
      class="text-info"
    />
    <font-awesome-icon
      v-if="step.image && step.image.isTrusted"
      icon="shield-alt"
      class="text-success"
      v-b-tooltip.hover
      title="This image is configured as trusted by Estafette CI"
    />
    <font-awesome-icon
      v-if="step.image && step.image.hasInjectedCredentials"
      icon="key"
      class="text-info"
      v-b-tooltip.hover
      title="This image has injected credentials"
    />
  </span>
</template>

<script>
import LogWarning from '@/components/LogWarning'
import ExtensionIcon from '@/components/ExtensionIcon'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShieldAlt, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShieldAlt, faKey)

export default {
  components: {
    FontAwesomeIcon,
    LogWarning,
    ExtensionIcon
  },
  props: {
    step: {
      type: Object,
      default: null
    },
    maxLinesToShow: {
      type: Number,
      default: 1000
    }
  }
}
</script>
