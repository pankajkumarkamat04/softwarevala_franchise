import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'
import { useGetAPISettingQuery, useUpdateMailSettingMutation, useUpdateAPISettingMutation } from '../../redux/api/SettingAPI'

const APISetting = () => {
    const navigate = useNavigate()
    const { data, isError, isSuccess, isLoading, error } = useGetAPISettingQuery()
    const [updateAPISetting, { data: updateAPISettingData, isSuccess: updateAPISettingIsSuccess, error: updateAPISettingError, isError: updateAPISettingIsError, isLoading: updateAPISettingIsLoading }] = useUpdateAPISettingMutation()

    const [api, setApi] = useState({
        apiKey: "",
        apiSecret: "",
    })

    useEffect(() => {
        if (updateAPISettingIsSuccess) {
            toast.success(updateAPISettingData?.message)
        }
        if (updateAPISettingIsError) {
            toast.error(updateAPISettingError?.data?.message)
        }
    }, [updateAPISettingIsSuccess, updateAPISettingIsError])

    useEffect(() => {
        if (isSuccess) {
            setApi({
                apiSecret: data?.apiSecret,
                apiKey: data?.apiKey,
            })
        }
    }, [isSuccess])

    const apiInputHandler = (e) => {
        setApi({ ...api, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()


        await updateAPISetting({ body: api })

    }


    return (
        <div className="container">
            <MetaData pageName={"API Setting"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">API Setting</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    API Key
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="apiKey"
                                    value={api.apiKey}
                                    placeholder="Please Enter API Key"
                                    onChange={(e) => apiInputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    API Secrt
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="apiSecret"
                                    value={api.apiSecret}
                                    placeholder="Please Enter API Secret"
                                    onChange={(e) => apiInputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" onClick={submitHandler}>
                                    Update API Setting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default APISetting
