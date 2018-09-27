const bunyan = require('bunyan')
const bunyanBuilder = () => {
  const options = {
    name: `${require('../package.json').name}`,
    level: process.env.LOG_LEVEL || 'debug', 
    src: false,
    streams: [
      {stream: process.stdout}
    ], 
    role: 'DEV',
    serviceVersion: `${require('../package.json').version}`,
    func: getCaller(),
  }
  return bunyan.createLogger(options)
}