import { atom } from 'recoil'

const intialState = {
  _id: "",
  username: "",
  email: "",
  isAvatarImageSet: false,
  avatarImage: "",
}

const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem("chat-app-user")) || intialState,
})

export default userState