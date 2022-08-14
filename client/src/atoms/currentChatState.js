import { atom } from 'recoil'

const currentChatState = atom({
  key: 'currentChatState',
  default: JSON.parse(localStorage.getItem("chat-app-currentChat")) || undefined,
})

export default currentChatState