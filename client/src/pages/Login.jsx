import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useSetRecoilState } from "recoil"
import axios from 'axios'

import { FormContainer } from '../styles'
import "react-toastify/dist/ReactToastify.css"

import { loginRoute } from '../utils/APIRoutes'
import { formErrors } from '../utils/formErrorMsgs'
import { toastOptions } from '../utils/toastOptions'
import { userState } from "../atoms"
import { Brand } from '../components'

const initialValues = {
  username: "",
  password: "",
}

const Login = () => {
  const [values, setValues] = useState(initialValues)
  const setUserState = useSetRecoilState(userState)
  const navigate = useNavigate()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("chat-app-user"))) navigate("/")
  }, [])
  

  const handleFormSubmit = async e => {
    e.preventDefault()
    if (handleValidation()) {
      const { username, password } = values
      const { data } = await axios.post(loginRoute, { username, password })

      if (!data.status) {
        toast.error(data.message, toastOptions)
        return
      } 

      localStorage.setItem("chat-app-user", JSON.stringify(data.user))
      setUserState(data.user)
      if (!data.user.isAvatarImageSet) navigate("/setAvatar")
      else navigate("/")
    }
  }

  const handleValidation = () => {
    const { username, password } = values

    if(username.trim().length < 3 || username.trim().length > 20) {
      toast.error(formErrors.username, toastOptions)
      return false
    }
    if (password.trim().length < 8 || password.trim().length > 72) {
      toast.error(formErrors.password, toastOptions)
      return false
    }

    return true
  }

  const handleChange = e => setValues({...values, [e.target.name]: e.target.value})

  return (
    <>
      <FormContainer>
        <form onSubmit={e => handleFormSubmit(e)}>
          <Brand isH1 />
          <input min={3} max={20} type="text" placeholder="Username" name="username" onChange={e => handleChange(e)} />
          <input min={8} max={72} type="password" placeholder="Password" name="password" onChange={e => handleChange(e)} />
          <button type="submit">Login</button>
          <span>Dont't have an account? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

export default Login