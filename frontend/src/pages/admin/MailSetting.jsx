import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'
import { useGetMailSettingQuery, useUpdateMailSettingMutation } from '../../redux/api/SettingAPI'

const MailSetting = () => {
    const navigate = useNavigate()
    const { data, isError, isSuccess, isLoading, error } = useGetMailSettingQuery()
    const [updateMailSetting, { data: updateMailSettingData, isSuccess: updateMailSettingIsSuccess, error: updateMailSettingError, isError: updateMailSettingIsError, isLoading: updateMailSettingIsLoading }] = useUpdateMailSettingMutation()

    const [mailSetting, setMailSetting] = useState({
        mailHost: "",
        mailPort: "",
        mailUsername: "",
        mailPassword: "",
    })

    useEffect(() => {
        if (updateMailSettingIsSuccess) {
            toast.success(updateMailSettingData?.message)
        }
        if (updateMailSettingIsError) {
            toast.error(updateMailSettingError?.data?.message)
        }
    }, [updateMailSettingIsSuccess, updateMailSettingIsError])

    useEffect(() => {
        if (isSuccess) {
            setMailSetting({
                mailHost: data.mailHost,
                mailPort: data.mailPort,
                mailUsername: data.mailUsername,
                mailPassword: data.mailPassword,
            })
        }
    }, [isSuccess])

    const inputHandler = (e) => {
        setMailSetting({ ...mailSetting, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        await updateMailSetting({ body: mailSetting })

    }


    return (
        <div className="container">
            <MetaData pageName={"Mail Setting"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Mail Setting</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Mail Host
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="mailHost"
                                    value={mailSetting.mailHost}
                                    placeholder="Please Enter Your Site Title"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Mail Port
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="mailPort"
                                    value={mailSetting.mailPort}
                                    placeholder="Please Enter Your Site Title"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Mail Username
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="mailUsername"
                                    value={mailSetting.mailUsername}
                                    placeholder="Please Enter Your Site Title"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Mail Passowrd
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="password"
                                    name="mailPassword"
                                    value={mailSetting.mailPassword}
                                    placeholder="Please Enter Your Site Title"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" onClick={submitHandler}>
                                    Edit Mail Setting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MailSetting
