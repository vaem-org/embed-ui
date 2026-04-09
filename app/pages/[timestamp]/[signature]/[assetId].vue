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
const config = useRuntimeConfig().public
const route = useRoute()
const api = useAPI()

const password = ref('')
const item = ref<StreamInfo>()
const invalidPassword = ref(false)

const src = computed(() => `${config.apiUrl}${item.value?.stream}/${route.params.assetId}.m3u8`)

async function submit() {
  invalidPassword.value = false
  const { timestamp, signature, assetId } = route.params
  try {
    item.value = await api(`signed/${timestamp}/0/${signature}/assets/${assetId}/share/${password.value}`)
  }
  catch (_e) {
    invalidPassword.value = true
  }
}
</script>

<template>
  <div>
    <v-container
      v-if="item === undefined"
    >
      <v-row justify="center">
        <v-col
          cols="10"
          sm="6"
          lg="4"
        >
          <v-form
            @submit.prevent="submit"
          >
            <v-card>
              <v-card-text>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :error-messages="invalidPassword ? ['Invalid password'] : []"
                  autofocus
                  @input="invalidPassword = false"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  type="submit"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <c-player
      v-if="item"
      :item="item"
    />
  </div>
</template>

<style>
body,html {
  overflow: hidden
}
</style>
