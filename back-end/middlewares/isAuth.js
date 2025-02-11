import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      })
    }

    req.userId = decoded.userId
    next();
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}