import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
//import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import {
  ALIASES,
  CONSTANTS,
  ENTRYES,
  isDev,
  isProd,
  PATHS,
  TEMPLATES,
  publicPath
} from './settings.js'

export default {
  entry: {
    ...ENTRYES
  },
  output: {
    filename: `scripts/[name].js`,
    path: `${PATHS.dist}`,
    publicPath: `${publicPath}`
  },
  target: 'web',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimize: !isDev,
    minimizer: !isDev
      ? [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false
              }
            },
            parallel: true,
            extractComments: false
          }),
          new CssMinimizerPlugin({
            parallel: true
          })
        ]
      : []
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    alias: ALIASES
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: '/node_modules/',
        use: ['babel-loader']
      },
      {
        test: /\.vue$/i,
        use: [
          {
            loader: 'vue-loader',
            options: {
              hotReload: true
            }
          },
          /*'vue-svg-inline-loader'*/
        ]
      },
      {
        test: /\.html$/i,
        use: ['html-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          isDev
            ? 'vue-style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: `${publicPath}`
                }
              },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    //replace constants
    new webpack.DefinePlugin(CONSTANTS),
    //vue loader
    new VueLoaderPlugin(),
    //compile templates
    ...TEMPLATES.map(name => {
      return new HtmlWebpackPlugin({
        filename: `${name}`,
        template: `${PATHS.src}/templates/${name}`,
        publicPath: `${publicPath}`,
        minify: {
          collapseWhitespace: isProd
        }
      })
    }),
    //source maps
    () => {
      return isDev
        ? new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
          })
        : null
    },
    //style extractor
    new MiniCssExtractPlugin({
      filename: `styles/[name].css` //[hash]
    }),
    /*new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    }),*/
    //optimize images
    () => {
      return isProd
        ? new ImageminPlugin({
            bail: false,
            cache: true,
            imageminOptions: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        removeViewBox: false
                      }
                    ]
                  }
                ]
              ]
            }
          })
        : null
    }
  ]
}
