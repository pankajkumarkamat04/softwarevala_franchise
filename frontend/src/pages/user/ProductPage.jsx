import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProductQuery } from '../../redux/api/ProductAPI'
import Breadcrumb from '../../components/user/Breadcrumb'
import Loader from '../../components/user/Loader'
import { Link } from 'react-router-dom'
import ProductMeta from '../../components/user/ProductMeta'
import MetaData from '../../components/MetaData'


const ProductPage = () => {
    const { id } = useParams()
    const { data, isLoading, isError, isSuccess } = useProductQuery(id)
    const [defaultImage, setDefaultImage] = useState("")
    const changeImage = (img) => {
        setDefaultImage(img)
    }


    useEffect(() => {
        if (isSuccess) {
            setDefaultImage(`https://softwarevala.net/assets/productImage/${data?.product?.images[0].filename}`)
        }
    }, [isSuccess])

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <div>
            <MetaData pageName={"404 - PRODUCT NOT FOUND"} />
            <Breadcrumb
                breadcrumbTitle={"404 - PRODUCT NOT FOUND"}
                breadcrumbLink1={"/"}
                breadcrumbLink1Text={"404 - Product Not Found"}
            />
            <div className="text-center">
                <p className="not-found-text">404</p>
                <p className="not-found-text1">Product Not Found</p>
                <Link to={"/"}>
                    {" "}
                    <button className="not-found-button">Back To Home</button>
                </Link>
            </div>
        </div>
    }

    return (
        <div>
            <MetaData pageName={data?.product?.name} />
            <Breadcrumb breadcrumbTitle={data?.product?.name?.length > 25 ? `${data?.product?.name?.substring(0, 25)}...` : data?.product?.name} breadcrumbLink1Text={data?.product?.name?.length > 25 ? `${data?.product?.name?.substring(0, 25)}...` : data?.product?.name} breadcrumbLink1={"#"} />
            <div className="container product-page pt-3 pb-3">
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <img className='img-fluid m-2' src={defaultImage} alt="" sizes="" srcset="" />
                            <div className="row">
                                {data?.product?.images.map((img) => (
                                    <div className="col-3" onClick={() => changeImage(`/assets/productImage/${img?.filename}`)}>
                                        <img className='img-fluid m-2' src={`https://softwarevala.net/assets/productImage/${img?.filename}`} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ProductMeta name={data?.product?.name} price={data?.product.price} categoryName={data?.product.category.name} noOfReview={data?.product.noOfReview} productId={data?.product._id} stock={data?.product.stock} />
                    </div>
                </div>
                <div>
                    <div className='pt-1' dangerouslySetInnerHTML={{ __html: data?.product?.description }}></div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
