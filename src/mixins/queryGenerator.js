export default {
  methods: {
    queryGenerator (newQuery) {
      var query = {
        ...this.$route.query,
        ...newQuery
      }

      for (const property in query) {
        if (!query[property] || query[property] === '') {
          delete query[property]
        }
      }

      return query
    }
  }
}
