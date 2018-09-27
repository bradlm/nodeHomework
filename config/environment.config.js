'use strict' 

const { environments, default_environment } = require('../consts/server')

function setEnvironment (inputName) {

  const envName = typeof inputName === 'string' ? inputName.toLowerCase() : ''
  
  const targetEnv = environments[envName]
  
  console.log(`Target Environment: ${targetEnv ? envName : (inputName ? 'invalid' : 'undefined') + ` -- unspecified to ${default_environment}`}`)
  
  const env = targetEnv || environments[default_environment]

  return env
}

module.exports = setEnvironment