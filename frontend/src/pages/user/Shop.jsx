import React, { useEffect } from 'react'
import { useGetProductQuery } from '../../redux/api/ProductAPI';
import Breadcrumb from "../../components/user/Breadcrumb"
import Loader from "../../components/user/Loader"
import { Link, useSearchParams } from 'react-router-dom';
import MetaData from "../../components/MetaData"
import StarRatings from 'react-star-ratings';
import ProductCategoryFilter from '../../components/user/ProductCategoryFilter';
import ProductPagination from '../../components/user/ProductPagination';
import siteData from '../../utils/siteData';

const Shop = () => {
    const [searchParams] = useSearchParams()

    let params = { resPerPage: 18 }
    if (searchParams.has("category")) {
        params.Categories = searchParams.getAll("category")
    }
    if (searchParams.has("page")) {
        params.page = searchParams.get("page")
    }
    if (searchParams.has("subCategory")) {
        params.subCategories = searchParams.getAll("subCategory")
    }
    params.key = siteData.apiKey
    params.secret = siteData.apiSecret

    const { data, isError, isLoading, isSuccess } = useGetProductQuery(params);


    if (isLoading) {
        return <Loader />
    }

    if (data?.product?.length == 0) {
        return <div>
            <MetaData pageName={"Products"} />
            <Breadcrumb
                breadcrumbTitle={"Products"}
                breadcrumbLink1={"/products"}
                breadcrumbLink1Text={"Products"}
            />
            <div className="container pt-2 pb-2">
                <div className='row'>
                    <div className="col-md-3 pb-3 pb-md-0">
                        <div className="p-2 mt-2 border border-1">
                            <ProductCategoryFilter />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className='text-center'>
                            <p className='fs-3'>This Category Has 0 Product</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <MetaData pageName={"Products"} />
            <Breadcrumb
                breadcrumbTitle={"Products"}
                breadcrumbLink1={"/products"}
                breadcrumbLink1Text={"Products"}
            />
            <div className="container pt-2 pb-2">
                <div className='row'>
                    <div className="col-md-3 pb-3 pb-md-0">
                        <div className="p-2 mt-2 border border-1">
                            <ProductCategoryFilter />
                        </div>
                    </div>
                    <div className="col-md-9"><div className="row">
                        {data?.product.map((product) => (
                            <div className="col-md-4 py-2">
                                <div class="card product-card">
                                    <Link to={`/product/${product._id}`}><img src={`${product?.images?.length == 0 ? "" : `https://softwarevala.net/api/assets/productImage/${product?.images[0]?.filename}`}`} className="card-img-top" alt={product?.name} /></Link>
                                    <div class="card-body">
                                        <div className='d-flex'>
                                            <div className='col-6'>
                                                <p className='price'>${product?.price}</p>
                                            </div>
                                            <div className='col-6 text-end'>
                                                <StarRatings starDimension="18px" starRatedColor="#FFA200" numberOfStars={5} rating={4.5} starSpacing="2px" />
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={`/product/${product._id}`} className='text-capitalize fs-5'>{product?.name?.length > 75 ? `${product?.name?.substring(0, 75)}...` : product?.name}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <ProductPagination data={data} />
                    </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Shop