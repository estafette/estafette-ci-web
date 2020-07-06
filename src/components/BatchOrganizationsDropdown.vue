<template>
  <b-dropdown
    text="Update organizations"
    variant="success"
    :disabled="!ready || selected.length === 0"
  >
    <b-dropdown-form>
      <b-form-checkbox
        v-for="o in organizations"
        :key="o.id"
        v-model="checkedOrganizations[o.id]"
        :value="'checked:'+o.id"
        :unchecked-value="'unchecked:'+o.id"
        :indeterminate="indeterminateOrganizations[o.id]"
        @change="toggleOrganization"
      >
        {{ o.name }}
      </b-form-checkbox>
      <b-button
        size="sm"
        variant="primary"
        class="mb-1"
        @click="applyOrganizations"
        :disabled="organizationsToAdd.length === 0 && organizationsToRemove.length === 0"
      >
        Apply
      </b-button>
      <b-button
        size="sm"
        class="mb-1"
        @click="updateOrganizationsDropdown"
      >
        Reset
      </b-button>
    </b-dropdown-form>
  </b-dropdown>
</template>

<script>
import { BDropdown, BDropdownForm, BFormCheckbox, BButton } from 'bootstrap-vue'

export default {
  components: {
    BDropdown,
    BDropdownForm,
    BFormCheckbox,
    BButton
  },

  props: {
    selected: {
      type: Array,
      default: function () { return [] }
    },
    selectableItems: {
      type: Array,
      default: function () { return [] }
    },
    type: {
      type: String,
      default: null
    },
    applyDoneFunc: {
      type: Function,
      default: function () { }
    },
    selectableIdFunc: {
      type: Function,
      default: s => s.id
    }
  },

  data: function () {
    return {
      checkedOrganizations: {},
      indeterminateOrganizations: {},
      organizationsToAdd: [],
      organizationsToRemove: [],
      organizations: [],
      loaded: {
        organizations: false
      }
    }
  },

  created () {
    this.loadOrganizations()
  },

  methods: {
    loadOrganizations () {
      this.axios.get(`/api/organizations?page[number]=1&page[size]=100`)
        .then(response => {
          this.organizations = response.data.items
          this.loaded.organizations = true
        })
        .catch(e => {
          console.warn(e)
        })
    },

    updateOrganizationsDropdown () {
      this.organizationsToAdd = []
      this.organizationsToRemove = []

      var selectedItems = this.selectableItems.filter(i => this.selected.includes(this.selectableIdFunc(i)))

      this.checkedOrganizations = this.organizations.map(o => o.id).reduce((map, o) => {
        var checked = selectedItems.length > 0 ? selectedItems.every(i => i.organizations && i.organizations.some(io => io.id === o)) : false
        map[o] = checked ? 'checked:' + o : 'unchecked:' + o
        return map
      }, {})

      this.indeterminateOrganizations = this.organizations.map(o => o.id).reduce((map, o) => {
        map[o] = selectedItems.length > 0 && !selectedItems.every(i => i.organizations && i.organizations.some(io => io.id === o)) ? selectedItems.some(i => i.organizations && i.organizations.some(io => io.id === o)) : false
        return map
      }, {})
    },

    toggleOrganization (o) {
      var prefix = ''
      if (o.startsWith('checked:')) {
        prefix = 'checked:'
      } else if (o.startsWith('unchecked:')) {
        prefix = 'unchecked:'
      }
      var organization = o.slice(prefix.length)

      // update indeterminate value (the .sync modifier doesn't seem to work)
      this.indeterminateOrganizations[organization] = false

      if (prefix === 'checked:') {
        this.organizationsToAdd.push(organization)
        this.organizationsToRemove = this.organizationsToRemove.filter(oo => oo !== organization)
      } else if (prefix === 'unchecked:') {
        this.organizationsToRemove.push(organization)
        this.organizationsToAdd = this.organizationsToAdd.filter(oo => oo !== organization)
      }
    },

    applyOrganizations () {
      var body = {
        organizationsToAdd: this.organizations.map(o => { return { id: o.id, name: o.name } }).filter(o => this.organizationsToAdd.includes(o.id)),
        organizationsToRemove: this.organizations.map(o => { return { id: o.id, name: o.name } }).filter(o => this.organizationsToRemove.includes(o.id))
      }
      body[this.type] = this.selected

      this.axios.post(`/api/admin/batch/${this.type}`, body)
        .then(response => {
          this.applyDoneFunc()
        })
        .catch(e => {
          this.updateOrganizationsDropdown()
          console.warn(e)
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
  },

  watch: {
    selected () {
      this.updateOrganizationsDropdown()
    }
  }
}
</script>
