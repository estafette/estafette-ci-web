<template>
  <div>
    <section-header />

    <inner-navigation-tabs section-route-name="Pipelines" />

    <router-view />
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader'
import InnerNavigationTabs from '@/components/InnerNavigationTabs'

export default {
  components: {
    SectionHeader,
    InnerNavigationTabs
  }
}
</script>
