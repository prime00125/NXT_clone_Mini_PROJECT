import {useState, useContext, useEffect} from 'react'
import ThemeChanger from '../ThemeChanger'
import SideBar from '../SideBar'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import VideoCard from '../VideoCard'
import './index.css'
const apiStatusVariables = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const Gaming = () => {
  const [video, setVideo] = useState([])
  const [apiDetails, setApiDetails] = useState({
    apistatus: apiStatusVariables.initial,
    responseData: null,

  })
  const {isDarkTheme} = useContext(ThemeChanger)
  const txtColor = isDarkTheme ? 'white' : 'black'
  const bgColor = isDarkTheme ? 'black' : 'white'
  const fetchVideo = async () => {
    setApiDetails({
      apistatus: apiStatusVariables.in_progress,
      responseData: null,
   
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
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
        viewCount: eachVideo.view_count,
      }))
      setVideo(formattedData)
      setApiDetails({
        apistatus: apiStatusVariables.success,
        responseData: formattedData,
        
      })
    } else {
      setApiDetails({
        apistatus: apiStatusVariables.failure,
        responseData: null,
      })
    }
  }
  useEffect(() => {
    fetchVideo()
  }, [])

  
  const renderLoadingView = () => (
    <div> 
      loading....................
    </div>
  )
  const renderFailureView = () => (
    <div
      className="failureView"
      style={{backgroundColor: bgColor, color: txtColor}}
    >
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
      <button className="retybtn">Retry</button>
    </div>
  )
  const renderSuccessView = () => (
    <div
      style={{color: txtColor, backgroundColor: bgColor}}
      className="gaming"
    >
      {video.map(eachVideo => (
        <VideoCard video={eachVideo} id={eachVideo.id} />
      ))}
    </div>
  )
  const renderAllView = () => {
    const {apistatus} = apiDetails
    switch (apistatus) {
      case apiStatusVariables.success:
        return renderSuccessView()
      case apiStatusVariables.failure:
        return renderFailureView()
      
    }
  }
  return (
    <>
      <Header />
      <div className="min">
        <SideBar />
        <p>{renderAllView()}</p>
      </div>
    </>
  )
}
export default Gaming
