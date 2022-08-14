import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useSetRecoilState, useRecoilValue } from "recoil"
import { Buffer } from 'buffer'
import axios from 'axios'

import loader from '../assets/loader.gif'
import { AvatarContainer } from '../styles'
import "react-toastify/dist/ReactToastify.css"

import { setAvatarRoute } from '../utils/APIRoutes'
import { toastOptions } from '../utils/toastOptions'
import { formErrors } from '../utils/formErrorMsgs'
import { userState } from "../atoms"

const api = process.env.REACT_APP_AVATAR_API_URL
const AVATARS_AMOUNT = 4

const SetAvatar = () => {
  const navigate = useNavigate()
  const setUserState = useSetRecoilState(userState)
  const isUserActive = useRecoilValue(userState)
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)

  useEffect(() => {
    if (isUserActive.username === "") navigate("/login")
    if (isUserActive.isAvatarImageSet) navigate("/")
  }, [])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error(formErrors.avatarError, toastOptions)
      return
    }

    const user = await JSON.parse(localStorage.getItem("chat-app-user"))
    const { data } = await axios.patch(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar]
    })

    if (data.isSet) {
      user.isAvatarImageSet = data.isSet
      user.avatarImage = data.image
      localStorage.setItem("chat-app-user", JSON.stringify(user))
      setUserState(user)
      navigate("/")
    } else toast.error(formErrors.failToLoad, toastOptions)
  }

  useEffect(() => {
    const fetchImages = async () => {
      const data = []
      for (let index = 0; index < AVATARS_AMOUNT; index++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
        const buffer = new Buffer(image.data)
        data.push(buffer.toString("base64"))
      }
      setAvatars(data)
      setIsLoading(false)
    }
    fetchImages()
  }, [])    

  if (isLoading) return <AvatarContainer><img src={loader} alt="loader" /></AvatarContainer>

  return (
    <>
      <AvatarContainer>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {
            avatars.map((avatar, index) => (
              <div key={`${avatar}+${index}`} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                <img src={`data:image/svg+xml;base64,${avatar}`} alt={avatar.toString()} onClick={() => setSelectedAvatar(index)} />
              </div>
            ))
          }
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
      </AvatarContainer>
      <ToastContainer />
    </>
  )
}

export default SetAvatar