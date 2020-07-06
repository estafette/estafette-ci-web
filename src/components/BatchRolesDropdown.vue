<template>
  <b-dropdown
    text="Update roles"
    variant="info"
    :disabled="!ready || selected.length === 0"
  >
    <b-dropdown-form>
      <b-form-checkbox
        v-for="r in roles"
        :key="r"
        v-model="checkedRoles[r]"
        :value="'checked:'+r"
        :unchecked-value="'unchecked:'+r"
        :indeterminate="indeterminateRoles[r]"
        @change="toggleRole"
      >
        {{ r }}
      </b-form-checkbox>
      <b-button
        size="sm"
        variant="primary"
        class="mb-1"
        @click="applyRoles"
        :disabled="rolesToAdd.length === 0 && rolesToRemove.length === 0"
      >
        Apply
      </b-button>
      <b-button
        size="sm"
        class="mb-1"
        @click="updateRolesDropdown"
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
      checkedRoles: {},
      indeterminateRoles: {},
      rolesToAdd: [],
      rolesToRemove: [],
      roles: [],
      loaded: {
        roles: false
      }
    }
  },

  created () {
    this.loadRoles()
  },

  methods: {
    loadRoles () {
      this.axios.get(`/api/roles`)
        .then(response => {
          this.roles = response.data
          this.loaded.roles = true
        })
        .catch(e => {
          console.warn(e)
        })
    },

    updateRolesDropdown () {
      this.rolesToAdd = []
      this.rolesToRemove = []

      var selectedItems = this.selectableItems.filter(i => this.selected.includes(this.selectableIdFunc(i)))

      this.checkedRoles = this.roles.reduce((map, r) => {
        var checked = selectedItems.length > 0 ? selectedItems.every(i => i.roles && i.roles.some(ir => ir === r)) : false
        map[r] = checked ? 'checked:' + r : 'unchecked:' + r
        return map
      }, {})

      this.indeterminateRoles = this.roles.reduce((map, r) => {
        map[r] = selectedItems.length > 0 && !selectedItems.every(i => i.roles && i.roles.some(ir => ir === r)) ? selectedItems.some(i => i.roles && i.roles.some(ir => ir === r)) : false
        return map
      }, {})
    },

    toggleRole (r) {
      var prefix = ''
      if (r.startsWith('checked:')) {
        prefix = 'checked:'
      } else if (r.startsWith('unchecked:')) {
        prefix = 'unchecked:'
      }
      var role = r.slice(prefix.length)

      // update indeterminate value (the .sync modifier doesn't seem to work)
      this.indeterminateRoles[role] = false

      if (prefix === 'checked:') {
        this.rolesToAdd.push(role)
        this.rolesToRemove = this.rolesToRemove.filter(ra => ra !== role)
      } else if (prefix === 'unchecked:') {
        this.rolesToRemove.push(role)
        this.rolesToAdd = this.rolesToAdd.filter(ra => ra !== role)
      }
    },

    applyRoles () {
      var body = {
        rolesToAdd: this.rolesToAdd,
        rolesToRemove: this.rolesToRemove
      }
      body[this.type] = this.selected

      this.axios.post(`/api/admin/batch/${this.type}`, body)
        .then(response => {
          this.applyDoneFunc()
        })
        .catch(e => {
          this.updateRolesDropdown()
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
      this.updateRolesDropdown()
    }
  }
}
</script>
