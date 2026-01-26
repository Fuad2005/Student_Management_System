"use client"

import React from 'react'



function ThemeInitializer() {

    React.useEffect(() => {
    // Get stored theme or default to light
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    null
  )
}

export default ThemeInitializer