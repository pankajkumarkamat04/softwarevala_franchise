import React, { useEffect, useState } from 'react'
import MetaData from '../../components/MetaData'
import Breadcrumb from '../../components/user/Breadcrumb'
import { useCreateContactMutation } from '../../redux/api/ExtraAPI'
import toast from "react-hot-toast"
import siteData from '../../utils/siteData'

const Contact = () => {

    const [createContact, { data, isError, isSuccess, isLoading, error }] = useCreateContactMutation()


    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phoneNo: "",
        message: ""
    })

    const inputHandler = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (contactForm.name == "") {
            toast.error("Please Enter Your Name")
            return
        }
        if (contactForm.email == "") {
            toast.error("Please Enter Your Email")
            return
        }
        if (contactForm.phoneNo == "") {
            toast.error("Please Enter Your Phone No")
            return
        }
        if (contactForm.message == "") {
            toast.error("Please Enter Your Message")
            return
        }

        await createContact({ body: contactForm })

    }

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message)
        }
        if (isSuccess) {
            toast.success(data.message)
            setContactForm({
                name: "",
                email: "",
                phoneNo: "",
                message: ""
            })
        }
    }, [isSuccess, isError])

    return (
        <div>
            <MetaData pageName={"Contact"} />
            <Breadcrumb
                breadcrumbTitle={"Contact"}
                breadcrumbLink1Text={"Contact"}
                breadcrumbLink1={"/contact"}
            />
            <div className='container'>
                <div className="row align-items-center">
                    <div className="col-md-6 py-3">
                        <div className='mt-2'>
                            <i class="fa-solid fa-phone bg-gn p-3 fs-2 text-white rounded"></i>
                            <div className='d-inline-block ps-2'>
                                <p className='fs-5'>Phone No</p>
                                <p className='mb-0'>{siteData.sitePhoneNo}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <i class="fa-solid fa-phone bg-gn p-3 fs-2 text-white rounded"></i>
                            <div className='d-inline-block ps-2'>
                                <p className='fs-5'>Email</p>
                                <p className='mb-0'>{siteData.sitePhoneNo}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <i class="fa-solid fa-phone bg-gn p-3 fs-2 text-white rounded"></i>
                            <div className='d-inline-block ps-2'>
                                <p className='fs-5'>Address</p>
                                <p className='mb-0'>{siteData.siteAddress}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <i class="fa-solid fa-phone bg-gn p-3 fs-2 text-white rounded"></i>
                            <div className='d-inline-block ps-2'>
                                <p className='fs-5'>Office Time</p>
                                <p className='mb-0'>{siteData.siteOfficeTime}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Name<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="name"
                                    value={contactForm.name}
                                    placeholder="Please Enter Your Name"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Phone No<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="phoneNo"
                                    value={contactForm.phoneNo}
                                    placeholder="Please Enter Your Phone No"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Email<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="email"
                                    value={contactForm.email}
                                    placeholder="Please Enter Your Email"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Message<sup className='required'>*</sup>
                                </label>
                                <textarea
                                    className="form-control rounded-0"
                                    type="text"
                                    name="message"
                                    value={contactForm.message}
                                    placeholder="Please Enter Your Message"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <button className="btn btn-primary" onClick={submitHandler}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact