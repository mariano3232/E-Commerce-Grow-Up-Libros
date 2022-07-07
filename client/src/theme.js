import { createTheme } from '@mui/material'
import { cyan } from '@mui/material/colors'
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: cyan[300],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#fff',
    },
  },
})

export default theme
