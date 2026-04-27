import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ErrorPage from './Pages/ErrorPage'
import InternetStatus from './Pages/InternetStatus'


const root = document.getElementById('root')
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/internetSatus' element={<InternetStatus/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
