import merge from 'webpack-merge'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import JavaScriptObfuscator from 'webpack-obfuscator'
import PrerenderSPAPlugin from 'prerender-spa-plugin'
import { JSDOM } from 'jsdom'

import { mode, OBFUSCATOR, PATHS, PRERENDER } from './settings.js'

import baseWebPackConfig from './webpack.base.conf.babel.js'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import path from 'path'

const productionWebPackConfig = merge(baseWebPackConfig, {
  mode: mode,
  plugins: [
    //clear dist
    new CleanWebpackPlugin(),
    //copy static files
    new CopyWebpackPlugin({
      patterns: [{ from: `${PATHS.src}/static`, to: `${PATHS.dist}` }]
    }),
    //obfuscator
    (() => {
      if (OBFUSCATOR.enabled) {
        return new JavaScriptObfuscator(OBFUSCATOR.config, OBFUSCATOR.excludes)
      } else return () => {}
    })(),
    //prerender
    ...PRERENDER.items.map(item => {
      return new PrerenderSPAPlugin({
        staticDir: PATHS.dist,
        outputDir: path.join(PATHS.dist, `./prerender/${item.elementId}`),
        indexPath: path.join(PATHS.dist, item.template),
        routes: item.routes,
        postProcess(renderedRoute) {
          let DOM = new JSDOM(renderedRoute.html)
          if (item.selector)
            renderedRoute.html = DOM.window.document.querySelector(
              item.selector
            ).outerHTML
          /*let dir = path.join(PATHS.dist, `prerender/${item.elementId}`)
                    let filename = renderedRoute.route === '/' ? 'index' : renderedRoute.route
                    renderedRoute.outputPath = path.join(dir, `${filename}.html`)*/
          return renderedRoute
        },
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true
        },
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
          injectProperty: 'isPrerenderer',
          inject: item.inject,
          maxConcurrentRoutes: 4,
          headless: false,
          renderAfterDocumentEvent: 'render-event'
        })
      })
    })
  ]
})

export default new Promise(resolve => {
  resolve(productionWebPackConfig)
})
