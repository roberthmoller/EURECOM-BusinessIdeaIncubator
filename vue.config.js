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
        }
    },
})
