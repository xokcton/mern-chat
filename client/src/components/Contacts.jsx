import { useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'

import { userState, usersState, currentChatState, selectedChatState } from '../atoms'
import { Brand } from '../components'

import { ContactsContainer } from '../styles'


const Contacts = () => {
  const contacts = useRecoilValue(usersState)
  const currentUser = useRecoilValue(userState)
  const [currentSelected, setCurrentSelected] = useRecoilState(selectedChatState)
  const setCurrentChat = useSetRecoilState(currentChatState)
  
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    setCurrentChat(contact)
    localStorage.setItem("chat-app-currentSelected", JSON.stringify({index}))
    localStorage.setItem("chat-app-currentChat", JSON.stringify(contact))
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("chat-app-currentSelected"))) {
      const idx = JSON.parse(localStorage.getItem("chat-app-currentSelected")).index
      setCurrentSelected(idx)
    }
  }, [])

  return (
    <>
      {
        currentUser.avatarImage && currentUser.username && (
          <ContactsContainer>
            <Brand />
            <div className="contacts">
              {
                contacts.map((contact, index) => (
                  <div onClick={() => changeCurrentChat(index, contact)} key={index} className={`contact ${index === currentSelected ? "selected" : ""}`}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt={`${index}-${contact.avatarImage}`} />
                    </div>
                    <div className="username">
                      <h3>{ contact.username }</h3>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="current user avatar" />
              </div>
              <div className="username">
                <h2>{ currentUser.username }</h2>
              </div>
            </div>
          </ContactsContainer>
        )
      }
    </>
  )
}

export default Contacts