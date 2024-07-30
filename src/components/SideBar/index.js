import './index.css'
import {useContext} from 'react'
import ThemeChanger from '../ThemeChanger'

import {Link} from 'react-router-dom'

const SideBar = () => {
  const {isDarkTheme} = useContext(ThemeChanger)

  const txtcolor = isDarkTheme ? 'white' : 'black'
  const bgColor = isDarkTheme ? 'black' : 'white'

  return (
    <div
      className="siderBar"
      style={{backgroundColor: bgColor, color: txtcolor}}
    >
      <div className="sideBarUpper">
        <div className="navigate">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/trending">
            <p>Trending</p>
          </Link>
          <Link to="/gaming">
            <p>Gaming</p>
          </Link>
          <Link to="/savevideo">
            <p>Saved Videos</p>
          </Link>
        </div>
      </div>

      <div className="sideBarLower">
        <p>CONTACT US</p>
        <div className="lowerIcons">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
            alt="facebook logo"
            className="icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
            alt="twitter logo"
            className="icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
            alt="linkedin logo"
            className="icon"
          />
        </div>
        <p>Enjoy! Now you can see your recommendatios!</p>
      </div>
    </div>
  )
}
export default SideBar
