'use strict'

const Server = require('./Server')

const http = require('http')
const https = require('https')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('./config')
const fs = require('fs')

//make config file(s) for these
const OK = 200
const NOT_FOUND = 404
const DECODER_TYPE = 'utf-8'
const STANDARD_RESPONSE_HEADERS = {
  'Content-Type': 'application/json'
}

const server = new Server()

server.http().https()


//separate server into its own file
const unifiedServer = (req,res)=> {
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname
  const endpoint = path.replace(/^\/+|\/+$/g, '')
  const queryStringObject = parsedUrl.query
  const method = req.method.toLowerCase()
  const headers = req.headers
  const decoder = new StringDecoder(DECODER_TYPE)
  const buffer = ''
  req.on('data', (data) => {
      buffer += decoder.write(data)
  })
  req.on('end', () => {
      buffer += decoder.end()

      const handler = router[endpoint] ? router[endpoint] : handlers.notFound

      const data = {
        'endpoint' : endpoint,
        'queryStringObject' : queryStringObject,
        'method' : method,
        'headers' : headers,
        'payload' : buffer
      }

      handler(data, (statusCode, payload = {})=> {

        statusCode = typeof statusCode === 'number' ? statusCode : OK

        const payloadString = JSON.stringify(payload)
        for(let header in STANDARD_RESPONSE_HEADERS) {
          res.setHeader(header, STANDARD_HEADERS[header])
        }
        res.writeHead(statusCode)
        res.end(payloadString)
        console.log(endpoint,statusCode)
      })

  })
}

//make into a new file
const handlers = {
  ping (data, cb) {
    cb(OK)
  },
  notFound (data, cb) {
    cb(NOT_FOUND)
  }
}

//make a new file
const router = {
  'ping' : handlers.ping
}