<template>
  <b-dropdown
    text="Update groups"
    variant="warning"
    :disabled="!ready || selected.length === 0"
  >
    <b-dropdown-form>
      <b-form-checkbox
        v-for="g in groups"
        :key="g.id"
        v-model="checkedGroups[g.id]"
        :value="'checked:'+g.id"
        :unchecked-value="'unchecked:'+g.id"
        :indeterminate="indeterminateGroups[g.id]"
        @change="toggleGroup"
        :class="cssClass(g)"
      >
        {{ g.name }}
      </b-form-checkbox>
      <b-button
        size="sm"
        variant="primary"
        class="mb-1"
        @click="applyGroups"
        :disabled="groupsToAdd.length === 0 && groupsToRemove.length === 0"
      >
        Apply
      </b-button>
      <b-button
        size="sm"
        class="mb-1"
        @click="updateGroupsDropdown"
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
      checkedGroups: {},
      indeterminateGroups: {},
      groupsToAdd: [],
      groupsToRemove: [],
      groups: [],
      loaded: {
        groups: false
      }
    }
  },

  created () {
    this.loadGroups()
  },

  methods: {
    loadGroups () {
      this.axios.get(`/api/groups?page[number]=1&page[size]=100`)
        .then(response => {
          this.groups = response.data.items
          this.loaded.groups = true
        })
        .catch(e => {
          console.warn(e)
        })
    },

    updateGroupsDropdown () {
      this.groupsToAdd = []
      this.groupsToRemove = []

      var selectedItems = this.selectableItems.filter(i => this.selected.includes(this.selectableIdFunc(i)))

      this.checkedGroups = this.groups.map(g => g.id).reduce((map, g) => {
        var checked = selectedItems.length > 0 ? selectedItems.every(i => i.groups && i.groups.some(ig => ig.id === g)) : false
        map[g] = checked ? 'checked:' + g : 'unchecked:' + g
        return map
      }, {})

      this.indeterminateGroups = this.groups.map(g => g.id).reduce((map, g) => {
        map[g] = selectedItems.length > 0 && !selectedItems.every(i => i.groups && i.groups.some(ig => ig.id === g)) ? selectedItems.some(i => i.groups && i.groups.some(ig => ig.id === g)) : false
        return map
      }, {})
    },

    toggleGroup (g) {
      var prefix = ''
      if (g.startsWith('checked:')) {
        prefix = 'checked:'
      } else if (g.startsWith('unchecked:')) {
        prefix = 'unchecked:'
      }
      var group = g.slice(prefix.length)

      // update indeterminate value (the .sync modifier doesn't seem to work)
      this.indeterminateGroups[group] = false

      if (prefix === 'checked:') {
        this.groupsToAdd.push(group)
        this.groupsToRemove = this.groupsToRemove.filter(gg => gg !== group)
      } else if (prefix === 'unchecked:') {
        this.groupsToRemove.push(group)
        this.groupsToAdd = this.groupsToAdd.filter(gg => gg !== group)
      }
    },

    applyGroups () {
      var body = {
        groupsToAdd: this.groups.map(g => { return { id: g.id, name: g.name } }).filter(g => this.groupsToAdd.includes(g.id)),
        groupsToRemove: this.groups.map(g => { return { id: g.id, name: g.name } }).filter(g => this.groupsToRemove.includes(g.id))
      }
      body[this.type] = this.selected

      this.axios.post(`/api/admin/batch/${this.type}`, body)
        .then(response => {
          this.applyDoneFunc()
        })
        .catch(e => {
          this.updateGroupsDropdown()
          console.warn(e)
        })
    },

    cssClass (group) {
      return this.groupsToAdd.includes(group.id) || this.groupsToRemove.includes(group.id) ? 'text-warning' : ''
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
      this.updateGroupsDropdown()
    }
  }
}
</script>
