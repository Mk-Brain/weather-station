import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ResearchPage from './Pages/ResearchPage'
import ErrorPage from './Pages/ErrorPage'
import Header from './components/Header'

const root = document.getElementById('root')
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/research' element={<ResearchPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
