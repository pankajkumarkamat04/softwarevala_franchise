import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'
import { useGetPaymentSettingQuery, useUpdateMailSettingMutation, useUpdatePaymentSettingMutation } from '../../redux/api/SettingAPI'

const PaymentSetting = () => {
    const navigate = useNavigate()
    const { data, isError, isSuccess, isLoading, error } = useGetPaymentSettingQuery()
    const [updatePaymentSetting, { data: updatePaymentSettingData, isSuccess: updatePaymentSettingIsSuccess, error: updatePaymentSettingError, isError: updatePaymentSettingIsError, isLoading: updatePaymentSettingIsLoading }] = useUpdatePaymentSettingMutation()

    const [bankDetail, setBankDetail] = useState({
        bankTransferActive: "",
        bankAccountNo: "",
        bankIFSCCode: "",
        paymentBankName: "",
        bankSwiftCode: "",
    })

    useEffect(() => {
        if (updatePaymentSettingIsSuccess) {
            toast.success(updatePaymentSettingData?.message)
        }
        if (updatePaymentSettingIsError) {
            toast.error(updatePaymentSettingError?.data?.message)
        }
    }, [updatePaymentSettingIsSuccess, updatePaymentSettingIsError])

    useEffect(() => {
        if (isSuccess) {
            setBankDetail({
                bankTransferActive: data?.bankTransferActive,
                bankAccountNo: data?.bankAccountNo,
                bankIFSCCode: data?.bankIFSCCode,
                paymentBankName: data?.paymentBankName,
                bankSwiftCode: data?.bankSwiftCode,
            })
        }
    }, [isSuccess])

    const bankInputHandler = (e) => {
        setBankDetail({ ...bankDetail, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const body = {
            bankDetail
        }
        await updatePaymentSetting({ body })

    }


    return (
        <div className="container">
            <MetaData pageName={"Payment Setting"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Payment Setting</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Bank Tranfer
                                </label>
                                <select
                                    className="form-control rounded-0"
                                    name="bankTransferActive"
                                    value={bankDetail.bankTransferActive}
                                    placeholder="Please Enter Your Product Stock"
                                    onChange={(e) => bankInputHandler(e)}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Bank Name
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="paymentBankName"
                                    value={bankDetail.paymentBankName}
                                    placeholder="Please Enter Bank Name"
                                    onChange={(e) => bankInputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Bank Account No
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="bankAccountNo"
                                    value={bankDetail.bankAccountNo}
                                    placeholder="Please Enter Bank Account No"
                                    onChange={(e) => bankInputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    IFSC Code
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="bankIFSCCode"
                                    value={bankDetail.bankIFSCCode}
                                    placeholder="Please Enter IFSC Code"
                                    onChange={(e) => bankInputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Bank SWIFT Code
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="bankSwiftCode"
                                    value={bankDetail.bankSwiftCode}
                                    placeholder="Please Enter Bank SWIFT Code"
                                    onChange={(e) => bankInputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" onClick={submitHandler}>
                                    Update Payment Setting
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSetting
