<template>
  <div>
    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link
          :to="{ name: 'ManifestGenerator'}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="hammer"
            class="mr-2"
          />
          Generate
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'ManifestValidator'}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="clipboard-check"
            class="mr-2"
          />
          Validate
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'SecretEncrypter'}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="user-secret"
            class="mr-2"
          />
          Secrets
        </router-link>
      </li>
    </ul>

    <router-view />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHammer, faClipboardCheck, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHammer, faClipboardCheck, faUserSecret)

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>
