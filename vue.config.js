const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        name: "Business Idea Incubator",
        themeColor: "#1ab3e6",
        msTileColor: "#1ab3e6",
        appleMobileWbeAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "#1ab3e6",
        workboxPluginMode: "GenerateSW",
        workboxOptions: {
            skipWaiting: true,
        },
        manifestOptions: {
            name: "Business Idea Incubator",
            short_name: "BII",
            icons: [
                {
                    src: "/img/icons/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any maskable",
                },
            ],
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskicon: null,
            msTileImage: null,
        }
    },
})
