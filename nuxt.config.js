if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

export default {
    components: true,
    head: {
        titleTemplate: "Meetup Market: %s",
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
        '~/plugins/vCalendar.client',
        '~/plugins/stripe.client' 
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
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
    image: {
        cloudinary: {
          baseURL: process.env.CLOUDINARY_BASE_URL,
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
        rootUrl: process.env.ROOT_URL,
        auth:{
            cookieName: process.env.AUTH_COOKIE_NAME,
            clientId: process.env.AUTH_CLIENT_ID,
        },
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            key: process.env.ALGOLIA_API_KEY,
        },
        cloudinary: {
            apiKey: process.env.CLOUDINARY_API_KEY,
        },
    },
    privateRuntimeConfig:{
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            key: process.env.ALGOLIA_API_KEY,
        },
        cloudinary: {
            apiSecret: process.env.CLOUDINARY_API_SECRET
        },
        stripe: {
            secretKey: process.env.STRIPE_SECRET_KEY
        }
    },

}