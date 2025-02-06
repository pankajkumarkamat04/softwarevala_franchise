import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AllProduct from '../pages/admin/AllProduct'
import AllUsers from '../pages/admin/AllUsers'
import AllOrders from '../pages/admin/AllOrders'
import EditOrder from '../pages/admin/EditOrder'
import AllCategory from '../pages/admin/AllCategory'
import AllContact from '../pages/admin/AllContact'
import GeneralSetting from '../pages/admin/GeneralSetting'
import MailSetting from '../pages/admin/MailSetting'
import EditPostCategory from '../pages/admin/EditPostCategory'
import CreatePostCategory from '../pages/admin/CreatePostCategory'
import AllPostCategory from '../pages/admin/AllPostCategory'
import EditPost from '../pages/admin/EditPost'
import CreatePost from '../pages/admin/CreatePost'
import AllPost from '../pages/admin/AllPost'
import PaymentSetting from '../pages/admin/PaymentSetting'
import APISetting from '../pages/admin/APISetting'

const AdminRoutes = () => {
    return (
        <>
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<ProtectedRoute admin={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute admin={true}><AllProduct /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute admin={true}><AllUsers /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute admin={true}><AllOrders /></ProtectedRoute>} />
                <Route path="/admin/order/:id" element={<ProtectedRoute admin={true}><EditOrder /></ProtectedRoute>} />
                <Route path="/admin/categories" element={<ProtectedRoute admin={true}><AllCategory /></ProtectedRoute>} />
                <Route path="/admin/contact" element={<ProtectedRoute admin={true}><AllContact /></ProtectedRoute>} />
                <Route path="/admin/setting/general" element={<ProtectedRoute admin={true}><GeneralSetting /></ProtectedRoute>} />
                <Route path="/admin/setting/mail" element={<ProtectedRoute admin={true}><MailSetting /></ProtectedRoute>} />
                <Route path="/admin/setting/gateway" element={<ProtectedRoute admin={true}><PaymentSetting /></ProtectedRoute>} />
                <Route path="/admin/setting/api" element={<ProtectedRoute admin={true}><APISetting /></ProtectedRoute>} />
                <Route path="/admin/posts" element={<ProtectedRoute admin={true}><AllPost /></ProtectedRoute>} />
                <Route path="/admin/post/create" element={<ProtectedRoute admin={true}><CreatePost /></ProtectedRoute>} />
                <Route path="/admin/post/edit/:id" element={<ProtectedRoute admin={true}><EditPost /></ProtectedRoute>} />
                <Route path="/admin/post/categories" element={<ProtectedRoute admin={true}><AllPostCategory /></ProtectedRoute>} />
                <Route path="/admin/post/category/create" element={<ProtectedRoute admin={true}><CreatePostCategory /></ProtectedRoute>} />
                <Route path="/admin/post/category/edit/:id" element={<ProtectedRoute admin={true}><EditPostCategory /></ProtectedRoute>} />
            </Route>
        </>

    )
}

export default AdminRoutes