import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useSetRecoilState } from "recoil"
import axios from 'axios'

import { FormContainer } from '../styles'
import "react-toastify/dist/ReactToastify.css"

import { registerRoute } from '../utils/APIRoutes'
import { formErrors } from '../utils/formErrorMsgs'
import { toastOptions } from '../utils/toastOptions'
import { userState } from "../atoms"
import { Brand } from '../components'

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Register = () => {
  const [values, setValues] = useState(initialValues)
  const setUserState = useSetRecoilState(userState)
  const navigate = useNavigate()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("chat-app-user"))) navigate("/")
  }, [])

  const handleFormSubmit = async e => {
    e.preventDefault()
    if (handleValidation()) {
      const { username, email, password } = values
      const { data } = await axios.post(registerRoute, { username, email, password })

      if (!data.status) {
        toast.error(data.message, toastOptions)
        return
      } 

      localStorage.setItem("chat-app-user", JSON.stringify(data.user))
      setUserState(data.user)
      navigate("/setAvatar")
    }
  }

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values

    if(username.trim().length < 3 || username.trim().length > 20) {
      toast.error(formErrors.username, toastOptions)
      return false
    }
    if (email.trim() === "") {
      toast.error(formErrors.email, toastOptions)
      return false
    }
    if (password.trim().length < 8 || password.trim().length > 72) {
      toast.error(formErrors.password, toastOptions)
      return false
    }
    if (confirmPassword.trim().length < 8 || confirmPassword.trim().length > 72) {
      toast.error(formErrors.consfirmPassword, toastOptions)
      return false
    }
    if (password !== confirmPassword){
      toast.error(formErrors.passwdNotEqualsConfirmPasswd, toastOptions)
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
          <input type="email" placeholder="Email" name="email" onChange={e => handleChange(e)} />
          <input min={8} max={72} type="password" placeholder="Password" name="password" onChange={e => handleChange(e)} />
          <input min={8} max={72} type="password" placeholder="Confirm Password" name="confirmPassword" onChange={e => handleChange(e)} />
          <button type="submit">Create User</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

export default Register