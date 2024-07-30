import {useState, useEffect, useContext} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrormsg, setShowErrormsg] = useState(false)
  const [errorMsg, seterrorMsg] = useState('')
  const [check, setCheck] = useState('')
  const navigate = useNavigate()

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    navigate('/')
  }
  const onSubmitFailure = error => {
    setShowErrormsg(error)
    seterrorMsg(error)
  }

  const usernameSetting = event => {
    setUsername(event.target.value)
  }

  const passwordSetting = event => {
    setPassword(event.target.value)
  }
  const checkClicked = () => {
    setCheck(prevState => !prevState)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="container">
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
      />
      <div className="login-form">
        <form className="box" onSubmit={onSubmitForm}>
          <label className="u" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="name"
            onChange={usernameSetting}
            id="username"
            placeHolder="Username"
          />
          <label className="p" htmlFor="pass">
            password
          </label>
          <input
            type={check ? 'text' : 'password'}
            className="pass"
            id="pass"
            onChange={passwordSetting}
            placeHolder="password"
          />

          <div>
            <input
              type="checkbox"
              onClick={checkClicked}
              id="check"
              value={check}
            />
            <label htmlFor="check">show Password</label>
          </div>

          <button type="submit" className="btn">
            login
          </button>
        </form>
        {showErrormsg && <p>* {errorMsg}</p>}
      </div>
    </div>
  )
}
export default LoginPage
