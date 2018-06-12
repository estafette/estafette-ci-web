<template>
    <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="20" class="justify-content-center"/>
</template>

<script>
export default {
  data: function () {
    return {
      totalRows: 50,
      currentPage: 1
    }
  }
}
</script>
