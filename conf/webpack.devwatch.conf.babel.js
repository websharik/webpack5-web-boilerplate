import merge from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import { mode } from './settings.js'

import baseWebPackConfig from './webpack.base.conf.babel.js'

const devwatchWebPackConfig = merge(baseWebPackConfig, {
  mode: mode,
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200, //aggregate changes by period
    poll: 1000
  },
  plugins: [
    //clear dist
    new CleanWebpackPlugin()
  ]
})

export default new Promise(resolve => {
  resolve(devwatchWebPackConfig)
})
