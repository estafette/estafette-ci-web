<template>
  <router-view/>
</template>

<script>
export default {
  props: ['repoSource', 'repoOwner', 'repoName']
}
</script>
