import React from 'react'
import { Route } from 'react-router-dom'
import UserLayout from '../components/user/UserLayout'
import HomePage from '../pages/user/HomePage'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import UserDashboard from '../pages/user/UserDashboard'
import ProtectedRoute from "../components/ProtectedRoute"
import NotFound from '../pages/404'
import UserOrders from '../pages/user/UserOrders'
import UserChangePassword from '../pages/user/UserChangePassword'
import ProductPage from '../pages/user/ProductPage'
import OrderCheckout from '../pages/user/OrderCheckout'
import ForgotPassword from '../pages/user/ForgotPassword'
import ResetPassword from '../pages/user/ResetPassword'
import Shop from '../pages/user/Shop'
import ViewOrder from '../pages/user/ViewOrder'
import ViewSearch from '../pages/user/ViewSearch'
import Contact from '../pages/user/Contact'
import About from '../pages/user/About'
import Posts from '../pages/user/Posts'
import PostPage from '../pages/user/PostPage'
import BankPayment from '../pages/user/BankPayment'

const UserRoutes = () => {
  return (
    <>
      <Route element={<UserLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Shop />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/order-now/' element={<OrderCheckout />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path='/order-now/' element={<OrderCheckout />} />
        <Route path='/search' element={<ViewSearch />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/order/bank/payment' element={<BankPayment />} />
        <Route path='/dashboard/account' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path='/dashboard/orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
        <Route path='/dashboard/password' element={<ProtectedRoute><UserChangePassword /></ProtectedRoute>} />
        <Route path='/order/:id' element={<ProtectedRoute><ViewOrder /></ProtectedRoute>} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    </>
  )
}

export default UserRoutes