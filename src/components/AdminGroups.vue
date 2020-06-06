<template>
  <div v-if="user && user.active">
    <h1>Groups</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
