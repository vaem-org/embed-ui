<template>
  <vaem-player
    :src="src"
    :aspect-ratio="0"
    :text-tracks="textTracks"
    v-bind="$attrs"
  />
</template>

<script>
import VaemPlayer from '@vaem/player'

export default {
  name: 'CPlayer',
  components: {
    VaemPlayer
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    src () {
      return `${this.$config.apiUrl}${this.item?.stream}/${this.$route.params.assetId}.m3u8`
    },
    textTracks () {
      return Object.entries(this.item?.subtitles ?? {}).map(([srclang, src], i) => ({
        srclang,
        src: this.$config.apiUrl + src,
        default: i === 0
      }))
    }
  }
}
</script>

<style scoped>
.vaem-player {
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
