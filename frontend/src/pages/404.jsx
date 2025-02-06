import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../components/MetaData"
import Breadcrumb from "../components/user/Breadcrumb"

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <MetaData pageName={"404 - PAGE NOT FOUND"} />
            <Breadcrumb
                breadcrumbTitle={"404 - PAGE NOT FOUND"}
                breadcrumbLink1={"/"}
                breadcrumbLink1Text={"404 - Page Not Found"}
            />
            <div className="text-center">
                <p className="not-found-text">404</p>
                <p className="not-found-text1">Page Not Found</p>
                <Link to={"/"}>
                    {" "}
                    <button className="not-found-button">Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
