module.exports = function (request, response) {
  // get release from request body
  var release = request.body

  // update id and releaseStatus
  release.id = '123123'
  release.releaseStatus = 'running'

  setTimeout(() => {
    // set response
    response.statusCode = 201
    response.json(release)
    response.end()
  }, 2000)
}
