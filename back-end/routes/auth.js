import express from 'express'
import {validator} from '../middlewares/validator.js'
import {signupSchema, loginSchema} from '../utils/schemas.js'
import { getUser, login, logout, signup } from '../controllers/auth.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = express.Router()

router.post('/signup', validator(signupSchema), signup)
router.post('/login', validator(loginSchema), login)
router.post('/logout', logout)
router.get('/protect', isAuth, getUser)

export default router