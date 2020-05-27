<template>
  <div v-if="user && user.authenticated">
    <b-jumbotron
      header="Preferences"
      bg-variant="secondary"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="section-header"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron } from 'bootstrap-vue'

export default {
  components: {
    BJumbotron
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
