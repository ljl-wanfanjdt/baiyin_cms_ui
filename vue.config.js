const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    devServer: {
      client: {
        overlay: {
          warnings: false,
          errors: true
        }
      },
      open: true,
      port: 8080,
      host: 'localhost',
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          pathRewrite: { '^/api': '' }
        }
      }
    }
  }
})
