<template>
  <div>
    <h1>Most {{type}}</h1>
    <table class="table">
      <tr>
        <th>Pipeline</th>
        <th>Count</th>
      </tr>
      <tr v-for="(row, index) in rows" v-bind:key="index">
        <td>
          <span class="text-muted d-none d-md-inline">{{row.repo_source}}/{{row.repo_owner}}/</span><strong>{{row.repo_name}}</strong>
        </td>
        <td>
          {{row.nr_records}}
        </td>
      </tr>
    </table>

    <b-pagination size="md" :total-rows="pagination.totalItems" :per-page="pagination.size" v-model="pagination.page" align="center" hide-goto-end-buttons/>

  </div>
</template>

<script>
export default {
  props: {
    filter: Object,
    type: String
  },

  data: function () {
    return {
      rows: [],
      pagination: {
        page: 1,
        size: 10,
        totalPages: 0,
        totalItems: 0
      },
      refresh: true
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
    loadStat () {
      this.axios.get(`/api/stats/most${this.type}?filter[since]=${this.filter.since}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.rows = response.data.items
          this.pagination = response.data.pagination
          this.periodicallyRefreshStat(15)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshStat(60)
        })
    },

    periodicallyRefreshStat (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadStat, timeoutWithJitter)
      }
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadStat()
      },
      deep: true
    },
    'pagination.page': {
      handler: function (to, from) {
        if (to !== from) {
          this.loadStat()
        }
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
