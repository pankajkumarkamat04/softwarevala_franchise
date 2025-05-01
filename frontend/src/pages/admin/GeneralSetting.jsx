import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import JoditEditor from 'jodit-react';
import MetaData from '../../components/MetaData'
import { useGetGeneralSettingQuery, useUpdateGeneralSettingMutation } from '../../redux/api/SettingAPI'

const GeneralSetting = () => {
    const navigate = useNavigate()
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const { data, isError, isSuccess, isLoading, error } = useGetGeneralSettingQuery()
    const [updateGeneralSetting, { data: updateGeneralSettingData, isSuccess: updateGeneralSettingIsSuccess, error: updateGeneralSettingError, isError: updateGeneralSettingIsError, isLoading: updateGeneralSettingIsLoading }] = useUpdateGeneralSettingMutation()

    const [generalSetting, setGeneralSetting] = useState({
        siteTitle: "",
        siteDescription: "",
        siteMail: "",
        sitePhoneNo: "",
        siteAddress: "",
        siteOfficeTime: "",
        siteAbout: "",
        siteURL: "",
        siteWhatsappNo: ""
    })

    const [favicon, setFavicon] = useState()
    const [logo, setLogo] = useState()
    const [bannerImage, setBannerImage] = useState()

    useEffect(() => {

        if (updateGeneralSettingIsSuccess) {
            toast.success(updateGeneralSettingData?.message)
        }
        if (updateGeneralSettingIsError) {
            console.log(updateGeneralSettingError);

            toast.error(updateGeneralSettingError?.data?.message)
        }
    }, [updateGeneralSettingIsSuccess, updateGeneralSettingIsError])

    useEffect(() => {
        if (isSuccess) {
            setGeneralSetting({
                siteTitle: data.siteTitle,
                siteDescription: data.siteDescription,
                siteMail: data.siteMail,
                sitePhoneNo: data.sitePhoneNo,
                siteAddress: data.siteAddress,
                siteOfficeTime: data.siteOfficeTime,
                siteAbout: data.siteAbout,
                siteURL: data.siteURL,
                siteWhatsappNo: data.siteWhatsappNo
            })
            setContent(data.siteAbout)
        }
    }, [isSuccess])


    const aboutHandler = (newContent) => {
        generalSetting.siteAbout = newContent
        setContent(newContent)

    }

    const inputHandler = (e) => {
        setGeneralSetting({ ...generalSetting, [e.target.name]: e.target.value })
    }

    const imageHandler = (e) => {
        console.log(logo);
        if (e.target.name == "siteLogo") {
            setLogo(e.target.files[0])
            console.log(logo);
        }
        if (e.target.name == "siteFavicon") {
            setFavicon(e.target.files[0])
        }
        if (e.target.name == "bannerImage") {
            setBannerImage(e.target.files[0])
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("siteTitle", generalSetting.siteTitle)
        fd.append("siteDescription", generalSetting.siteDescription)
        fd.append("siteMail", generalSetting.siteMail)
        fd.append("sitePhoneNo", generalSetting.sitePhoneNo)
        fd.append("siteAddress", generalSetting.siteAddress)
        fd.append("siteOfficeTime", generalSetting.siteOfficeTime)
        fd.append("siteAbout", generalSetting.siteAbout)
        fd.append("siteURL", generalSetting.siteURL)

        if (logo != undefined) {
            fd.append("siteLogo", logo)
        }
        if (favicon != undefined) {
            fd.append("siteFavicon", favicon)
        }
        if (bannerImage != undefined) {
            fd.append("bannerImage", bannerImage)
        }

        await updateGeneralSetting({ body: fd })
    }


    return (
        <div className="container">
            <MetaData pageName={"General Setting"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">General Setting</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Title
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="siteTitle"
                                    value={generalSetting.siteTitle}
                                    placeholder="Please Enter Your Site Title"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site URL
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="siteURL"
                                    value={generalSetting.siteURL}
                                    placeholder="Please Enter Your Site URL"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Description

                                </label>
                                <textarea
                                    className="form-control rounded-0"
                                    type="text"
                                    name="siteDescription"
                                    value={generalSetting.siteDescription}
                                    placeholder="Please Enter Your Site Description"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Phone No
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="sitePhoneNo"
                                    value={generalSetting.sitePhoneNo}
                                    placeholder="Please Enter Your Site Phone No"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Whatsapp No <sup className=' text-danger'>With Country Code</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="sitePhoneNo"
                                    value={generalSetting.sitePhoneNo}
                                    placeholder="Please Enter Your Site Phone No"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Mail
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="siteMail"
                                    value={generalSetting.siteMail}
                                    placeholder="Please Enter Your Site Mail"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Address
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="siteAddress"
                                    value={generalSetting.siteAddress}
                                    placeholder="Please Enter Your Site Mail"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Office Time
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="siteOfficeTime"
                                    value={generalSetting.siteOfficeTime}
                                    placeholder="Please Enter Your Site Mail"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Logo<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="siteLogo"
                                    placeholder="Please Upload Your Site Logo"
                                    multiple
                                    onChange={(e) => imageHandler(e)}
                                    accept="image/*"
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site Favicon<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="siteFavicon"
                                    placeholder="Please Upload Your Site Favicon"
                                    multiple
                                    onChange={(e) => imageHandler(e)}
                                    accept="image/*"
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Banner Image<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="bannerImage"
                                    placeholder="Please Upload Your Banner Image"
                                    multiple
                                    onChange={(e) => imageHandler(e)}
                                    accept="image/*"
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Site About Us<sup className='required'>*</sup>
                                </label>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={newContent => { aboutHandler(newContent) }}
                                />
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" onClick={submitHandler}>
                                    Update General Setting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralSetting
