import { Router } from 'express'
import { addMessage, getAllMessages } from '../controllers/messagesController.js'

const router = Router()

router.post("/getAllMessages", getAllMessages)
router.post("/addMessage", addMessage)

export default router