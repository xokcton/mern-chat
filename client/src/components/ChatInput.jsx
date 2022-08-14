import { useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

import { formErrors } from '../utils/formErrorMsgs'
import { messageToastOptions } from '../utils/toastOptions'

import { ChatInputContainer } from '../styles'
import "react-toastify/dist/ReactToastify.css"

const ChatInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const toggleEmojiPicker = () => setShowEmojiPicker(prevState => !prevState)

  const handleEmojiClick = (e, emoji) => setMsg(prevMsg => prevMsg += emoji.emoji)

  const sendMessage = e => {
    e.preventDefault()
    if (msg.trim().length < 1) {
      toast.error(formErrors.emptyString, messageToastOptions)
      return
    }

    setShowEmojiPicker(false)
    handleSendMessage(msg)
    setMsg("")
  }

  return (
    <ChatInputContainer>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={toggleEmojiPicker} />
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div>
      <form className="input-container" onSubmit={sendMessage}>
        <input autoComplete="off" type="text" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type your message here..." name="message" />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      <ToastContainer />
    </ChatInputContainer>
  )
}

export default ChatInput