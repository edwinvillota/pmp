import jsonwebtoken from 'jsonwebtoken'
const Auth = {}

Auth.verifyAuth = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
      if (err) req.user = undefined
      req.user = decode
      next()
    })
  } else {
    req.user = undefined
    next()
  }
}

Auth.requireAuth = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user' })
  }
}

export default Auth
