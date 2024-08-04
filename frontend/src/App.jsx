import './App.css'
import { FooterComp } from './components/FooterComp'
import Navbar from './components/Navbar'
import {RecoilRoot} from 'recoil'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './components/userTab/tab/Dashboard'
import { CleanerPage } from './pages/CleanerPage'
import { Suspense } from 'react'
import SignInCleaner from './pages/SigninCleaner'
import { SignInPage } from './pages/SignInUser'
import { HeroParallaxDemo } from './components/HeroSection/HeroParallaxDemo'
import { LoginUser } from './pages/LoginUser'
import { CleanerLogin } from './pages/LoginCleaner'
import OfficerPage from './pages/OfficerPage'
import { OfficerComplaints } from './pages/OfficerComplaints'
import { OfficerCleanerPage } from './pages/OfficerCleanerPage'
import { OfficerUserPage } from './pages/OfficerUserPage'
import { SignInOfficer } from './pages/SignIn'



function App() {
  return (
    <>
      <RecoilRoot>
      <Suspense fallback={<div>loading ...</div>}>
      <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path='/userDashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/cleanerDashboard' element={<CleanerPage></CleanerPage>}></Route>
        <Route path='/usersignin' element={<SignInPage></SignInPage>}></Route>
        <Route path='/cleanerSignin' element={<SignInCleaner></SignInCleaner>}></Route>
        <Route path='/' element={<HeroParallaxDemo></HeroParallaxDemo>}></Route>
        <Route path='/userlogin' element={<LoginUser></LoginUser>}></Route>
        <Route path='/cleanerlogin' element={<CleanerLogin></CleanerLogin>}></Route>
        <Route path='/officerdashboard' element={<OfficerPage></OfficerPage>}></Route>
        <Route path='/officercomplaints' element={<OfficerComplaints></OfficerComplaints>}></Route>
        <Route path='/officercleaners' element={<OfficerCleanerPage></OfficerCleanerPage>}></Route >
        <Route path='/officerusers' element={<OfficerUserPage></OfficerUserPage>}></Route>
        <Route path='/officersignin' element={<SignInOfficer></SignInOfficer>}></Route>
      </Routes>
      </BrowserRouter>
      </Suspense>
      </RecoilRoot>
      <FooterComp></FooterComp>
    </>
  )
}

export default App
