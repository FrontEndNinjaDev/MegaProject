import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js'

const router = Router()

// register user definition is coming from user controller 
router.route('/register').post(registerUser)



export default router