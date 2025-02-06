import React, { useEffect, useRef, useState } from 'react'
import { useCreatePostMutation, useGetAllPostCategoryQuery, useLazyGetPostSubCategoryQuery } from '../../redux/api/PostAPI'
import toast from "react-hot-toast"
import MetaData from '../../components/MetaData'
import { useNavigate } from "react-router-dom"
import PostCategoryHandler from '../../components/admin/PostCategoryHandler'
import JoditEditor from 'jodit-react';

const CreatePost = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');


    const navigate = useNavigate()
    const [createPost, { data, isLoading, isError, isSuccess, error }] = useCreatePostMutation()
    const [subCategory, { data: subCategoryData, isSuccess: subCategoryIsSuucess, isError: subCategoryIsError, error: subCategoryError }] = useLazyGetPostSubCategoryQuery()
    const { data: CategoryData, isSuccess: CategoryisSuccess } = useGetAllPostCategoryQuery()

    const [postInfo, setPostInfo] = useState({
        title: "",
        description: "",
        category: "",
        subCategory: "",
    })
    const [category, setCategory] = useState({
        id: "",
        name: ""
    })
    const [subCat, setSubCat] = useState({
        id: "",
        name: ""
    })

    const inputHandler = (e) => {
        setPostInfo({ ...postInfo, [e.target.name]: e.target.value })
    }

    const [image, setImage] = useState()

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const loadSubCategory = async (id) => {
        await subCategory(id)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            navigate("/admin/posts")
        }
        if (isError) {
            toast.error(error?.data?.message)
        }
        if (CategoryisSuccess) {
            setCategory({
                id: CategoryData?.categories[0]?._id,
                name: CategoryData?.categories[0]?.name
            })
            loadSubCategory(CategoryData?.categories[0]?._id)

        }

        if (subCategoryIsSuucess) {
            console.log(subCategoryData);

            setSubCat({
                id: subCategoryData?.subCategories[0]?._id,
                name: subCategoryData?.subCategories[0]?.name
            })
        }
    }, [isError, isSuccess, CategoryisSuccess, subCategoryIsSuucess])

    const descriptionHandler = (newContent) => {
        postInfo.description = newContent
        setContent(newContent)

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

        const fromdata = new FormData()
        fromdata.append("title", postInfo.title)
        fromdata.append("description", postInfo.description)
        fromdata.append("categoryName", category.name)
        fromdata.append("categoryID", category.id)
        if (subCat.name != "") {
            fromdata.append("subCategoryName", subCat.name)
            fromdata.append("subCategoryID", subCat.id)
        }
        fromdata.append("postImage", image)

        await createPost({ body: fromdata })
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
                            {CategoryisSuccess && <PostCategoryHandler defaultCategoryID={CategoryData?.categories[0]?._id} category={category} subCat={subCat} setCategory={setCategory} setSubCat={setSubCat} />}
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Post Image<sup className='required'>*</sup>
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    name="file"
                                    placeholder="Please Enter Your Product File"
                                    onChange={(e) => imageHandler(e)}
                                    accept='image/*'
                                />
                            </div>
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" disabled={isLoading} onClick={submitHandler}>
                                    Add New Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
