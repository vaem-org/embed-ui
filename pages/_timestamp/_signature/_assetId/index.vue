<template>
  <div>
    <v-container
      v-if="item === null"
    >
      <v-row justify="center">
        <v-col cols="10" sm="6" lg="4">
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
                  @input="invalidPassword=false"
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

<script>
export default {
  data: () => ({
    password: '',
    item: null,
    invalidPassword: false
  }),
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
  },
  methods: {
    async submit () {
      this.invalidPassword = false
      const { timestamp, signature, assetId } = this.$route.params
      try {
        this.item = await this.$axios.$get(`/signed/${timestamp}/0/${signature}/assets/${assetId}/share/${this.password}`)
      } catch (e) {
        this.invalidPassword = true
      }
    }
  }
}
</script>

<style>
body,html {
  overflow: hidden
}
</style>
