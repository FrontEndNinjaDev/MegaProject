import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = Router()

// register user definition is coming from user controller 
router.route('/register').post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1 
        },
        {
            name : "coverImage",
            maxCount : 1 
        }
    ]), // Returns middleware that processes multiple files associated with the given form fields.
    registerUser
)



export default router