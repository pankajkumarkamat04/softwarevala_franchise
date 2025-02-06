import React from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import Breadcrumb from '../../components/user/Breadcrumb'
import Loader from "../../components/user/Loader"
import toast from 'react-hot-toast'
import siteData from '../../utils/siteData'
import { useIsOrderAvailableQuery } from '../../redux/api/OrderAPI'

const BankPayment = () => {

    const [searchParams] = useSearchParams()
    const orderID = searchParams.get("orderID")
    const { data, isError, isLoading } = useIsOrderAvailableQuery(orderID)


    if (isLoading) {
        return <Loader />
    }


    if (isError) {
        toast.error('You dont have permession for this resource')
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div>
            <MetaData pageName={"Bank Payment Detail"} />
            <Breadcrumb breadcrumbLink1={"/"} breadcrumbLink1Text={"Bank Payment Detail"} breadcrumbTitle={"Bank Payment Detail"} />
            <div className='py-5 text-center'>
                <i class="fa-solid fa-check text-gn fa-5x"></i>
                <p className='fs-2'>Your Order Created Successfully</p>
                <p className='fs-5'>Your Order Id #{orderID}</p>
                <p>Please Pay Your Order Payment To This Bank Account Mentioned Below</p>
                <p>Bank Name : <span className='fw-bold'>{siteData.paymentBankName}</span></p>
                <p>Account No : <span className='fw-bold'>{siteData.bankAccountNo}</span></p>
                <p>IFSC Code : <span className='fw-bold'>{siteData.bankIFSCCode}</span></p>
                <p>Swift Code : <span className='fw-bold'>{siteData.bankSwiftCode}</span></p>

            </div>
        </div>
    )
}

export default BankPayment