import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Breadcrumb from '../../components/user/Breadcrumb'
import MetaData from '../../components/MetaData'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useProductQuery } from '../../redux/api/ProductAPI'
import Loader from '../../components/user/Loader'
import toast from "react-hot-toast"
import { useCreateOrderMutation } from '../../redux/api/OrderAPI'
import siteData from '../../utils/siteData'

const OrderCheckout = () => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("productID")
    const { data, isLoading, isError, isSuccess } = useProductQuery(id)
    const [createOrder, { data: createOrderData, isLoading: createOrderIsLoading, isSuccess: createOrderIsSuccess, error: createOrderError, isError: createOrderIsError }] = useCreateOrderMutation()
    const { isAuthorized, user } = useSelector((state) => state.user)


    useEffect(() => {
        if (createOrderIsSuccess) {
            toast.success(createOrderData.message)
            if (createOrderData?.paymentMethod == "bank") {
                navigate(`/order/bank/payment?orderID=${createOrderData?.id}`)

                return
            }
            navigate("/dashboard/orders")
        }
        if (createOrderIsError) {
            toast.error(createOrderError.data.message)
        }
    }, [createOrderIsError, createOrderIsSuccess])

    const [billingInfo, setBillingInfo] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNo: user?.phoneNo || "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        landmark: "",
        note: ""
    })
    const [productDetail, setProductDetail] = useState({
        serverLogin: "",
        serverUsername: "",
        serverPassword: "",
        websiteName: "",
        productNotes: ""

    })
    const [paymentMethod, setPaymentMethod] = useState()

    const billingInuptHandler = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
    }
    const productDetailInuptHandler = (e) => {
        setProductDetail({ ...productDetail, [e.target.name]: e.target.value })

    }
    const paymentMethodHandler = (e) => {

        setPaymentMethod(e.target.value)
    }
    const orderHandler = async (e) => {
        e.preventDefault()

        if (paymentMethod == undefined) {
            toast.error("Please Select Payment Method")
            return
        }

        const body = {
            billingInfo,
            productInfo: productDetail,
            orderItems: {
                productID: data?.product?._id,
                name: data?.product?.name,
                price: data?.product?.price
            },
            priceInfo: {
                price: data?.product?.price,
            },
            paymentInfo: {
                paymentStatus: "Not paid",
                paymentMethod: paymentMethod
            },
            orderStatus: "Pending",
            userInfo: {
                userId: user._id,
                userName: user.name
            }
        }

        await createOrder({ body })


    }

    if (isLoading) {
        return <Loader />
    }
    if (!isAuthorized) {
        return <>
            <Breadcrumb breadcrumbLink1={"/checkout"} breadcrumbLink1Text={"Checkout"} breadcrumbTitle={"Checkout"} />
            <div className='container pt-5 pb-5' >

                <div className="text-center">
                    <p className="fs-1">Please Login First To Order</p>
                    <p className="fw-bold">Explore More Shortlist Some Items.</p>
                    <Link to={"/"}>
                        <button className="btn btn-gn rounded-0 mt-2">Back To Shop</button>
                    </Link>
                </div></div>
        </>
    }



    return (
        <div>
            <MetaData pageName={"Checkout"} />
            <Breadcrumb breadcrumbLink1={"/checkout"} breadcrumbLink1Text={"Checkout"} breadcrumbTitle={"Checkout"} />
            <div className='container pt-5 pb-5'>
                <div className='bg-body-secondary row rounded m-2 m-sm-0 p-3 mb-4 text-center'>
                    <div className='col-md-4'>
                        <p className='fw-bold d-inline-block pe-2'>Product Name :</p>
                        <p className='text-capitalize d-inline-block'>{data?.product?.name?.length > 75 ? `${data?.product?.name?.substring(0, 75)}...` : data?.product?.name}</p>
                    </div>
                    <div className='col-md-4'>
                        <p className='fw-bold d-inline-block pe-2'>Product Price :</p>
                        <p className='d-inline-block text-danger'>${data?.product?.price}</p>
                    </div>
                    <div className='col-md-4'>
                        <p className='fw-bold d-inline-block pe-2'>Product Category :</p>
                        <p className='d-inline-block text r'>{data?.product?.category.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p className='fs-4 pb-2'>Billing Details</p>
                        <form className='row' action="">
                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Full Name<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' value={billingInfo.name} name='name' onChange={(e) => billingInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Phone No<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' value={billingInfo.phoneNo} name='phoneNo' onChange={(e) => billingInuptHandler(e)} type="number" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Email<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' value={billingInfo.email} name='email' onChange={(e) => billingInuptHandler(e)} type="email" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Address</label>
                                <input className='form-control rounded-0' value={billingInfo.address} name='address' onChange={(e) => billingInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">City</label>
                                <input className='form-control rounded-0' value={billingInfo.city} name='city' onChange={(e) => billingInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Country</label>
                                <input className='form-control rounded-0' value={billingInfo.country} name='country' onChange={(e) => billingInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">State</label>
                                <input className='form-control rounded-0' value={billingInfo.state} name='state' onChange={(e) => billingInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Pin Code</label>
                                <input className='form-control rounded-0' value={billingInfo.pinCode} name='pinCode' onChange={(e) => billingInuptHandler(e)} type="text" /></div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-4 pb-2'>Product Details</p>
                        <form className='row' action="">
                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Server Login URL Or IP<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' name='serverLogin' onChange={(e) => productDetailInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Username<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' name='serverUsername' onChange={(e) => productDetailInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Password<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' name='serverPassword' onChange={(e) => productDetailInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Website Name<sup className='required'>*</sup></label>
                                <input className='form-control rounded-0' name='websiteName' onChange={(e) => productDetailInuptHandler(e)} type="text" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Logo</label>
                                <input className='form-control rounded-0' name='productLogo' onChange={(e) => productDetailInuptHandler(e)} type="file" /></div>

                            <div className='col-md-6 pt-3'><label className='form-label' htmlFor="">Notes</label>
                                <textarea className='form-control rounded-0' name='productNotes' onChange={(e) => productDetailInuptHandler(e)} /></div>
                        </form>
                    </div>
                    <div className='text-end d-lg-flex justify-content-end pt-2 pt-sm-0'>
                        <div className='d-flex checkout-paymentMethod justify-content-end'>
                            <p className='fw-bold pe-2'>Payment Method : </p>

                            {siteData.bankTransferActive == "Active" && <div className='pe-2'>
                                <input type="radio" id="bank" name="paymentMethod" onClick={paymentMethodHandler} defaultValue={"bank"} />
                                <label htmlFor="bank" className='ps-1'>Bank Transfer</label><br />
                            </div>}
                        </div>

                        <button className='btn btn-gn rounded-0 text-white' onClick={orderHandler}>Order Now</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderCheckout