import React, { useEffect, useState } from 'react'
import MetaData from '../../components/MetaData';
import Breadcrumb from '../../components/user/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import Select from "react-select"
import { useRegisterMutation } from '../../redux/api/UserAPI';
import countryList from '../../utils/countryList';

const Register = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNo: "",
        country: "",
        password: "",
    });

    const [register, { data, error, isError, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message);
        }
        if (isSuccess) {
            toast.success(data.message);
            navigate("/")
        }
    }, [isError, isSuccess]);


    const inputHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const countryHandler = (e) => {
        setUser({
            ...user, country: e.value
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await register({ body: user })
    };
    return (
        <div>
            <MetaData pageName={"Sign Up"} />
            <Breadcrumb
                breadcrumbTitle={"Sign Up"}
                breadcrumbLink1Text={"Sign Up"}
                breadcrumbLink1={"/register"}
            />

            <div className="container">
                <div className="row pt-5 pb-5 justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-uppercase">Create An Account</h2>
                        <div className="border auth-form border-1 p-3 ">
                            <form action="">
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Name<sup className='required'>*</sup>
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        type="text"
                                        name="name"
                                        placeholder="Please Enter Your Name"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Email Address<sup className='required'>*</sup>
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        type="email"
                                        name="email"
                                        placeholder="Please Enter Your Email"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Phone No<sup className='required'>*</sup>
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        type="number"
                                        name="phoneNo"
                                        placeholder="Please Enter Your Phone Number"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Country<sup className='required'>*</sup>
                                    </label>
                                    <Select
                                        name='plan'
                                        className='rounded-0'
                                        placeholder={"Please select your country"}
                                        options={countryList}
                                        onChange={countryHandler} />
                                </div>
                                <div className="pt-3">
                                    <label htmlFor="" className="form-label fw-bold">
                                        Password<sup className='required'>*</sup>
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        type="password"
                                        name="password"
                                        placeholder="Please Enter Your Password"
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                                <div className="pt-3">
                                    <button className="auth-btn bg-gn" onClick={submitHandler}>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <div className="pt-3">
                                <p className="text-center text-black mb-0">
                                    Already have account?{" "}
                                    <Link
                                        to={"/login"}
                                        className="text-decoration-none fw-medium text-gn"
                                    >
                                        SignIn here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register