<template>
  <video ref="video" class="video-js vjs-default-skin" controls autoplay>
  </video>
</template>

<script>
  import videojs from 'video.js';
  import each from 'lodash/each';
  import 'video.js/dist/video-js.min.css';

  export default {
    name: 'embed',

    methods: {
      async load() {
        const params = this.$route.params;

        const item = (await this.$axios.get(`/streams/${params.timestamp || '-'}/${params.signature || '-'}/${params.assetId}`)).data;

        this.player.src({
          type: 'application/x-mpegURL',
          src: process.env.VUE_APP_API_URL + item.streamUrl
        });

        const subtitles = (item || {}).subtitles;
        each(subtitles, (url, language) => {
          this.player.addRemoteTextTrack({
            kind: 'subtitles',
            srclang: language,
            src: process.env.VUE_APP_API_URL + url,
            default: language === 'nl'
          });
        });
      }
    },

    async mounted() {
      this.player = videojs(this.$refs.video, null, () => {
        this.load()
          .catch(e => console.error(e))
      });
    }
  }
</script>
<style>
  .video-js {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: black;
  }
</style>
