'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://47.105.78.229/"'
  BASE_API: '"https://sxscsm.cn:8443/"'
  
})
