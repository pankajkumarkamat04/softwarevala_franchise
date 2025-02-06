import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import MetaData from "../../components/MetaData";
import SearchHeroSection from '../../components/user/SearchHeroSection'
import { useSearchProductQuery } from '../../redux/api/ProductAPI';

const ViewSearch = () => {

    const [searchParams] = useSearchParams()

    const keyword = searchParams.get("keyword")

    const { data, isError, isLoading, isSuccess, error } = useSearchProductQuery({ keyword })

    console.log(error);
    

    if (data?.products.length == 0) {
        return <div>
            <MetaData pageName={"Search"} />
            <SearchHeroSection />
            <div className="container py-5 text-center">
                <p className='fs-2'>Search results for '{keyword}'' is 0</p>
                <p className='fs-5'>Please Search Another Keyword</p>
            </div>
        </div>
    }

    return (
        <div>
            <MetaData pageName={"Search"} />
            <SearchHeroSection />
            <div className="container py-2">
                <p className="mb-2">Search results for "{keyword}"</p>
                <div className="row g-4">
                    {data?.products?.map((product) => (
                        <div class="col-md-3">
                            <div class="card product-card">
                                <Link to={`/product/${product._id}`}><img src={`${product.images.length == 0 ? "" : `https://softwarevala.net/assets/productImage/${product?.images[0]?.filename}`}`} className="card-img-top" alt="Product 1" /></Link>
                                <div class="card-body">
                                    <div className='d-flex'>
                                        <div className='col-md-6'>
                                            <p className='price'>${product?.price}</p>
                                        </div>
                                        <div className='col-md-6 text-end'>
                                            <StarRatings starDimension="18px" starRatedColor="#FFA200" numberOfStars={5} rating={4.5} starSpacing="2px" />
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={`/product/${product._id}`} className='text-capitalize fs-5'>{product.name.length > 75 ? `${product.name.substring(0, 75)}...` : product.name}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewSearch