import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Home from './pages/Home'
import AddSnippet from './pages/AddSnippet'
// import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:sectionId' element={<Home />} />
        <Route path='/snippet' element={<AddSnippet />} />
        <Route path='/snippet/:snippetId' element={<AddSnippet />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App