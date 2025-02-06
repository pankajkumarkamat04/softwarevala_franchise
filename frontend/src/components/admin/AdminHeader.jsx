import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHeader = ({ setIsOpen, isOpen }) => {


    const { user } = useSelector((state) => state.user);



    const isOpenHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='bg-admin border-bottom admin-header'>
            <div className='d-flex pe-2 ps-2 h-100 '>
                <div className='w-50 align-content-center'>
                    <Link onClick={isOpenHandler} className='d-inline-block'><i className={`${isOpen ? "fa-regular fa-square-minus" : "fa-solid fa-bars"} p-1  border border-white text-white`}></i></Link>
                    <Link to={"/"}><img src={`/assets/websiteImages/siteLogo.jpeg`} className='ps-2' alt="" srcset="" height={"30px"} /></Link>
                </div>
                <div className='w-50 align-content-center'>
                    <ul className='list-unstyled mt-auto mb-auto d-flex justify-content-end'>
                        <li className="ps-2 ">
                            <Link>
                                <p className="d-inline pe-1 text-white">
                                    Hello, {user?.name}
                                </p>
                                <i class="fa-solid text-white fa-lg fa-user"></i>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default AdminHeader
