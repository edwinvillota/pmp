import jsonwebtoken from 'jsonwebtoken'
const Auth = {}

Auth.verifyAuth = (req, res, next) => {
  if (req.headers.authorization) {
    jsonwebtoken.verify(req.headers.authorization, 'RESTFULAPIs', (err, decode) => {
      if (err) {
        //req.user = undefined
        console.log(err)
      }
      req.user = decode
    })
  } else if (req.user) {
    console.log('Autorizado por usuario')
  } else {
    req.user = undefined
    return res.send({message: 'Unauthorized'})
  }
  next()
}


export default Auth
