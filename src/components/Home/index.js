import {useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ThemeChanger from '../ThemeChanger'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import VideoCard from '../VideoCard'
import './index.css'
import SideBar from '../SideBar'
import {Link} from 'react-router-dom'

const apiStatusVaribles = {
  initial: 'INITIAL',
  in_progress: 'INPROGESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [video, setVideo] = useState([])
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusVaribles.initial,
    responseData: null,
    errorMsg: null,
  })
  const [show, setShow] = useState(true)
  const [searchInput, setSearchInput] = useState('')

  const {isDarkTheme} = useContext(ThemeChanger)
  const bgColor = isDarkTheme ? 'black' : 'white'
  const color = isDarkTheme ? 'white' : 'black'

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const fetchVideo = async () => {
    setApiDetails({
      apiStatus: apiStatusVaribles.in_progress,
      responseData: null,
      errorMsg: null,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        name: eachVideo.channel.name,
        progileImg: eachVideo.channel.profile_image_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      setVideo(formattedData)
      setApiDetails({
        apiStatus: apiStatusVaribles.success,
        responseData: formattedData,
        errorMsg: null,
      })
    } else {
      setApiDetails({
        apiStatus: apiStatusVaribles.failure,
        responseData: null,
        errorMsg: error_msg,
      })
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [searchInput])

  const renderLoadingView = () => (
    <div className="loading">
    </div>
  )

  const renderFailureView = () => (
    <div className="failureView">
      {isDarkTheme ? (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          className="failureimg"
        />
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          className="failureimg"
        />
      )}
      <h1 className="failuretext">Oops! Something Went Wrong</h1>
      <p className="failuredescription">
        We are having some trouble processing your request. Please try again.
      </p>
      <button className="retybtn" onClick={onRetry}>
        Retry
      </button>
    </div>
  )

  const lengthOfVideo = video.length

  const renderSuccessView = () => (
    <>
      {lengthOfVideo > 0 ? (
        <ul className="AllVideoList">
          {video.map(eachVideo => (
            <VideoCard id={eachVideo.id} video={eachVideo} />
          ))}
        </ul>
      ) : (
        <div className="notVideoImg" style={{color: color}}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />

          <h1 className="failuretext">No Search results found</h1>
          <p className="failuredescription">
            Try different keywords or remove search filter.
          </p>
          <button className="retybtn" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}
    </>
  )

  const renderAllView = () => {
    const {apiStatus} = apiDetails
    switch (apiStatus) {
      case apiStatusVaribles.in_progress:
        return renderLoadingView()
      case apiStatusVaribles.success:
        return renderSuccessView()
      case apiStatusVaribles.failure:
        return renderFailureView()
      default:
        null
    }
  }

  const getSearch = () => {
    fetchVideo()
  }
  const onRetry = () => {
    setSearchInput('')
    fetchVideo()
  }
  const erase = () => {
    setShow(prevState => !prevState)
  }

  return (
    <>
      <Header />
      <section className="min">
        <SideBar />
        <div className="Home" style={{color: color, backgroundColor: bgColor}}>
          {show && (
            <div className="remover">
              <div className="x" onClick={erase}>
                X
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                className="homelogo"
              />
              <p> Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button className="rembtn">GIT IT NOW</button>
            </div>
          )}
          <div className="home-content">
            <section className="searchsection">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={onChangeInput}
              />
              <button className="searchbtn" onClick={getSearch}>
                <IoIosSearch size={30} />
              </button>
            </section>
            <p>{renderAllView()}</p>
          </div>
        </div>
      </section>
    </>
  )
}
export default Home
