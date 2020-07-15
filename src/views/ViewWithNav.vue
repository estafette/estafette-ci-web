<template>
  <div>
    <section-header />
    <inner-navigation-tabs />
    <div class="m-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import InnerNavigationTabs from '@/components/InnerNavigationTabs'
import SectionHeader from '@/components/SectionHeader'

export default {
  components: {
    // InnerNavigationBar,
    InnerNavigationTabs,
    SectionHeader
  }
}
</script>
