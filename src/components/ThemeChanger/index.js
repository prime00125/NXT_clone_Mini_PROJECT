import React from 'react'

const ThemeChanger = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideos: [],
  addVideo: () => {},
})

export default ThemeChanger
