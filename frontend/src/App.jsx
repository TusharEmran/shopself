import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Products from '../pages/Product'
import Login from '../pages/Login'
import Signin from '../pages/Singin'
import Women from '../pages/Women'
import Men from '../pages/Men'
import Accessories from '../pages/Accessories'
import Kids from '../pages/Kids'
import AdminDashboard from '../pages/AdminDashboard'
import WishList from '../pages/WishList'
import NewArrivals from '../pages/NewArrivals'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signin/>}/>
      <Route path='/category/women' element={<Women/>}/>
      <Route path='/category/men' element={<Men/>}/>
      <Route path='/category/accessories' element={<Accessories/>}/>
      <Route path='/category/kids' element={<Kids/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      <Route path='/new-arrivals' element={<NewArrivals/>}/>
    </Routes>
    </>
  )
}

export default App
