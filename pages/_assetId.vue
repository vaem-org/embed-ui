<template>
  <c-player
    v-if="item"
    :item="item"
    v-bind="attrs"
  />
</template>

<script>
export default {
  data: () => ({
    item: null
  }),
  async fetch () {
    this.item = await this.$axios.$get(`/public/assets/${this.$route.params.assetId}`)
  },
  computed: {
    attrs () {
      return {
        controls: this.$route.query.controls !== '0',
        autoplay: this.$route.query.autoplay === '1',
        muted: this.$route.query.muted === '1',
        loop: this.$route.query.loop === '1'
      }
    }
  }
}
</script>
