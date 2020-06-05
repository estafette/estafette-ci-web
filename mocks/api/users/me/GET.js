const loggedIn = true

module.exports = function (request, response) {
  if (!loggedIn) {
    response.status(401).send({});
  } else {
    response.sendFile('GET.json', {root: __dirname});
  }
}
