import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import Loader from "../../components/user/Loader"
import defalut_post_image from "../../assets/img/post-default.png"
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'
import { useDeletePostMutation, useGetAllAdminPostQuery } from '../../redux/api/PostAPI'

const AllPost = () => {

    const navigate = useNavigate()
    const { data, isLoading } = useGetAllAdminPostQuery()
    const postData = {
        columns: [
            {
                label: "ID",
                field: "id",
                sort: "asc",
                width: 10
            },
            {
                label: "Image",
                field: "image",
                sort: "disabled",
                width: 30
            },
            {
                label: "Title",
                field: "title",
                sort: "asc",
                width: 150
            },
            {
                label: "Category",
                field: "category",
                sort: "asc"
            },
            {
                label: "Sub category",
                field: "subCategory",
                sort: "asc"
            },
            {
                label: "Actions",
                field: "actions",
                sort: "disabled",
            },

        ],

        rows: []
    }

    const [deletePost, { data: deletePostData, isSuccess: deletePostIsSuucess, isError: deletePostIsError, error: deletePostError }] = useDeletePostMutation()

    const deletePostHandler = async ({ e, id }) => {
        await deletePost(id)
    }

    useEffect(() => {
        if (deletePostIsSuucess) {
            toast.success(deletePostData.message)
        }
        if (deletePostError) {
            toast.error(deletePostError.data.message)
        }
    }, [deletePostIsSuucess, deletePostError])

    data?.post?.map((p, index) => {

        const imgURL = p.image == undefined ? defalut_post_image : `/assets/postImage/${p?.image?.filename}`

        postData?.rows.push({
            id: p._id,
            title: p.title.length > 15 ? `${p.title.substring(0, 15)}...` : p.title,
            image: (<img src={imgURL} width={"35px"} />),
            category: p?.category?.name,
            subCategory: p?.subCategory?.name,
            actions: (<>
                <button className='btn btn-success ms-2' onClick={() => navigate(`/post/${p._id}`)}>
                    <i className='fa-solid fa-eye'></i>
                </button>
                <button className='btn btn-primary ms-2' onClick={() => navigate(`/admin/post/edit/${p._id}`)}>
                    <i className='fa-solid fa-pencil'></i>
                </button>
                <button className='btn btn-danger ms-2' onClick={(e) => deletePostHandler({ e, id: p._id })}>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </>
            )
        })
    })


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='container pt-2'>
            <MetaData pageName={"All Products"} />
            <div className='d-flex justify-content-between'>
                <p className='fs-4'>All Posts</p>
                <Link className='btn btn-primary' to={"/admin/post/create"}>Add New Product</Link>
            </div>
            <div className='mt-2'>
                <MDBDataTable striped bordered hover data={postData} />
            </div>
        </div>
    )
}
export default AllPost
