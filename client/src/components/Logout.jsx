import { useNavigate } from 'react-router-dom'
import { BiPowerOff } from 'react-icons/bi'
import { useSetRecoilState } from 'recoil'

import { currentChatState, selectedChatState } from '../atoms'

import { LogoutButton } from "../styles"


const Logout = () => {
  const navigate = useNavigate()
  const setCurrentSelected = useSetRecoilState(selectedChatState)
  const setCurrentChat = useSetRecoilState(currentChatState)

  const handleClick = () => {
    localStorage.clear()
    setCurrentSelected(undefined)
    setCurrentChat(undefined)
    navigate("/login")
  }

  return (
    <LogoutButton onClick={handleClick}>
      <BiPowerOff />
    </LogoutButton>
  )
}

export default Logout