import merge from 'webpack-merge'

import { PATHS, TEMPLATES, DEVSERVER, mode } from './settings.js'

import baseWebPackConfig from './webpack.base.conf.babel.js'

const devserverWebPackConfig = merge(baseWebPackConfig, {
  mode: mode,
  devServer: {
    static: PATHS.dist,
    port: DEVSERVER.port,
    compress: true,
    hot: true,
    liveReload: true,
    open: TEMPLATES,
    proxy: {
      '/': {
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
        headers: {
          'X-ProxiedBy-Webpack': true
        },
        target: DEVSERVER.proxyTarget
      }
    }
  },
  plugins: []
})

export default new Promise(resolve => {
  resolve(devserverWebPackConfig)
})
