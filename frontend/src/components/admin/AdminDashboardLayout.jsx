import React from 'react'
import { NavLink } from 'react-router-dom'
import AdminSubMenu from './AdminSubMenu'

const AdminDashboardLayout = ({ children, isOpen, setIsOpen }) => {



    const dashboardList = [
        { name: "Dashboard", icon: "fa-home", url: "/admin" },
        {
            name: "Products", icon: "fa-store", subMenu: [
                { name: "All Product", url: "/admin/products" },
                { name: "All Categories", url: "/admin/categories" },
            ]
        },
        {
            name: "Orders", icon: "fa-box-open", subMenu: [
                { name: "All Orders", url: "/admin/orders" },
            ]
        },
        {
            name: "Posts", icon: "fa-signs-post", subMenu: [
                { name: "All Posts", url: "/admin/posts" },
                { name: "Add New Post", url: "/admin/post/create" },
                { name: "All Category", url: "/admin/post/categories" },
                { name: "Add New Category", url: "/admin/post/category/create" },
            ]
        },
        {
            name: "Users", icon: "fa-users", subMenu: [
                { name: "All Users", url: "/admin/users" },
            ]
        },
        {
            name: "Conatct", icon: "fa-store", subMenu: [
                { name: "All Contact ", url: "/admin/contact" },
            ]
        },
        {
            name: "Setting", icon: "fa-gear", subMenu: [
                { name: "General Setting", url: "/admin/setting/general" },
                { name: "Mail Setting", url: "/admin/setting/mail" },
                { name: "Payment Setting", url: "/admin/setting/gateway" },
                { name: "API Setting", url: "/admin/setting/api" },
            ]
        },
    ]


    return (<>
        <div className='d-flex' >
            <div className={"text-white admin-sidebar d-none d-md-block"} style={{ width: isOpen ? "200px" : "40px" }}>
                <ul className='list-unstyled'>
                    {dashboardList.map((menu) => {

                        if (menu.subMenu) {
                            return (<AdminSubMenu menu={menu} isOpen={isOpen} />)
                        }
                        return (<li className='p-2 admin-nav-option'>
                            <NavLink to={menu.url} className={"d-flex"}><i className={`fa-solid text-white ${menu.icon} align-content-center pt-2 pb-2`}></i>{isOpen ? <p className='ps-2 text-white align-content-center'>{menu.name}</p> : ""}</NavLink>
                        </li>)

                    })}
                </ul>
            </div>

            <div className="d-block d-md-none">
                <div className={`text-white admin-sidebar admin-sidebar-mobile `} style={{ left: isOpen ? "0" : "-100%" }}>
                    <ul className='list-unstyled'>
                        {dashboardList.map((menu) => {

                            if (menu.subMenu) {
                                return (<AdminSubMenu menu={menu} isOpen={isOpen} />)
                            }
                            return (<li className='p-2 admin-nav-option'>
                                <NavLink to={menu.url} className={"d-flex"}><i className={`fa-solid text-white ${menu.icon} align-content-center pt-2 pb-2`}></i>{isOpen ? <p className='ps-2 text-white align-content-center'>{menu.name}</p> : ""}</NavLink>
                            </li>)

                        })}
                    </ul>
                </div>
            </div >
            <div className='w-100'>{children}</div>


        </div>
    </>
    )
}

export default AdminDashboardLayout
