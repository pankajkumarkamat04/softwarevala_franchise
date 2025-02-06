import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllOrderQuery, useGetOrderQuery } from '../../redux/api/OrderAPI'
import Loader from '../../components/user/Loader'
import Breadcrumb from "../../components/user/Breadcrumb"
import MetaData from "../../components/MetaData"

const ViewOrder = () => {

    const { id } = useParams()

    const { data, isError, error, isSuccess, isLoading } = useGetOrderQuery(id)

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <MetaData pageName={"Order Detail"} />
            <Breadcrumb breadcrumbLink1={"/orders"} breadcrumbLink1Text={"Order Details"} breadcrumbTitle={"Order Details"} />
            <div className='container py-3'>
                <div className='bg-body-secondary row rounded m-2 m-sm-0 p-3 mb-4 text-center'>
                    <div className='col-md-4'>
                        <p className='fw-bold d-inline-block pe-2'>Product Name :</p>
                        <p className='text-capitalize d-inline-block'>{data?.orderItems?.name.length > 25 ? `${data?.orderItems?.name?.substring(0, 25)}...` : data?.orderItems?.name}</p>
                    </div>
                    <div className='col-md-4'>
                        <p className='fw-bold d-inline-block pe-2'>Price :</p>
                        <p className='d-inline-block text-danger'>${data?.orderItems?.discountPrice || data?.orderItems?.price}</p>
                    </div>
                    <div className='col-md-4'>
                        <p className='fw-bold d-inline-block pe-2'>Order Status:</p>
                        {data?.orderStatus == "Cancelled" || data?.orderStatus == "Payment Failed" ? <p className='d-inline-block text-danger fw-bold'>{data?.orderStatus}</p> : <p className='d-inline-block text-success fw-bold'>{data?.orderStatus}</p>}
                    </div>
                </div>
                <div className='row py-2'>
                    <div className="col-md-6">
                        <p className='text-uppercase fs-4'>Billing Info</p>
                        <p>{data?.billingInfo?.name}</p>
                        <p>{data?.billingInfo?.email}</p>
                        <p>{data?.billingInfo?.phoneNo}</p>
                        <p>{data?.billingInfo?.address}</p>
                        <div>
                            <p className='d-inline-block pe-2'>{data?.billingInfo?.city}</p>
                            <p className='d-inline-block pe-2'>{data?.billingInfo?.state}</p>
                        </div>
                        <div>
                            <p className='d-inline-block pe-2'>{data?.billingInfo?.pinCode}</p>
                            <p className='d-inline-block pe-2'>{data?.billingInfo?.country}</p>
                        </div>
                    </div>
                    <div className="col-md-6 py-3 py-md-0">
                        <p className='text-uppercase fs-4'>Payment Info</p>
                        <p>Payment Status : {data?.paymentInfo?.paymentStatus == "Not paid" ? <p className='d-inline-block text-danger fw-bold'>{data?.paymentInfo?.paymentStatus}</p> : <p className='d-inline-block text-success fw-bold'>{data?.paymentInfo?.paymentStatus}</p>}                        </p>
                        <p>Payment Method : {data?.paymentInfo?.paymentMethod}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOrder