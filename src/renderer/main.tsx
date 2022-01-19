import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import '../index.twstyled.css'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
