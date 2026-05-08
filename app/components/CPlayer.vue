<!--
  - VAEM - Asset manager
  - Copyright (C) 2026  Wouter van de Molengraft
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

<script setup lang="ts">
import { VaemPlayer } from '@vaem/player'
import type { StreamInfo } from '~/types/StreamInfo.js'
import '@vaem/player/style.css'

const props = defineProps<{
  item: StreamInfo
}>()

const textTracks = computed(() => {
  return Object.entries(props.item?.subtitles ?? {}).map(([srclang, src], i) => ({
    srclang,
    src,
    default: i === 0,
  }))
})
</script>

<template>
  <vaem-player
    :src="item.stream"
    :aspect-ratio="0"
    :text-tracks="textTracks"
    force-hls-js
    v-bind="$attrs"
  />
</template>

<style scoped>
.vaem-player {
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
