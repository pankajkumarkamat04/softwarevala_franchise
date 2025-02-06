import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../redux/api/PostAPI'
import Breadcrumb from '../../components/user/Breadcrumb'
import Loader from '../../components/user/Loader'
import { Link } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import siteData from '../../utils/siteData'


const PostPage = () => {
    const { id } = useParams()
    const { data, isLoading, isError, isSuccess } = useGetPostQuery(id)
    const [defaultImage, setDefaultImage] = useState("")
    const changeImage = (img) => {
        setDefaultImage(img)
    }


    useEffect(() => {
        if (isSuccess) {
            setDefaultImage(`/assets/postImage/${data?.post?.image.filename}`)
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
                breadcrumbLink1Text={"404 - Post Not Found"}
            />
            <div className="text-center">
                <p className="not-found-text">404</p>
                <p className="not-found-text1">Post Not Found</p>
                <Link to={"/"}>
                    {" "}
                    <button className="not-found-button">Back To Home</button>
                </Link>
            </div>
        </div>
    }

    return (
        <div>
            <MetaData pageName={data?.post?.title} />
            <section class="hero-section" style={{ background: `linear-gradient(#00000080,#00000080),url(${siteData.siteURL}assets/postImage/${data?.post?.image.filename}) no-repeat 50%` }}>
                <div class="hero-content">
                    <p class="lead fs-3">{data?.post?.title}</p>
                    <p class="lead"><Link className=' text-white' to={"/"}>Home</Link> / <Link className=' text-white' to={"/posts"}>Posts</Link> / {data?.post?.title}</p>
                </div>
            </section>
            <div className="container post-page pt-3 pb-3">
                <div className='pt-1' dangerouslySetInnerHTML={{ __html: data?.post.description }}></div>
            </div>
        </div>
    )
}

export default PostPage
