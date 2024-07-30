import './App.css'
import {useState, useContext} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ThemeChanger from './components/ThemeChanger'
import Home from './components/Home'
import Trending from './components/trending'
import Gaming from './components/Gaming'
import VideoDetails from './components/VideoDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleTheme = () => {
    setIsDarkTheme(prevState => !prevState)
  }

  const addVideo = video => {
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id)
    if (index === -1) {
      setSavedVideos([...savedVideos, video])
    } else {
      const updatedSavedVideo = savedVideos.filter(
        eachVideo => eachVideo.id !== video.id,
      )
      setSavedVideos(updatedSavedVideo)
    }
  }

  return (
    <ThemeChanger.Provider
      value={{isDarkTheme, toggleTheme, savedVideos, addVideo}}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gaming"
            element={
              <ProtectedRoute>
                <Gaming />
              </ProtectedRoute>
            }
          />
          <Route
            path="/savevideo"
            element={
              <ProtectedRoute>
                <SavedVideos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/videos/:id"
            element={
              <ProtectedRoute>
                <VideoDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeChanger.Provider>
  )
}
export default App
