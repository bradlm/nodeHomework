'user strict'


class Server {
  constructor ({  }) {

  }
  http () {
    http.createServer((req, res) => server(req, res))
    httpServer.listen(port, () => console.log(`The HTTP server is running on port ${port}` ))
    return this
  }
  https () {
    https.createServer(httpsServerOptions,(req,res)=> unifiedServer(req,res))
    httpsServer.listen(config.httpsPort, () => console.log(`The HTTP server is running on port ${config.httpPort}`))
    return this
  }
}


const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'), //set these up
  'cert': fs.readFileSync('./https/cert.pem')
}

module.exports = Server