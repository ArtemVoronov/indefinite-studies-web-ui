import { createContext, useState } from 'react'
import * as React from 'react';

interface Props {
  children?: React.ReactNode
  // any props that come into the component
}

type ThemeContextType = {
  theme: string,
  setTheme: any,
}

export const THEMES = {
  "DAY": "DAY",
  "NIGHT": "NIGHT",
}

export const ThemeContext = createContext({} as ThemeContextType)
export const CURRENT_THEME_KEY = "CURRENT_THEME_KEY"

const { Provider } = ThemeContext

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(THEMES.DAY)

  return (
    <Provider value={{ theme, setTheme }}>
      {children}
    </Provider>
  )
}

export default ThemeProvider