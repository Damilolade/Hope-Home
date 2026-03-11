import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayOut from './layout/RootLayOut'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Subscribe from './pages/Subscribe'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut />}>
      <Route index element={<Home />} />
      <Route path="services"   element={<Services />}   />
      <Route path="about"      element={<About />}      />
      <Route path="contact"    element={<Contact />}    />
      <Route path="subscribe"  element={<Subscribe />}  />
    </Route>
  )
)

const App = () => <RouterProvider router={router} />

export default App