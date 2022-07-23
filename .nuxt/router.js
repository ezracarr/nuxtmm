import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _14d54e0e = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _f9ca372c = () => interopDefault(import('../pages/admin/events.vue' /* webpackChunkName: "pages/admin/events" */))
const _2ef4efb3 = () => interopDefault(import('../pages/admin/homes.vue' /* webpackChunkName: "pages/admin/homes" */))
const _1d7dc8e0 = () => interopDefault(import('../pages/admin/meetups.vue' /* webpackChunkName: "pages/admin/meetups" */))
const _79db4cf5 = () => interopDefault(import('../pages/admin/products.vue' /* webpackChunkName: "pages/admin/products" */))
const _63d17fe6 = () => interopDefault(import('../pages/admin/transactions.vue' /* webpackChunkName: "pages/admin/transactions" */))
const _20eaadaf = () => interopDefault(import('../pages/no-access.vue' /* webpackChunkName: "pages/no-access" */))
const _35182179 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _2f60a13b = () => interopDefault(import('../pages/Home/_id.vue' /* webpackChunkName: "pages/Home/_id" */))
const _39340bde = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _14d54e0e,
    name: "admin",
    children: [{
      path: "events",
      component: _f9ca372c,
      name: "admin-events"
    }, {
      path: "homes",
      component: _2ef4efb3,
      name: "admin-homes"
    }, {
      path: "meetups",
      component: _1d7dc8e0,
      name: "admin-meetups"
    }, {
      path: "products",
      component: _79db4cf5,
      name: "admin-products"
    }, {
      path: "transactions",
      component: _63d17fe6,
      name: "admin-transactions"
    }]
  }, {
    path: "/no-access",
    component: _20eaadaf,
    name: "no-access"
  }, {
    path: "/search",
    component: _35182179,
    name: "search"
  }, {
    path: "/Home/:id?",
    component: _2f60a13b,
    name: "Home-id"
  }, {
    path: "/",
    component: _39340bde,
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
