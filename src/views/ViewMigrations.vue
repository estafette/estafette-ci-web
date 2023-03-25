<template>
  <div class="migrations">
    <b-jumbotron
      header="Migrations"
      bg-variant="secondary"
      text-variant="light"
      header-level="4"
      container-fluid
      fluid
      class="section-header"
    />
    <div class="details">
      <div class="row justify-content-between">
        <div class="col-6 text-left">
          <b-form
            autocomplete="off"
            class="d-flex"
          >
            <b-input-group class="mb-3">
              <b-input-group-prepend
                is-text
              >
                <font-awesome-icon icon="check-circle" />
              </b-input-group-prepend>
              <b-form-select
                v-if="statusOptions.length > 0"
                :id="`filter-select`"
                v-model="filter.status"
                :options="statusOptions"
              />
            </b-input-group>
            <b-input-group class="ml-3 mb-3">
              <b-input-group-prepend
                is-text
              >
                <font-awesome-icon icon="tasks" />
              </b-input-group-prepend>
              <b-form-select
                v-if="stepOptions.length > 0"
                :id="`filter-select`"
                v-model="filter.lastStep"
                :options="stepOptions"
              />
            </b-input-group>
          </b-form>
        </div>
        <div class="col-3 text-right">
          <b-pagination
            v-model="pagination.page"
            :total-rows="pagination.totalItems"
            :per-page="100"
            align="fill"
            size="sm"
            class="my-0"
          />
        </div>
      </div>
      <b-table
        :items="taskProvider"
        :filter="filter"
        :fields="fields"
        :per-page="pagination.size"
        :current-page="pagination.page"
        sort-icon-left
        striped
        hover
        borderless
        stacked="lg"
        ref="migrations"
      >
        <template #cell(id)="data">
          <span
            v-b-popover.hover="{ variant: 'primary', content: data.value, placement: 'right' }"
          >
            ...{{ data.value.substring(data.value.length - 3) }}
          </span>
        </template>
        <template #cell(migration)="data">
          <a
            :href="`/pipelines/${data.item.toSource}/${data.item.toOwner}/${data.item.toName}/overview`"
            v-b-popover.hover="{ variant: 'light', content: `${data.item.fromSource}/${data.item.fromOwner}/${data.item.fromName} ➞ ${data.item.toSource}/${data.item.toOwner}/${data.item.toName}`, placement: 'right' }"
          >
            {{ data.value }}
          </a>
        </template>
        <template #cell(status)="data">
          <div
            style="display: inline-block; min-width: 18px;"
            :class="statusClass(data.value)"
          >
            <font-awesome-icon :icon="(statusOptions.find(s => s.value === data.value) || { icon: 'none' }).icon" />
          </div>
          {{ (statusOptions.find(s => s.value === data.value) || { text: data.value }).text }}
        </template>
        <template #cell(lastStep)="data">
          <span :class="stepClass(data.value)">
            {{ (stepOptions.find(s => s.value === data.value) || { text: data.value }).text }}
          </span>
        </template>
        <template #cell(errorDetails)="data">
          <b-button
            v-if="data.value"
            @click="showErrorDetails(data.item)"
            variant="outline-danger"
          >
            ❗️
          </b-button>
          <span v-if="!data.value">
            -
          </span>
        </template>
      </b-table>
      <pagination
        :pagination="pagination"
        v-if="pagination.totalItems > 0"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ModalPlugin, BForm, BFormSelect, BInputGroup, BInputGroupPrepend, BJumbotron, BTable, VBPopover, BPagination, BButton } from 'bootstrap-vue'
import Pagination from '@/components/Pagination'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBan,
  faCheckCircle,
  faHourglassStart,
  faSpinner,
  faTasks,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

library.add(faCheckCircle, faTasks, faHourglassStart, faSpinner, faCheckCircle, faTimesCircle, faBan)
Vue.directive('b-popover', VBPopover)
Vue.use(ModalPlugin)

