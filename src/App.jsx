
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Viewpage } from './components/ViewPage'
import { AddBooks } from './components/AddBooks'
import { EditBooks } from './components/EditBooks'  

function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Viewpage/>} /> 
          <Route path='/AddBooks' element={<AddBooks/>} />
          <Route path='/Edit/:id' element={<EditBooks/>} />   
        </Routes>
      </Router>
    </>
  ) 
}

export default App
