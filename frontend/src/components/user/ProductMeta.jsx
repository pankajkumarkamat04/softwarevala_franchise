import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import { useSelector } from 'react-redux'

const ProductMeta = ({ name, price, categoryName, productId, noOfReview, stock }) => {
    const { user } = useSelector((state) => state.user)



    return (
        <>
            <div>

                <div className="border-bottom mt-2 mb-2">
                    <p className='fs-3 text-uppercase'>{name}</p>
                    <p className='fs-4 text-danger'>${price}</p><p ><span className='fw-bold'>Category : </span>{categoryName}</p>
                    <Link className='btn btn-gn rounded-0 mt-2 mb-2 m-0 text-white' to={`/order-now?productID=${productId}`}>Order Now</Link>
                </div>
                <div className='product-page-social-icon pb-2'>
                    <p className='fw-bold'>Share It</p>
                    <i className='fa-brands fa-facebook'></i>
                    <i className='fa-brands fa-instagram'></i>
                    <i className='fa-brands fa-twitter'></i>
                    <i className='fa-brands fa-whatsapp'></i>
                </div>
                <div className='product-page-review-icon pt-2 pb-2 '>
                    <p className='fw-bold'>Review</p>

                    {noOfReview === 0 ? <p>No reviews yet</p> : <><StarRatings
                        starSpacing={"5px"}
                        starDimension={"16px"} /></>}
                </div>

            </div>
        </>
    )
}

export default ProductMeta
