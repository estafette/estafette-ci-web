export default {
  methods: {
    queryGenerator (newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
    }
  }
}
