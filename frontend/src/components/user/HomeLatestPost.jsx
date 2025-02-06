import React from 'react'
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { useGetAllPostQuery } from '../../redux/api/PostAPI';

const HomeLatestPost = () => {


    

    const { data, isError, isLoading } = useGetAllPostQuery();


    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <section className="py-2">
                <div className="container">
                    <h2 className="text-center mb-2">Our Latest Posts</h2>
                    <div className="row g-4">
                        {data?.post?.map((post) => (
                            <div class="col-md-3">
                                <div class="card product-card">
                                    <Link to={`/post/${post._id}`}><img src={`${post?.images?.length == 0 ? "" : `https://softwarevala.net/assets/postImage/${post?.image?.filename}`}`} className="card-img-top" alt={post?.name} /></Link>
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
                    </div>
                </div>
            </section >

        </div >
    )
}

export default HomeLatestPost