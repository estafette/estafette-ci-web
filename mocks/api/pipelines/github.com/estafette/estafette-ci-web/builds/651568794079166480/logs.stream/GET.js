const { delay, type, file } = require('connect-api-mocker/helpers')
const path = require('path')

module.exports = [delay(5000), type('text/event-stream'), file(path.join(__dirname, './index.json'))]
