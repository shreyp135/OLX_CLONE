import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Footer from './components/footer';


function App() {

  return (
    <>
    <Navbar/>
    <div className='h-screen bg-blue-500'>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/SignIn" element={<SignIn/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
              <Route path="/Listings" element={<Listings/>}/>
              <Route path="/newListing" element={<NewListing/>}/>
              <Route path="/purchases" element={<Purchases/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    <Footer/>
</>
  )
}

export default App
