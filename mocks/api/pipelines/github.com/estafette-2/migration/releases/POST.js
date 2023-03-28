const {
  type,
  file
} = require('connect-api-mocker/helpers')
const path = require('path')

module.exports = function (req, res) {
  type('application/json')(req, res, () => {
    if (req.body && req.body.releaseVersion.includes('-main-')) {
      res.statusCode = 201
      file(path.join(__dirname, './post-201.json'))(req, res)
    } else {
      res.statusCode = 403
      file(path.join(__dirname, './post-403.json'))(req, res)
    }
  })
}
