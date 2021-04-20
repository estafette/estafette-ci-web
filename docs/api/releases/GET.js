const { delay, type, file } = require('connect-api-mocker/helpers')
const path = require('path')

module.exports = [delay(2000), type('application/json'), file(path.join(__dirname, './index.json'))]
