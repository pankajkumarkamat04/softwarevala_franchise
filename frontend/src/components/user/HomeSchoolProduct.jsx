import React from 'react'
import { useGetProductQuery } from '../../redux/api/ProductAPI';
import Loader from './Loader';
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';

const HomeSchoolProduct = () => {


    const { data, isError, isLoading } = useGetProductQuery();

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <section className="py-2">
                <div className="container">
                    <h2 className="text-center mb-2">Our Latest Products</h2>
                    <div className="row g-4">
                        {data?.product.map((product) => (
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
            </section >

        </div >
    )
}

export default HomeSchoolProduct