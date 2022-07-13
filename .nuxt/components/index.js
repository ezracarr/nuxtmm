export { default as HomeCard } from '../../components/HomeCard.vue'
export { default as HomeRow } from '../../components/HomeRow.vue'
export { default as ImageUploader } from '../../components/ImageUploader.vue'
export { default as PropertyDescription } from '../../components/PropertyDescription.vue'
export { default as PropertyDetails } from '../../components/PropertyDetails.vue'
export { default as PropertyGallery } from '../../components/PropertyGallery.vue'
export { default as PropertyHost } from '../../components/PropertyHost.vue'
export { default as PropertyMap } from '../../components/PropertyMap.vue'
export { default as PropertyReviews } from '../../components/PropertyReviews.vue'
export { default as ShortText } from '../../components/ShortText.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
