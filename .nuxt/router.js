import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e856e9aa = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _6b6f1cad = () => interopDefault(import('../pages/admin/events.vue' /* webpackChunkName: "pages/admin/events" */))
const _04e72310 = () => interopDefault(import('../pages/admin/homes.vue' /* webpackChunkName: "pages/admin/homes" */))
const _1373ebad = () => interopDefault(import('../pages/admin/meetups.vue' /* webpackChunkName: "pages/admin/meetups" */))
const _c3faff10 = () => interopDefault(import('../pages/admin/products.vue' /* webpackChunkName: "pages/admin/products" */))
const _1b458c2e = () => interopDefault(import('../pages/admin/transactions.vue' /* webpackChunkName: "pages/admin/transactions" */))
const _5d9c144c = () => interopDefault(import('../pages/no-access.vue' /* webpackChunkName: "pages/no-access" */))
const _c3fef008 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _006d1a04 = () => interopDefault(import('../pages/Home/_id.vue' /* webpackChunkName: "pages/Home/_id" */))
const _5a65372e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _e856e9aa,
    name: "admin",
    children: [{
      path: "events",
      component: _6b6f1cad,
      name: "admin-events"
    }, {
      path: "homes",
      component: _04e72310,
      name: "admin-homes"
    }, {
      path: "meetups",
      component: _1373ebad,
      name: "admin-meetups"
    }, {
      path: "products",
      component: _c3faff10,
      name: "admin-products"
    }, {
      path: "transactions",
      component: _1b458c2e,
      name: "admin-transactions"
    }]
  }, {
    path: "/no-access",
    component: _5d9c144c,
    name: "no-access"
  }, {
    path: "/search",
    component: _c3fef008,
    name: "search"
  }, {
    path: "/Home/:id?",
    component: _006d1a04,
    name: "Home-id"
  }, {
    path: "/",
    component: _5a65372e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
