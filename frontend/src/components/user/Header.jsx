import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import siteData from '../../utils/siteData';


const Header = () => {

    const { isAuthorized, user, loading } = useSelector((state) => state.user);
    const menu = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "Product",
            url: "/products"
        },
        {
            name: "Posts",
            url: "/posts"
        },
        {
            name: "Contact",
            url: "/contact"
        },
    ]

    if (user?.role == "admin") {
        menu.push({ name: "Admin Panel", url: "/admin", },)
    }

    return (
        <>
            <section className="bg-body-tertiary p-2 d-sm-block d-none border-bottom ">
                <div className="d-flex container">
                    <div className="nav-topbar">
                        <ul className="m-auto ps-0">
                            <li>
                                <Link className="text-decoration-none text-gn" to="">
                                    <i class="fa-regular fa-envelope"></i>
                                    <p className="d-inline text-black ps-2">
                                        {siteData.siteMail}
                                    </p>
                                </Link>
                            </li>
                            <li className="ps-2">
                                <Link className="text-decoration-none text-gn" to="">
                                    <i class="fa-solid fa-phone"></i>
                                    <p className="d-inline text-black ps-2">{siteData.sitePhoneNo}</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-topbar text-end">
                        <Link href="" className="text-gn">
                            <i className="fa-brands fa-facebook ps-2"></i>
                        </Link>
                        <Link href="" className="text-gn">
                            <i className="fa-brands fa-instagram ps-2"></i>
                        </Link>
                        <Link href="" className="text-gn">
                            <i className="fa-brands fa-youtube ps-2"></i>
                        </Link>
                    </div>
                </div>
            </section>
            <nav className="navbar shadow-none navbar-expand-lg ">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={`/assets/websiteImages/siteLogo.jpeg`} style={{ height: "40px" }} alt="" />
                    </Link>
                    <div className="d-sm-none d-block icon-nav">
                        <ul className="mt-auto mb-auto">
                            <li className="ps-2">
                                <Link to="/login">
                                    <i class="fa-solid text-gn fa-lg fa-user"></i>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="navbar-toggler fa-lg border-0 p-0"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <i class="fa-solid text-gn fa-bars ps-2"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="d-flex d-sm-none navbar-nav me-auto mb-2 mb-lg-0">
                            {menu.map((m, index) => (
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link active" aria-current="page" to={m.url}>
                                        {m.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-none d-sm-block">
                        <ul class="v-effect-link">
                            {menu.map((m, index) => (
                                < li key={index}>
                                    <Link to={m.url}>{m.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-sm-block d-none icon-nav">
                        <ul className="mt-auto mb-auto">
                            <li className="ps-2">
                                <Link
                                    to={isAuthorized ? "/dashboard/account" : "/login"}
                                    className="text-decoration-none"
                                >
                                    <p className="d-inline pe-1 text-black">
                                        {isAuthorized
                                            ? `Hello, ${user?.name || "user"}`
                                            : "Login/Register"}
                                    </p>
                                    <i class="fa-solid text-gn fa-lg fa-user"></i>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav >
        </>
    );


}

export default Header