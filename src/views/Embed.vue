<!--
  - VAEM - Asset manager
  - Copyright (C) 2019  Wouter van de Molengraft
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <video
    ref="video"
    class="video-js vjs-default-skin"
    :controls="controls"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
  >
  </video>
</template>

<script>
  import videojs from 'video.js';
  import each from 'lodash/each';
  import 'video.js/dist/video-js.min.css';
  import config from '../config';

  export default {
    name: 'VaemVideo',

    computed: {
      controls() {
        return this.$route.query.controls !== '0';
      },
      autoplay() {
        return this.$route.query.autoplay === '1';
      },
      loop() {
        return this.$route.query.loop === '1';
      },
      muted() {
        return this.$route.query.muted === '1';
      }
    },

    methods: {
      async load() {
        const params = this.$route.params;

        const item = (await this.$axios.get(`/streams/${params.timestamp || '-'}/${params.signature || '-'}/${params.assetId}`)).data;

        this.player.src({
          type: 'application/x-mpegURL',
          src: config.apiUrl + item.streamUrl
        });

        const subtitles = (item || {}).subtitles;
        each(subtitles, (url, language) => {
          this.player.addRemoteTextTrack({
            kind: 'subtitles',
            srclang: language,
            src: config.apiUrl + url,
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
