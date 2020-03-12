'use strict'

const path = require('path')
const packageFile = require('./package.json')

function resolve (dir) {
  return path.join(__dirname, '/', dir)
}
function assetsPath (_path) {
  const assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, _path)
}

let host = 'http://bac.a.51baibao.com:81'
if (process.env.PROXY) {
  host = process.env.PROXY
}

const version = {
  CODE: '"' + packageFile.version + '"',
  BUILD_TIME: new Date().getTime()
}

module.exports = {
  lintOnSave: process.env.RELEASE_ENV !== 'production',
  publicPath: 'admin/',
  assetsDir: 'static',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/': {
        target: host,
        ws: false,
        changeOrigin: true
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import '~@/assets/scss/variable';@import '~@/assets/scss/mixin';`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define')
      .use(require('webpack/lib/DefinePlugin'), [{
        'process.version': version
      }])
  },
  configureWebpack: {
    devtool: process.env.RELEASE_ENV === 'beta' || process.env.RELEASE_ENV === 'prod' ? 'source-map' : 'eval-source-map',
    entry: {
      app: './src/main.js'
    },
    output: {
      path: resolve('dist'),
      filename: assetsPath('js/[name].[hash].js'),
      chunkFilename: assetsPath('js/[id].[hash].js')
    },
    // 关闭 webpack 的性能提示
    performance: {
      hints: false
    },
    resolve: {
      modules: [
        resolve('src')
      ],
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'src': resolve('src')
      }
    }
  }
}
