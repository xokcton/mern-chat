import { Router } from 'express'
import { register, login, setAvatar, getAllUsers } from '../controllers/usersController.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/setAvatar/:id', setAvatar)
router.get('/allUsers/:id', getAllUsers)


export default router