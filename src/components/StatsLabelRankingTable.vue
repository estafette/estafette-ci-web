<template>
  <div class="rounded border bg-white pt-1 pl-3 pr-3 mb-3">
    <h1
      class="text-center"
      :class="`text-${status}`"
    >
      Most {{ type }} labels
    </h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Label</th>
          <th>{{ type | capitalize }}</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          v-for="(row, index) in rows"
          :key="index"
          :to="{ name: 'Pipelines', query: queryGenerator({ labels: row.key+'='+row.value })}"
          tag="tr"
        >
          <td>
            {{ index + 1 + (pagination.page-1) * pagination.size }}
          </td>
          <td>
            <span :class="['text-muted']">{{ row.key }}=</span><strong>{{ row.value }}</strong>
          </td>
          <td>
            {{ row.pipelinescount }}
          </td>
        </router-link>
      </tbody>
    </table>

    <b-pagination
      size="md"
      :total-rows="pagination.totalItems"
      :per-page="pagination.size"
      v-model="pagination.page"
      align="center"
      hide-goto-end-buttons
    />
  </div>
</template>

<script>
import { BPagination } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

export default {
  components: {
    BPagination
  },
  props: {
    filter: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    }
  },

  mixins: [queryGenerator],

  data: function () {
    return {
      rows: [],
      pagination: {
        page: 1,
        size: 15,
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
      this.axios.get(`/api/labels/${this.type}?filter[since]=${this.filter.since}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.rows = response.data.items
          this.pagination = response.data.pagination
          this.periodicallyRefreshStat(15)
        })
        .catch(e => {
          this.periodicallyRefreshStat(60)
        })
    },

    periodicallyRefreshStat (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
