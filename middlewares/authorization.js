import jsonwebtoken from 'jsonwebtoken'
const Auth = {}

Auth.verifyAuth = (req, res, next) => {
  if (req.headers.authorization) {
    jsonwebtoken.verify(req.headers.authorization, 'RESTFULAPIs', (err, decode) => {
      if (err) return res.status(401).send('Unauthorized')
      req.user = decode
      next()
    })
  } else if (req.user) {
    console.log('Autorizado por usuario')
  } else {
    req.user = undefined
    return res.send({message: 'Unauthorized'})
  }
}


export default Auth
