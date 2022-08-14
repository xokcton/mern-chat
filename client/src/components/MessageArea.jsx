import { useEffect, useState, useRef } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import axios from 'axios'

import { currentChatState, userState, messagesState } from '../atoms'
import { Logout, ChatInput } from '../components'
import { addMessageRoute, getAllMessagesRoute } from '../utils/APIRoutes'

import { MessageAreaContainer } from '../styles'

const MessageArea = ({ socketRef }) => {
  const [ receivedMessage, setReceivedMessage ] = useState(null)
  const currentChat = useRecoilValue(currentChatState)
  const currentUser = useRecoilValue(userState)
  const [messages, setMessages] = useRecoilState(messagesState)
  const scrollRef = useRef()

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      })
      setMessages(data)
    }
    if (currentChat) fetchMessages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])

  useEffect(() => {
    if (socketRef.current) {
      const date = new Date().toISOString()
      socketRef.current.on("receive-msg", msg => {
        setReceivedMessage({ fromSelf: false, message: msg, createdAt: date })
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (receivedMessage) setMessages(prevState => [...prevState, receivedMessage])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])
  

  const handleSendMessage = async (msg) => {
    const data = {
      message: msg,
      from: currentUser._id,
      to: currentChat._id
    }
    const date = new Date().toISOString()

    await axios.post(addMessageRoute, data)
    socketRef.current.emit("send-msg", data)
    setMessages(prevState => [...prevState, { fromSelf: true, message: msg, createdAt: date }])
  }
  
  return (
    <MessageAreaContainer>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
          <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
          </div>
          <div className="username">
            <h3>{ currentChat.username }</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {
          messages.length > 0 && messages.map((message) => (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                <div className="content">
                  <p>{ message.message }</p>
                  <small>{ moment(message.createdAt).fromNow() }</small>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </MessageAreaContainer>
  )
}

export default MessageArea