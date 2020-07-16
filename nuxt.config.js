
export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        titleTemplate: 'ZODIAC APOCALYPSE',
        htmlAttrs: {
            prefix: 'og: http://ogp.me/ns#',
            lang: 'ja'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            // { name: 'google-site-verification', content: 'XXXXXXXXXXXXXXXXXXXXXXX' },
            { name: 'theme-color', content: '#DC143C' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
            { hid: 'og:site_name', property: 'og:site_name', content: 'ZODIAC APOCALYPSE' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:url', property: 'og:url', content: 'https://zodiac-g12.github.io' },
            { hid: 'og:title', property: 'og:title', content: 'ZODIAC APOCALYPSE' },
            { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description || '' },
            { hid: 'og:image', property: 'og:image', content: 'https://avatars1.githubusercontent.com/u/12181838?s=460&av=4' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: './favicon.ico?' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/pwa',
    ],
    manifest: {
        short_name: "ZODIAC HP",
        name: "ZODIAC HOMEPAGE",
        icons: [
            {
                src: "favicon.ico",
                sizes: "64x64 32x32 24x24 16x16",
                type: "image/x-icon"
            },
            {
                "src": "nuxt-icon192.png",
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                "src": "nuxt-icon512.png",
                "type": "image/png",
                "sizes": "512x512"
            }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        lang: 'ja',
    },
    /*
     ** Build configuration
     */
    build: {
        hardSource: true,

        /*
         ** You can extend webpack config here
         */
        extend (config, ctx) {
        }
    }
}
