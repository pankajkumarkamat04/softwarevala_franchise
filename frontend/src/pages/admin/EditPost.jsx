import React, { useEffect, useRef, useState } from 'react'
import { useGetPostQuery, useUpdatePostMutation } from '../../redux/api/PostAPI'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/user/Loader'
import toast from 'react-hot-toast'
import MetaData from '../../components/MetaData'
import PostCategoryHandler from '../../components/admin/PostCategoryHandler'
import JoditEditor from 'jodit-react';

const EditPost = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const { data, isError, isLoading, isSuccess, error } = useGetPostQuery(id)
    const [updatePost, { data: updatePostData, isError: updatePostIsError, isLoading: updatePostIsLoading, isSuccess: updatePostIsSuccess, error: updatePostError }] = useUpdatePostMutation()


    const [postInfo, setPostInfo] = useState({
        title: "",
        description: "",
    })

    const [image, setImage] = useState([])
    const [file, setFile] = useState([])
    const [category, setCategory] = useState({
        id: "",
        name: ""
    })
    const [subCat, setSubCat] = useState({
        id: "",
        name: ""
    })

    useEffect(() => {
        if (updatePostIsError) {
            toast.error(updatePostError.data.message)
        }

        if (updatePostIsSuccess) {
            toast.success(updatePostData.message)
            navigate("/admin/posts")
        }
    }, [updatePostError, updatePostIsSuccess])

    useEffect(() => {
        setPostInfo({
            title: data?.post?.title,
            description: data?.post?.description,
        })
        setCategory({
            id: data?.post?.category?.id || "",
            name: data?.post?.category?.name || "",
        })
        setSubCat({
            id: data?.post?.subCategory?.id || "",
            name: data?.post?.subCategory?.name || "",
        })
        setContent(data?.post?.description)
    }, [isSuccess])


    const inputHandler = (e) => {
        setPostInfo({ ...postInfo, [e.target.name]: e.target.value })
    }

    const descriptionHandler = (newContent) => {
        postInfo.description = newContent
        setContent(newContent)

    }

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const submitHandler = async (e) => {
        e.preventDefault()


        if (postInfo.name == "") {
            toast.error("Please Enter Post Name")
            return
        }
        if (postInfo.description == "") {
            toast.error("Please Enter Post Description")
            return
        }
        if (image == undefined) {
            toast.error("Please Upload Post Image")
            return
        }

        const fd = new FormData()
        fd.append("name", postInfo.name)
        fd.append("description", postInfo.description)
        fd.append("categoryName", category.name)
        fd.append("categoryID", category.id)

        if (subCat.name != "") {

            fd.append("subCategoryName", subCat.name)
            fd.append("subCategoryID", subCat.id)
        } fd.append("postImage", image)






        if (postInfo.filename != file.name && file.name != undefined) {
            fd.append("postFile", file)
        }


        await updatePost({ id, body: fd })
    }


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="container">
            <MetaData pageName={"Add New Post"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Add New Post</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Post Title<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="title"
                                    value={postInfo.title}
                                    placeholder="Please Enter Your Post Name"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Post Description<sup className='required'>*</sup>
                                </label>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={newContent => { descriptionHandler(newContent) }}
                                />
                            </div>
                            <PostCategoryHandler category={category} subCat={subCat} setCategory={setCategory} setSubCat={setSubCat} defaultCategoryName={data?.post?.category?.name} defaultSubCategoryName={data?.post?.subCategory?.name} defaultCategoryID={data?.post?.category?.id} defaultSubCategoryID={data?.post?.subCategory?.id} />
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Post Image<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="file"
                                    placeholder="Please Enter Your Post File"
                                    onChange={(e) => imageHandler(e)}
                                    accept='image/*'
                                />
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" disabled={isLoading} onClick={submitHandler}>
                                    Edit Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPost
