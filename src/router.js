import Vue from 'vue'
import Router from 'vue-router'
import Embed from './views/Embed.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:assetId',
      name: 'embed',
      component: Embed
    },
    {
      path: '/:timestamp/:signature/:assetId',
      name: 'signed',
      component: Embed
    }
  ]
})
