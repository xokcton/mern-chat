import { useRecoilValue } from 'recoil'

import { userState } from '../atoms'

import { WelcomeContainer } from '../styles'
import Robot from '../assets/robot.gif'

const Welcome = () => {
  const currentUser = useRecoilValue(userState)

  return (
    <WelcomeContainer>
      <img src={Robot} alt="welcome robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </WelcomeContainer>
  )
}

export default Welcome