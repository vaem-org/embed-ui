/*
 * VAEM - Asset manager
 * Copyright (C) 2019  Wouter van de Molengraft
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from 'vue'
import Router from 'vue-router'
import Embed from './views/Embed.vue'
import config from './config';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: config.baseUrl,
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
