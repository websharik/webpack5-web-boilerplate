import merge from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import { mode, PATHS } from './settings.js'

import baseWebPackConfig from './webpack.base.conf.babel.js'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const buildWebPackConfig = merge(baseWebPackConfig, {
  mode: mode,
  plugins: [
    //clear dist
    new CleanWebpackPlugin(),
    //copy static files
    new CopyWebpackPlugin({
      patterns: [{ from: `${PATHS.src}/static`, to: `${PATHS.dist}` }]
    })
  ]
})

export default new Promise(resolve => {
  resolve(buildWebPackConfig)
})
