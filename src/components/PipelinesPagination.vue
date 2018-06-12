<template>
    <nav aria-label="Pipeline page navigation">
        <ul class="pagination justify-content-center">
            <router-link v-for="page in 10" :key="page" :to="{ query: { page: page }}" exact active-class="active" class="page-item" tag="li"><a class="page-link">{{page}}</a></router-link>
        </ul>
    </nav>
</template>

<script>
export default {
  data: function () {
    return {}
  }
}
</script>
