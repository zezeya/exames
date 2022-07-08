const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        //配置完成之后，需重新启动项目
        proxy: {
            "/api": {
                // target: 'http://192.168.0.123:7001/', //服务端域名地址
                target: 'http://192.168.0.112:7001',
                ws: true,
                changeOrigin: true,
                pathRewrite: { '^/api': '' } //路径重写
            }
        }
    }
})