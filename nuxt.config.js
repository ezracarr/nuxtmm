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
    plugins:[ 
        '~/plugins/maps.client', 
        '~/plugins/dataApi', 
        '~/plugins/auth.client', 
        '~plugins/vCalendar.client',
        '~plugins/stripe.client' 
    ],
    modules:[
        '~/modules/auth', 
        '~/modules/algolia', 
        '~/modules/cloudinary', 
        '@nuxtjs/cloudinary',
        '~/modules/stripe'
    ],
    buildModules:['@nuxtjs/tailwindcss', '@nuxt/image'],
    cloudinary: {
        cloudName: "dfu7oo41u"
    },
    image: {
        cloudinary: {
          baseURL: 'https://res.cloudinary.com/dfu7oo41u/image/upload/'
        }
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
            apiKey: '336746486477742'
        },
        stripe: {
             key: "pk_live_51JDXpXCxlNckezumumPPmn69Hc1nNLSxrBI6eUJcqG0wA54jT9f3QH9Cpa0zpHQn3DDOHdZonSK2zgj2CzDYerDa00jUjli62X"
        }
    },
    privateRuntimeConfig:{
        algolia: {
            appId: 'J3S59VE5EB',
            key: '3b88f4899445547b0999ebbebcff776f'
        },
        cloudinary: {
            apiSecret: 'YvoiiOVgfw5Ck1OvEvi6mt3zWaA'
        },
        stripe: {
            secretKey: process.env.STRIPE_SECRET_KEY
        }
    },

}