export default {
  components: {
    BTable,
    BPagination,
    Pagination,
    BJumbotron,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BFormSelect,
    BButton,
    FontAwesomeIcon
  },

  data: function () {
    return {
      selected: null,
      users: [],
      statusOptions,
      stepOptions,
      filter: {},
      pagination: {
        page: 1,
        size: 100,
        totalPages: 0,
        totalItems: 0
      },
      fields: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'migration',
          label: 'Migration',
          formatter: (value, key, item) => {
            if (item.fromName !== item.toName) {
              return `${item.fromName} ➞ ${item.toName}`
            }
            return item.toName
          }
        },
        {
          key: 'status',
          label: 'Status'
        },
        {
          key: 'lastStep',
          label: 'Last Step'
        },
        {
          key: 'errorDetails',
          label: 'Error',
          class: 'text-center'
        },
        {
          key: 'totalDuration',
          label: 'Duration'
        },
        {
          key: 'updatedAt',
          label: 'Updated At',
          sortable: true,
          formatter: (value, key, item) => {
            return this.$options.filters.formatDatetime(value)
          }
        }
      ],
      loaded: {
        migrations: false
      }
    }
  },

  methods: {
    taskProvider (ctx) {
      console.info('ctx', ctx)
      const start = (ctx.currentPage - 1) * 100
      if (this.migrations) {
        const tasks = this.migrations.filter(migration => {
          if (this.filter.status && this.filter.status !== migration.status) {
            return false
          }
          if (this.filter.lastStep && this.filter.lastStep !== migration.lastStep) {
            return false
          }
          return true
        })
        this.updatePagination(ctx, tasks)
        tasks.sort((a, b) => {
          if (ctx.sortDesc) {
            return a[ctx.sortBy] < b[ctx.sortBy] ? 1 : -1
          }
          return a[ctx.sortBy] > b[ctx.sortBy] ? 1 : -1
        })
        return tasks.slice(start, start + 100)
      }
      return this.axios.get('/api/migrations')
        .then(response => {
          this.migrations = response.data.map(m => {
            m.totalDuration = moment.duration(m.totalDuration / 1000 / 1000, 'ms').humanize()
            m.updatedAt = new Date(m.updatedAt)
            return m
          })
          this.loaded.migrations = true
          this.pagination = {
            page: 1,
            size: 100,
            totalPages: this.migrations.length / 100,
            totalItems: this.migrations.length
          }
          return this.migrations.slice(start, start + 100)
        })
    },
    updatePagination (ctx, tasks) {
      this.pagination.totalPages = tasks.length / 100
      this.pagination.totalItems = tasks.length
    },
    statusClass (status) {
      switch (status) {
        case 'completed':
          return 'text-success'
        case 'in_progress':
          return 'ckw'
        case 'failed':
          return 'text-danger'
        case 'cancelled':
          return 'text-warning'
      }
      return ''
    },
    stepClass (step) {
      if (step.indexOf('failed') > -1) {
        return 'text-danger'
      }
      return ''
    },
    showErrorDetails (migration) {
      const h = this.$createElement
      const titleVNode = h('pre', { domProps: { innerHTML: migration.errorDetails } })
      this.$bvModal.msgBoxOk(titleVNode, {
        title: 'Error Details',
        size: 'xl',
        buttonSize: 'md',
        okVariant: 'secondary',
        headerClass: 'p-2 border-bottom-0 m-auto',
        footerClass: 'p-2 border-top-0 m-auto',
        centered: true
      })
    }
  },

  computed: {
    ready () {
      for (const property in this.loaded) {
        if (!this.loaded[property]) {
          return false
        }
      }
      return true
    }
  }
}
const statusOptions = [
  {
    value: '',
    text: '-- Unset --'
  },
  {
    value: 'queued',
    text: 'Queued',
    icon: 'hourglass-start'
  },
  {
    value: 'in_progress',
    text: 'In Progress',
    icon: 'spinner'
  },
  {
    value: 'completed',
    text: 'Completed',
    icon: 'check-circle'
  },
  {
    value: 'failed',
    text: 'Failed',
    icon: 'times-circle'
  },
  {
    value: 'cancelled',
    text: 'Cancelled',
    icon: 'ban'
  }
]
const stepOptions = [
  {
    value: '',
    text: '-- Unset --'
  },
  {
    value: 'waiting',
    text: 'Waiting'
  },
  {
    value: 'releases_failed',
    text: 'Releases Failed'
  },
  {
    value: 'releases_done',
    text: 'Releases Done'
  },
  {
    value: 'release_logs_failed',
    text: 'Release Logs Failed'
  },
  {
    value: 'release_logs_done',
    text: 'Release Logs Done'
  },
  {
    value: 'release_log_objects_failed',
    text: 'Release Log Objects Failed'
  },
  {
    value: 'release_log_objects_done',
    text: 'Release Log Objects Done'
  },
  {
    value: 'builds_failed',
    text: 'Builds Failed'
  },
  {
    value: 'builds_done',
    text: 'Builds Done'
  },
  {
    value: 'build_logs_failed',
    text: 'Build Logs Failed'
  },
  {
    value: 'build_logs_done',
    text: 'Build Logs Done'
  },
  {
    value: 'build_log_objects_failed',
    text: 'Build Log Objects Failed'
  },
  {
    value: 'build_log_objects_done',
    text: 'Build Log Objects Done'
  },
  {
    value: 'build_versions_failed',
    text: 'Build Versions Failed'
  },
  {
    value: 'build_versions_done',
    text: 'Build Versions Done'
  },
  {
    value: 'computed_tables_failed',
    text: 'Computed Tables Failed'
  },
  {
    value: 'computed_tables_done',
    text: 'Computed Tables Done'
  },
  {
    value: 'callback_failed',
    text: 'Callback Failed'
  },
  {
    value: 'callback_done',
    text: 'Callback Done'
  },
  {
    value: 'completion_failed',
    text: 'Completion Failed'
  },
  {
    value: 'completion_done',
    text: 'Completion Done'
  }
]
</script>
