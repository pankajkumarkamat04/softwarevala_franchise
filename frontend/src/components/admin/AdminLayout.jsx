import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminDashboardLayout from './AdminDashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../user/Loader'
import { useLazyGetProfileQuery } from '../../redux/api/UserAPI'
import { setLoading } from '../../redux/slice/UserSlice'
import Cookies from 'js-cookie'

const AdminLayout = () => {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
            <AdminDashboardLayout isOpen={isOpen} setIsOpen={setIsOpen} >
                <Outlet />
            </AdminDashboardLayout>
        </>
    )
}

export default AdminLayout
