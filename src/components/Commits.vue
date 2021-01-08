<template>
  <div>
    <div
      v-for="commit in limitCommits"
      :key="commit.message"
      class="text-truncate"
      :title="commit.message + ' / ' + commit.author.name"
    >
      {{ commit.message }} / {{ commit.author.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commits: {
      type: Array,
      default: null
    },
    limit: {
      type: Number,
      default: 3
    }
  },

  computed: {
    limitCommits () {
      if (!this.commits) {
        return []
      }
      if (this.commits.length <= this.limit) {
        return this.commits
      }
      return this.commits.slice(0, this.limit)
    }
  }
}
</script>
