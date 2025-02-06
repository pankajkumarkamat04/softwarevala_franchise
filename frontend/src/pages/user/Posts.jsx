import React from 'react'
import { useGetProductQuery } from '../../redux/api/ProductAPI';
import Breadcrumb from "../../components/user/Breadcrumb"
import Loader from "../../components/user/Loader"
import { Link, useSearchParams } from 'react-router-dom';
import MetaData from "../../components/MetaData"
import StarRatings from 'react-star-ratings';
import ProductCategoryFilter from '../../components/user/ProductCategoryFilter';
import ProductPagination from '../../components/user/ProductPagination';
import { useGetAllPostQuery } from '../../redux/api/PostAPI';
import siteData from '../../utils/siteData';

const Posts = () => {
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

    const { data, isError, isLoading } = useGetAllPostQuery(params);



    if (isLoading) {
        return <Loader />
    }

    if (data?.post?.length == 0) {
        return <div>
            <MetaData pageName={"Posts"} />
            <Breadcrumb
                breadcrumbTitle={"Posts"}
                breadcrumbLink1={"/posts"}
                breadcrumbLink1Text={"Posts"}
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
                            <p className='fs-3'>This Category Has 0 Post</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <MetaData pageName={"Posts"} />
            <Breadcrumb
                breadcrumbTitle={"Posts"}
                breadcrumbLink1={"/posts"}
                breadcrumbLink1Text={"Posts"}
            />
            <div className="container pt-2 pb-2">
                <div className='row'>
                    <div className="col-md-3 pb-3 pb-md-0">
                        <div className="p-2 mt-2 border border-1">
                            <ProductCategoryFilter />
                        </div>
                    </div>
                    <div className="col-md-9"><div className="row">
                        {data?.post?.map((post) => (
                            <div className="col-md-4 py-2">
                                <div class="card product-card">
                                    <Link to={`/post/${post._id}`}><img src={`${post?.images?.length == 0 ? "" : `/assets/postImage/${post?.image?.filename}`}`} className="card-img-top" alt={post?.name} /></Link>
                                    <div class="card-body">
                                        <div className='d-flex'>
                                            <div className='col-6'>
                                                <p className=' text-info'>{post.createdAt.split("T")[0]}</p>
                                            </div>
                                            <div className='col-6 text-end'>
                                                <p className=' fw-bold text-capitalize'>{post.category.name}</p>
                                            </div>
                                        </div>
                                        <div className='pt-2'>
                                            <Link to={`/post/${post._id}`} className='text-capitalize fs-5'>{post?.title?.length > 75 ? `${post?.title?.substring(0, 75)}...` : post?.title}</Link>
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

export default Posts