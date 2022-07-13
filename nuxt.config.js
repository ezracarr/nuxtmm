export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en"
        },
        bodyAttrs:{
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }]
    },
    router: {
        prefetchLinks: false,
    },
    plugins:[ '~/plugins/maps.client', '~/plugins/dataApi', '~/plugins/auth.client' ],
    modules:['~/modules/auth', '~/modules/algolia', '~/modules/cloudinary', '@nuxtjs/cloudinary'],
    buildModules:['@nuxtjs/tailwindcss', '@nuxt/image'],
    cloudinary: {
        cloudName: "test"
    },
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    publicRuntimeConfig:{
        auth:{
            cookieName: 'idToken',
            clientId: '513675484343-u3698rbr9cmlro9g6ia8hdaaohb6fg8f.apps.googleusercontent.com',
        },
        algolia: {
            appId: 'J3S59VE5EB',
            key: 'd4bb3964bd6a3f814f2148af2a057dbf'
        },
        cloudinary: {
            key: '137615183731724'
        }
    },
    privateRuntimeConfig:{
        algolia: {
            appId: 'J3S59VE5EB',
            key: '3b88f4899445547b0999ebbebcff776f'
        },
        cloudinary: {
            apiSecret: 'mEEgs5ax0WKGGBoX2c4HENr9Its'
        }
    },

}