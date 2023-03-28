const { delay, type, status, json } = require('connect-api-mocker/helpers')

module.exports = [delay(500), type('application/json'), status(404), json({ code: 'NotFound', message: 'Not found' })]
