import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Footer from './components/footer';
import NewListing from './pages/newListing';
import Dashboard from './pages/dashboard.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <div className='h-[80vh] overflow-y-scroll hide-scroll-bar'>
  
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/SignIn" element={<SignIn/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
              <Route path="/newListing" element={<NewListing/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
      
      </div>
    <Footer/>
    </BrowserRouter>
</>
  )
}

export default App
