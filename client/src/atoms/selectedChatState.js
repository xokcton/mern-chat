import { atom } from 'recoil'

const selectedChatState = atom({
  key: 'selectedChatState',
  default: undefined,
})

export default selectedChatState