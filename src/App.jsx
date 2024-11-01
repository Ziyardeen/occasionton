import './App.css'
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'
import LogIn from './components/landing/LogIn'
import SignUp from './components/landing/SignUp'

function App() {
  

  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<LogIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='*' element={<NotFound />}/>
          {/* <Route path='/' element={<>Change Me</>}/>
          <Route path='/' element={<>Change Me</>}/> */}
        </Routes>
    </>
  )
}

export default App
