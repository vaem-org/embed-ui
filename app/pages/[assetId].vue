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
import type { StreamInfo } from '~/types/StreamInfo.js'

const route = useRoute()
const api = useAPI()

const { data: item, error } = await useAsyncData(() => route.fullPath, async () => {
  return api<StreamInfo>(`public/assets/${route.params.assetId}`)
})

const attrs = computed(() => {
  return {
    controls: route.query.controls !== '0',
    autoplay: route.query.autoplay === '1',
    muted: route.query.muted === '1',
    loop: route.query.loop === '1',
    primaryColor: route.query.color,
  }
})
</script>

<template>
  <c-player
    v-if="item"
    :item="item"
    v-bind="attrs"
  />
  <pre v-else>{{ error }}</pre>
</template>

<style>
html {
  overflow: hidden;
}
</style>
