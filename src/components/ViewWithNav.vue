<template>
  <div>
    <section-header />

    <inner-navigation-tabs />

    <div class="m-3">
      <router-view />
    </div>

    <!-- <div class="row m-0">
      <div class="col-auto d-none d-lg-block">
        <inner-navigation-bar />
      </div>
      <div class="col p-3">
        <router-view />
      </div>
    </div> -->
  </div>
</template>

<script>
// import InnerNavigationBar from '@/components/InnerNavigationBar'
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
