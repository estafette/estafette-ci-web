const loggedIn = true
const path = require('path')

module.exports = function (request, response) {
  if (!loggedIn) {
    response.status(401).send({})
  } else {
    response.sendFile(path.join(__dirname, './index.json'))
  }
}
