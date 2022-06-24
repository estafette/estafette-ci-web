const { delay, type, file } = require('connect-api-mocker/helpers')
const path = require('path')

module.exports = [delay(500), type('application/json'), file(path.join(__dirname, './post.json'))]
