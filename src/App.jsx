import './App.css'
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'

function App() {
  

  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<>Change Me Signin</>}/>
          <Route path='/signup' element={<>Change Me Signup</>}/>
          <Route path='*' element={<NotFound />}/>
          {/* <Route path='/' element={<>Change Me</>}/>
          <Route path='/' element={<>Change Me</>}/> */}
        </Routes>
    </>
  )
}

export default App
