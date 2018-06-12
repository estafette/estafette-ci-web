<template>
  <div class="m-3 justify-content-center">
    <router-link :to="{ name: 'Targets', query: { }}" exact class="btn btn-outline-primary">All</router-link>
    <router-link v-for="type in types" v-bind:key="type" :to="{ name: 'Targets', query: { type: type }}" exact class="btn btn-outline-primary mr-1">{{ type }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'TargetsFilter',
  data: function () {
    return {
      types: [
        'Kubernetes Engine',
        'Docker Registry',
        'NuGet Repository',
        'Maven Repository',
        'Github Release',
        'Git Tag'
      ],
      errors: []
    }
  }
}
</script>
