import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import { io } from 'socket.io-client'

import { userState, usersState, currentChatState } from '../atoms'
import { allUsersRoute, host } from '../utils/APIRoutes'
import { Contacts, Welcome, MessageArea } from '../components'

import { ChatContainer } from '../styles'

const Chat = () => {
  const socketRef = useRef()
  const user = useRecoilValue(userState)
  const currentChat = useRecoilValue(currentChatState)
  const setContacts = useSetRecoilState(usersState)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.username === "") navigate("/login")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      socketRef.current = io(host)
      socketRef.current.emit("add-user", user._id)
    }
  }, [user])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const { data } = await axios.get(`${allUsersRoute}/${user._id}`)
      setContacts(data)
    }
    fetchAllUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <ChatContainer>
      <div className="container">
        <Contacts />
        {
          currentChat === undefined ?
          <Welcome />
          :
          <MessageArea socketRef={socketRef} />
        }
      </div>
    </ChatContainer>
  )
}

export default Chat