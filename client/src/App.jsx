import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Footer from './components/footer';
import NewListing from './pages/newListing';
import Purchases from './pages/purchases';
import UserListings from "./pages/userListings.jsx";

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
              <Route path="/newListing" element={<NewListing/>}/>
              <Route path="/userListings" element={<UserListings/>}/>
              <Route path="/purchases" element={<Purchases/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    <Footer/>
</>
  )
}

export default App
